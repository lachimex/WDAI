import React, { useState } from 'react';

export default function Product({ product }) {
  const [isEditing, setEditing] = useState(false);
  const [inputValTitle, setInputValTitle] = useState("");
  const [inputValDesc, setInputValDesc] = useState("");

  const handleInputTitleChange = (event) => {
    setInputValTitle(event.target.value);
  };

  const handleInputDescChange = (event) => {
    setInputValDesc(event.target.value);
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleConfirmClick = () => {
    if (inputValTitle !== "") {
      product.title = inputValTitle;
      setInputValTitle("");
    }
    if (inputValDesc !== "") {
      product.description = inputValDesc;
      setInputValDesc("");
    }
    setEditing(false);
  };

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
      <td className="editing">
        {isEditing ? (
          <>
            <button className="edit" id="confirmButton" onClick={handleConfirmClick}>
              Zatwierdź
            </button>
            <div>
              <label htmlFor='changeTitle'>Tytuł:</label>
              <input type='text' id='changeTitle' value={inputValTitle} onChange={handleInputTitleChange} autoComplete='off'></input>

            </div>
            <div>
              <label htmlFor='changeDescription'>Opis:</label>
              <input type='text' id='changeDescription' value={inputValDesc} onChange={handleInputDescChange} autoComplete='off'></input>
            </div>
          </>
        ) : (
          <button className="edit" id="editButton" onClick={handleEditClick}>
            Edytuj
          </button>
        )}
      </td>
    </tr>
  );
}

