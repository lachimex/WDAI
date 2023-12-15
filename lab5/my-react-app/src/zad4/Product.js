import React, { useState } from 'react';
import "./style4.css"

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
    if (inputValTitle !== ""){
      product.title = inputValTitle;
      setInputValTitle("");
    }
    if (inputValDesc !== ""){
      product.description = inputValDesc;
      setInputValDesc("");
    }
    setEditing(false);
  };

  return (
    <div id="data-content">
      <div id="img">
        <img src={product.thumbnail} alt="" />
      </div>
      <div id="title">
        <p>{product.title}</p>
      </div>
      <p>{product.description}</p>
      {isEditing ? (
        <>
          <button className="edit" id="confirmButton" onClick={handleConfirmClick}>
            Zatwierdź
          </button>
          <form id="form">
            <label htmlFor='changeTitle'>Tytuł:</label>
            <input type='text' id='changeTitle' value={inputValTitle} onChange={handleInputTitleChange} autoComplete='off'></input>
            <label htmlFor='changeDescription'>Opis:</label>
            <input type='text' id='changeDescription' value={inputValDesc} onChange={handleInputDescChange} autoComplete='off'></input>
          </form>
        </>
      ) : (
        <button className="edit" id="editButton" onClick={handleEditClick}>
          Edytuj
        </button>
      )}
    </div>
  );
}

