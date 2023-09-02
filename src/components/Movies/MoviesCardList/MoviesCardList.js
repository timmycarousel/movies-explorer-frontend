import React, { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import movieData from "../MovieData/MovieData";

export default function MoviesCardList() {
  const [visibleMovies, setVisibleMovies] = useState(12);

  // Добавим медиазапрос для отслеживания ширины экрана
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 895) {
        setVisibleMovies(8);
      } else {
        setVisibleMovies(12);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleShowMore = () => {
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
