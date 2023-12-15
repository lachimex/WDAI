export default function Product({ product }) {
  return (
    <tr>
      <td className="thumbnail">
        <img src={product.thumbnail} alt="" />
      </td>
      <td className="title">
        {product.title}
      </td>
      <td className="price">
        {product.price}$
      </td>
      <td className="description">
        {product.description}
      </td>
    </tr>
  );
}

