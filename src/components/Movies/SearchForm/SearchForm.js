import React from "react";
import find from "../../../images/find.svg";
import { useMovieSearch } from "../../../utils/searchMovies"; // Импортируйте новый модуль

export default function SearchForm() {
  const {
    searchQuery,
    handleSearchSubmit,
    handleSearchChange,
    handleShortFilmToggle,
  } = useMovieSearch();

  return (
    <form className="search-form" onSubmit={handleSearchSubmit}>
      <div className="search-form__input-container">
        <input
          className="search-form__input"
          type="text"
          placeholder="Фильм"
          required
          value={searchQuery}
          onChange={handleSearchChange}
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
          onChange={handleShortFilmToggle}
        />
        <label className="search-form__toggle-label" htmlFor="shortFilmToggle">
          <span className="search-form__toggle-slider"></span>
        </label>
        <span className="search-form__toggle-text">Короткометражки</span>
      </div>
    </form>
  );
}
