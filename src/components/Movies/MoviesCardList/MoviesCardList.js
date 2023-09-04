import React, { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({ movies }) {
  const [visibleMovies, setVisibleMovies] = useState(
    window.innerWidth <= 400 ? 5 : window.innerWidth <= 895 ? 8 : 12
  );

  // Добавим медиазапрос для отслеживания ширины экрана
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 400) {
        setVisibleMovies(5);
      } else if (window.innerWidth <= 895) {
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
          {movies.slice(0, visibleMovies).map((movie, index) => (
            <MoviesCard key={index} movie={movie}></MoviesCard>
          ))}
        </div>
        {visibleMovies < movies.length && (
          <button className="movies-card-list__button" onClick={handleShowMore}>
            Еще
          </button>
        )}
      </section>
    </>
  );
}
