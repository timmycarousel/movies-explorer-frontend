import React from "react";
import MoviesCard from "../components/Movies/MoviesCard/MoviesCard";

export function getFilteredMoviesFromLocalStorage() {
  const filteredMoviesFromLocalStorage = JSON.parse(
    localStorage.getItem("filteredMovies")
  );

  return filteredMoviesFromLocalStorage || [];
}

// Отдельная функция для рендера фильмов
export function renderMovies(movies, visibleMovies) {
  return (
    <div className="movies-card-list__container">
      {movies.slice(0, visibleMovies).map((movie, index) => (
        <MoviesCard key={index} movie={movie}></MoviesCard>
      ))}
    </div>
  );
}
