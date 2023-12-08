export default function Product({index, product}){
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

