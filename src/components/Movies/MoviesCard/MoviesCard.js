import React, { useState } from "react";

function MovieCard({ movie }) {
  // Инициализация начального состояния liked как false
  const [liked, setLiked] = useState(false);

  const hours = Math.floor(movie.duration / 60);
  const minutes = movie.duration % 60;

  const toggleLike = () => {
    // При клике на кнопку, меняем состояние liked на противоположное
    setLiked(!liked);
  };

  return (
    <div className={`movie-card ${liked ? "liked" : "unliked"}`}>
      <img src={movie.imageUrl} alt={movie.title} />
      <div className="movie-card__info">
        <h2 className="movie-card__title">{movie.title}</h2>
        <button
          className="movie-card__like-button"
          onClick={toggleLike}
        ></button>
      </div>
      <p className="movie-card__duration">
        {hours > 0 ? `${hours}ч ${minutes}м` : `${minutes} м`}
      </p>
    </div>
  );
}

export default MovieCard;
