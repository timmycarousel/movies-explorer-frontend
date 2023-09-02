import React from "react";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import movieData from "../Movies/MovieData/MovieData";
import SearchForm from "../Movies/SearchForm/SearchForm";

export default function SavedMovies() {
  // Фильтруем фильмы, чтобы получить только сохраненные
  const savedMovies = movieData.filter((movie) => movie.saved);

  // Выводим savedMovies в консоль
  console.log(savedMovies);

  return (
    <div className="saved-movies">
      <SearchForm />
      <MoviesCardList movies={savedMovies} />
    </div>
  );
}
