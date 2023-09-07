// import React from "react";
// import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
// import movieData from "../Movies/MovieData/MovieData";
// import SearchForm from "../Movies/SearchForm/SearchForm";

// export default function AllMoviesCardList() {
//   return (
//     <div className="all-movies">
//       <SearchForm />
//       <MoviesCardList movies={movieData} />
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";

export default function AllMoviesCardList() {
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    // Получаем отфильтрованные фильмы из локального хранилища
    const filteredMoviesFromLocalStorage = JSON.parse(
      localStorage.getItem("filteredMovies")
    );

    if (filteredMoviesFromLocalStorage) {
      setFilteredMovies(filteredMoviesFromLocalStorage);
    }
  }, []);

  return (
    <div className="all-movies">
      <SearchForm />
      <MoviesCardList movies={filteredMovies} />
    </div>
  );
}
