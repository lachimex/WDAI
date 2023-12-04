from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow import post_load
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///demo.sqlite"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)
ma = Marshmallow(app)


class Base(DeclarativeBase):
    pass


class Person(db.Model):
    id: Mapped[int] = mapped_column(db.Integer, primary_key=True)
    name: Mapped[str] = mapped_column(db.String)
    surname: Mapped[str] = mapped_column(db.String)
    job: Mapped[str] = mapped_column(db.String)


class PersonSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Person

    @post_load
    def make_user(self, data, **kwargs):
        return Person(**data)


@app.route('/', methods=['GET'])
def f0():
    return jsonify({"message": "Hello, World!"})


@app.route('/persons', methods=['GET'])
def f1():
    persons = db.session.execute(db.select(Person)).scalars()
    return jsonify(PersonSchema(many=True).dump(persons))


@app.route('/person', methods=['GET'])
def f2():
    id = request.args.get('id', default=1, type=int)
    person = db.session.query(Person).get_or_404(id)
    return jsonify(PersonSchema().dump(person))


@app.route('/add', methods=['POST'])
def f3():
    new_person = PersonSchema().make_user(request.json)
    db.session.add(new_person)
    db.session.commit()
    return jsonify(PersonSchema().dump(new_person))


if __name__ == '__main__':
    with app.app_context():
        db.drop_all()
        db.create_all()
        new_person = Person(name="ser", surname="serowy", job='it')
        db.session.add(new_person)
        db.session.commit()
    app.run()
