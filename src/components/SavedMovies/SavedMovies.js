import { React, useEffect, useContext } from "react";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
// import movieData from "../Movies/MovieData/MovieData";
import SearchForm from "../Movies/SearchForm/SearchForm";
import * as MainApi from "../../utils/MainApi";
import { MoviesUserContext } from "../contexts/MoviesUserContext";

export default function SavedMovies({ getMovies }) {
  // const savedMovies = movieData.filter((movie) => movie.saved);
  const { userMovies, setUserMovies } = useContext(MoviesUserContext);
  // const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="saved-movies">
      <SearchForm />
      <MoviesCardList movies={userMovies} />
    </div>
  );
}
