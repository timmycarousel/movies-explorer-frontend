import React, { useState, useEffect } from "react";
import find from "../../../images/find.svg";

export default function SearchForm({
  searchQuery,
  onSearchSubmit,
  onShortFilmToggle,
  isToggled,
  handleSearchChange,
}) {
  // Восстанавливаем последний запрос поисковой строки и состояние переключателя из локального хранилища
  useEffect(() => {
    const storedSearchQuery = localStorage.getItem("lastSearchQuery") || "";
    const storedIsShortFilm = localStorage.getItem("isShortFilm") === "true";

    if (storedSearchQuery !== searchQuery) {
      // Обновляем searchQuery, если значение из локального хранилища отличается
      handleSearchChange(storedSearchQuery);
    }

    if (storedIsShortFilm !== isToggled) {
      // Обновляем состояние переключателя, если значение из локального хранилища отличается
      onShortFilmToggle();
    }
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSearchSubmit(searchQuery); // Передаем searchQuery в родительский компонент
  };

  const handleChange = (evt) => {
    // Вызываем обработчик onChange с новым значением
    handleSearchChange(evt.target.value);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__input-container">
        <input
          className="search-form__input"
          type="search"
          placeholder="Фильм"
          required
          value={searchQuery}
          onChange={handleChange}
          autoComplete="off"
        />
        <button className="search-form__button" type="submit">
          <img src={find} alt="Иконка поиска" className="search-form__icon" />
        </button>
      </div>
      <div className="search-form__toggle">
        <input
          className="search-form__toggle-checkbox"
          type="checkbox"
          id="shortFilmToggle"
          onChange={onShortFilmToggle}
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
