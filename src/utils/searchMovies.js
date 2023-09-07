import { useState } from "react";
import { getMovies } from "./MoviesApi"; // Подставьте правильный путь к вашей функции getMovies

export function useMovieSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [shortFilm, setShortFilm] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    return getMovies(searchQuery)
      .then((movies) => {
        const filteredMovies = movies.filter((movie) => {
          const isMatchingName =
            movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase()) ||
            movie.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
            movie.description.toLowerCase().includes(searchQuery.toLowerCase());
          const isShortFilm = shortFilm ? movie.duration <= 40 : true;
          return isMatchingName && isShortFilm;
        });

        localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));

        console.log(filteredMovies);
        setSearchQuery("");
        return filteredMovies;
      })
      .catch((error) => {
        console.error("Ошибка при получении фильмов:", error);
        return [];
      });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleShortFilmToggle = (e) => {
    setShortFilm(e.target.checked);
  };

  return {
    searchQuery,
    handleSearchSubmit,
    handleSearchChange,
    handleShortFilmToggle,
  };
}
