import React, { useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import movieData from "../MovieData/MovieData";

export default function MoviesCardList() {
  const [visibleMovies, setVisibleMovies] = useState(12); // Начальное количество видимых фильмов

  const handleShowMore = () => {
    // Обработчик для кнопки "Еще"
    // Увеличиваем количество видимых фильмов на 12 при каждом клике
    setVisibleMovies(visibleMovies + 12);
  };

  return (
    <>
      <section className="movies-card-list">
        <div className="movies-card-list__container">
          {movieData.slice(0, visibleMovies).map((movie, index) => (
            <MoviesCard key={index} movie={movie} />
          ))}
        </div>
        {/* Показываем кнопку "Еще", если есть еще фильмы для показа */}
        {visibleMovies < movieData.length && (
          <button className="movies-card-list__button" onClick={handleShowMore}>
            Еще
          </button>
        )}
      </section>
    </>
  );
}
