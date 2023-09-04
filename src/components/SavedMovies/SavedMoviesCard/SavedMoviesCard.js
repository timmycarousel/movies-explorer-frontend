import React, { useState } from "react";
import MoviesCard from "../../Movies/MoviesCard/MoviesCard";
import likeIcon from "../../../images/d4.svg";

function SavedMoviesCard({ movie }) {
  return (
    <MoviesCard movie={movie}>
      {/* Переопределите изображение лайка */}
      <button className="movie-card__like-button">
        <img src={likeIcon} alt="Лайк" />
      </button>
    </MoviesCard>
  );
}

export default SavedMoviesCard;
