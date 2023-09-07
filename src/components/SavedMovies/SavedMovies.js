import React from "react";
// import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
// import movieData from "../Movies/MovieData/MovieData";
import SearchForm from "../Movies/SearchForm/SearchForm";

export default function SavedMovies() {
  // const savedMovies = movieData.filter((movie) => movie.saved);

  return (
    <div className="saved-movies">
      <SearchForm />
      {/* <MoviesCardList /> */}
    </div>
  );
}
