import "./style2.css"

export default function Product({product}){
    return (
        <div id="data-content">
          <div id="img">
            <img src={product.thumbnail} alt="" />
          </div>
          <div id="title">
            <p>{product.title}</p>
          </div>
          <p>{product.description}</p>
        </div>
      );
    }

