import React from "react";

import find from "../../../images/find.svg";

export default function SearchForm() {
  return (
    <form className="search-form">
      <div className="search-form__input-container">
        <input className="search-form__input" type="text" placeholder="Фильм" />
        <button className="search-form__button">
          <img src={find} alt="Иконка поиска" className="search-form__icon" />
        </button>
      </div>
      <div className="search-form__toggle">
        <input
          className="search-form__toggle-checkbox"
          type="checkbox"
          id="shortFilmToggle"
        />
        <label className="search-form__toggle-label" htmlFor="shortFilmToggle">
          <div className="search-form__toggle-slider"></div>
        </label>
        <span className="search-form__toggle-text">Короткометражки</span>
      </div>
    </form>
  );
}
