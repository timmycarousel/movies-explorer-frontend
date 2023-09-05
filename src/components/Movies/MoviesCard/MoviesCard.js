import React, { useState } from "react";

function MovieCard({ movie }) {
  const [liked, setLiked] = useState(false);

  const hours = Math.floor(movie.duration / 60);
  const minutes = movie.duration % 60;

  const toggleLike = () => {
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
          type="button"
        ></button>
      </div>
      <p className="movie-card__duration">
        {hours > 0 ? `${hours}ч ${minutes}м` : `${minutes} м`}
      </p>
    </div>
  );
}

export default MovieCard;
