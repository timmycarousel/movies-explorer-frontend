import { React, useEffect, useState } from "react";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
// import movieData from "../Movies/MovieData/MovieData";
import SearchForm from "../Movies/SearchForm/SearchForm";
import * as MainApi from "../../utils/MainApi";

export default function SavedMovies() {
  // const savedMovies = movieData.filter((movie) => movie.saved);
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    function fetchData() {
      MainApi.getMovies()
        .then((data) => {
          setMoviesList(data);
          console.log("ПОЛУЧАЕМ ФИЛЬМЫ", data);
        })
        .catch((error) => {
          console.error("Ошибка при загрузке фильмов:", error);
        });
    }

    fetchData();
  }, []);

  return (
    <div className="saved-movies">
      <SearchForm />
      <MoviesCardList movies={moviesList} />
    </div>
  );
}
