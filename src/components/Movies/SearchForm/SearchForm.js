import React, { useState, useEffect } from "react";
import find from "../../../images/find.svg";

export default function SearchForm({
  searchQuery,
  onSearchSubmit,
  isToggled,
  onToggle,
  handleSearchChange,
}) {
  const [validationError, setValidationError] = useState("");
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (searchQuery.trim() === "") {
      setValidationError("Нужно ввести ключевое слово");
      return;
    }
    setValidationError("");
    onSearchSubmit(searchQuery); // Передаем searchQuery в родительский компонент
  };

  // console.log(validationError);

  return (
    <form className="search-form" onSubmit={handleSubmit} noValidate>
      <div className="search-form__input-container">
        <input
          className="search-form__input"
          type="search"
          placeholder="Фильм"
          required
          value={searchQuery}
          onChange={handleSearchChange}
          autoComplete="off"
        />
        <button className="search-form__button" type="submit">
          <img src={find} alt="Иконка поиска" className="search-form__icon" />
        </button>
      </div>
      {validationError && (
        <div className="search-form__error">{validationError}</div>
      )}
      <div className="search-form__toggle">
        <input
          className="search-form__toggle-checkbox"
          type="checkbox"
          id="shortFilmToggle"
          onChange={onToggle}
          checked={isToggled}
        />

        <label className="search-form__toggle-label" htmlFor="shortFilmToggle">
          <span className="search-form__toggle-slider"></span>
        </label>

        <span className="search-form__toggle-text">Короткометражки</span>
      </div>
    </form>
  );
}
