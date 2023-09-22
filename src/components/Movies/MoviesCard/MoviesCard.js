import React, { useState, useContext, useEffect } from "react";
import { movieServer } from "../../../utils/constants";
import { saveMovie, removeMovie } from "../../../utils/MainApi"; // Подключите ваши функции для сохранения и удаления фильма
import { MoviesUserContext } from "../../contexts/MoviesUserContext";

function MovieCard({ movie }) {
  const [liked, setLiked] = useState(false);

  const { userMovies, setUserMovies } = useContext(MoviesUserContext);

  const openPopup = (url) => {
    window.open(url, "MovieTrailer", "width=800,height=600");
  };

  const hours = Math.floor(movie.duration / 60);
  const minutes = movie.duration % 60;

  const isOnMoviesPage = window.location.pathname === "/movies"; // Проверка текущего URL-пути

  const imageSrc = isOnMoviesPage
    ? `${movieServer}${movie.image.url}`
    : movie.image.url;

  useEffect(() => {
    setLiked(userMovies.some((userMovie) => userMovie.nameRU === movie.nameRU));
  }, [userMovies, movie.nameRU]);

  console.log("ЮЗЕР МУВИС", userMovies);

  const handleSaveMovie = () => {
    saveMovie({ movie })
      .then(() => {
        setLiked(true); // Обновляем состояние после успешного сохранения
        setUserMovies([...userMovies, movie]);
      })
      .catch((error) => {
        console.error("Ошибка при сохранении фильма:", error);
      });
  };

  const handleRemoveMovie = () => {
    console.log("handleRemoveMovie called");
    removeMovie(movie._id)
      .then(() => {
        setUserMovies(
          userMovies.filter((userMovie) => userMovie._id !== movie._id)
        );
      })
      .catch((error) => {
        console.error("Ошибка при удалении фильма:", error);
      });
  };

  const toggleLike = () => {
    console.log("Лайкнута?", liked);
    if (liked) {
      handleRemoveMovie();
    } else {
      handleSaveMovie();
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
          <img src={imageSrc} alt={movie.nameRU} />
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
