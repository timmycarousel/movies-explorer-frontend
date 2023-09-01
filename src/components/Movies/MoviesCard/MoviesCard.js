import React, { useState } from "react";
import likedIcon from "../../../images/likedIkon.svg"; // Импортируйте изображение для активного состояния
import unlikedIcon from "../../../images/unlikedIcon.svg"; // Импортируйте изображение для неактивного состояния

function MovieCard({ movie }) {
  // Инициализация начального состояния liked как false
  const [liked, setLiked] = useState(false);

  const hours = Math.floor(movie.duration / 60);
  const minutes = movie.duration % 60;

  const toggleLike = () => {
    // При клике на кнопку, меняем состояние liked на противоположное
    setLiked(!liked);
  };

  // В зависимости от состояния liked отображаем соответствующее изображение
  const likeIcon = liked ? likedIcon : unlikedIcon;

  return (
    <div className="movie-card">
      <img src={movie.imageUrl} alt={movie.title} />
      <div className="movie-card__info">
        <h2 className="movie-card__title">{movie.title}</h2>
        <button className="movie-card__like-button" onClick={toggleLike}>
          <img src={likeIcon} alt="Лайк" />
        </button>
      </div>
      <p className="movie-card__duration">
        {hours > 0 ? `${hours}ч ${minutes}м` : `${minutes} м`}
      </p>
    </div>
  );
}

export default MovieCard;
