import React, { useState } from "react";

import { movieServer } from "../../../utils/constants";

function MovieCard({ movie }) {
  const openPopup = (url) => {
    window.open(url, "MovieTrailer", "width=800,height=600");
  };

  const [liked, setLiked] = useState(false);

  const hours = Math.floor(movie.duration / 60);
  const minutes = movie.duration % 60;

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className={`movie-card ${liked ? "liked" : "unliked"}`}>
      <div className="movie-card-img">
        <a
          href="#"
          target="_blank"
          onClick={() => openPopup(movie.trailerLink)}
        >
          <img src={`${movieServer}${movie.image.url}`} alt={movie.nameRU} />
        </a>
      </div>
      <div className="movie-card__info">
        <h2 className="movie-card__title">{movie.nameRU}</h2>
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
