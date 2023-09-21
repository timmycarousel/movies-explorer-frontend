import React, { useState } from "react";
import { movieServer } from "../../../utils/constants";
import { saveMovie, removeMovie } from "../../../utils/MainApi"; // Подключите ваши функции для сохранения и удаления фильма

function MovieCard({ movie }) {
  const openPopup = (url) => {
    window.open(url, "MovieTrailer", "width=800,height=600");
  };

  const [liked, setLiked] = useState(false);

  const hours = Math.floor(movie.duration / 60);
  const minutes = movie.duration % 60;

  const toggleLike = () => {
    if (liked) {
      // Если уже лайкнут, то удаляем фильм
      removeMovie(movie._id) // Используйте соответствующий идентификатор фильма
        .then(() => {
          setLiked(false); // Обновляем состояние после успешного удаления
        })
        .catch((error) => {
          console.error("Ошибка при удалении фильма:", error);
        });
    } else {
      // Если не лайкнут, то сохраняем фильм
      saveMovie({ movie })
        .then(() => {
          setLiked(true); // Обновляем состояние после успешного сохранения
        })
        .catch((error) => {
          console.error("Ошибка при сохранении фильма:", error);
        });
    }
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
