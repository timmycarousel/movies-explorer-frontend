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

// import React from "react";
// import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
// import SearchForm from "../Movies/SearchForm/SearchForm";
// import { getFilteredMoviesFromLocalStorage } from "../../utils/movieUtils";
// import { useMovieSearch } from "../../utils/searchMovies";

// export default function AllMoviesCardList() {
//   const filteredMovies = getFilteredMoviesFromLocalStorage();
//   const { isLoading } = useMovieSearch();

//   return (
//     <div className="all-movies">
//       <SearchForm />
//       <MoviesCardList movies={filteredMovies} isLoading={isLoading} />
//     </div>
//   );
// }
