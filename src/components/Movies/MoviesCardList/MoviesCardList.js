import React, { useState, useEffect } from "react";
import Preloader from "../../Preloader/Preloader";
import { renderMovies } from "../../../utils/movieUtils";

export default function MoviesCardList({ isLoading, movies, isMoviesPage }) {
  const [visibleMovies, setVisibleMovies] = useState(
    isMoviesPage
      ? window.innerWidth <= 400
        ? 5
        : window.innerWidth <= 767
        ? 8
        : 12
      : movies.length
  );

  useEffect(() => {
    if (!isMoviesPage) {
      setVisibleMovies(movies.length);
    }
  }, [movies, isMoviesPage]);

  useEffect(() => {
    let resizeTimer;

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (isMoviesPage) {
          setVisibleMovies(
            window.innerWidth <= 400 ? 5 : window.innerWidth <= 767 ? 8 : 12
          );
        } else {
          setVisibleMovies(movies.length);
        }
      }, 1000);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMoviesPage, movies]);

  const handleShowMore = () => {
    let cardsToAdd = 0;

    if (window.innerWidth >= 1280) {
      cardsToAdd = 3 - (visibleMovies % 3);
    } else if (window.innerWidth >= 895) {
      cardsToAdd = 2 - (visibleMovies % 2);
    } else if (window.innerWidth >= 320) {
      cardsToAdd = 2 - (visibleMovies % 2);
    }

    setVisibleMovies(visibleMovies + cardsToAdd);
  };

  return (
    <section className="movies-card-list">
      {isLoading ? <Preloader /> : renderMovies(movies.slice(0, visibleMovies))}
      {isMoviesPage && visibleMovies < movies.length && (
        <button
          className="movies-card-list__button"
          onClick={handleShowMore}
          type="button"
        >
          Еще
        </button>
      )}
    </section>
  );
}
