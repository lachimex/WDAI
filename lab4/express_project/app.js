const express = require('express')
const app = express()
const port = 3000

var Router = require('./Router')

app.use('/', Router);

var models = require('./db');

models.sequelize.sync().then(function() {
    console.log('Connected to the database');
  }).catch(function(err) {
    console.log(err);
  });

models.PersonSchema.create({'name': 'john', 'surname': 'Doe', 'job': 'IT'});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})