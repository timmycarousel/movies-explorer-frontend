import React from "react";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import movieData from "../Movies/MovieData/MovieData";
import SearchForm from "../Movies/SearchForm/SearchForm";

export default function AllMoviesCardList() {
  return (
    <div className="all-movies">
      <SearchForm />
      <MoviesCardList movies={movieData} />
    </div>
  );
}
