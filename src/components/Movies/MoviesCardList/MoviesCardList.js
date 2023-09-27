import React, { useState, useEffect } from "react";
import Preloader from "../../Preloader/Preloader";
import { renderMovies } from "../../../utils/movieUtils";
import {
  MOBILE_MAX_WIDTH,
  TABLET_MAX_WIDTH,
  MOBILE_VISIBLE_MOVIES,
  TABLET_VISIBLE_MOVIES,
  DESKTOP_VISIBLE_MOVIES,
  MOBILE_MIN_WITH,
} from "../../../utils/constants";

export default function MoviesCardList({ isLoading, movies, isMoviesPage }) {
  const [visibleMovies, setVisibleMovies] = useState(
    isMoviesPage
      ? window.innerWidth <= MOBILE_MAX_WIDTH
        ? MOBILE_VISIBLE_MOVIES
        : window.innerWidth <= TABLET_MAX_WIDTH
        ? TABLET_VISIBLE_MOVIES
        : DESKTOP_VISIBLE_MOVIES
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
            window.innerWidth <= MOBILE_MAX_WIDTH
              ? MOBILE_VISIBLE_MOVIES
              : window.innerWidth <= TABLET_MAX_WIDTH
              ? TABLET_VISIBLE_MOVIES
              : DESKTOP_VISIBLE_MOVIES
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

    if (window.innerWidth >= TABLET_MAX_WIDTH) {
      cardsToAdd = 3 - (visibleMovies % 3);
    } else if (window.innerWidth >= MOBILE_MAX_WIDTH) {
      cardsToAdd = 2 - (visibleMovies % 2);
    } else if (window.innerWidth >= MOBILE_MIN_WITH) {
      cardsToAdd = 2;
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
