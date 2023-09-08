// MoviesCardList.js
import React, { useState, useEffect } from "react";
import Preloader from "../../Preloader/Preloader";
import { renderMovies } from "../../../utils/movieUtils";

export default function MoviesCardList({ isLoading, movies }) {
  const [visibleMovies, setVisibleMovies] = useState(
    window.innerWidth <= 400 ? 5 : window.innerWidth <= 895 ? 8 : 12
  );

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

  useEffect(() => {
    // В этой функции можно выполнить действия при изменении isLoading
    if (isLoading) {
      console.log("Излоадинг тру");
    } else {
      console.log("Излоадинг фалс");
    }
  }, [isLoading]); // Зависимость от isLoading

  return (
    <section className="movies-card-list">
      {isLoading ? <Preloader /> : renderMovies(movies.slice(0, visibleMovies))}
      {visibleMovies < movies.length && (
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
