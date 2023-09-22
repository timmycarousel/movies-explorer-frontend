import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

export default function Movies({
  getMovies,
  isLoading,
  moviesList,
  getUserMovies,
}) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isToggled, setIsToggled] = useState(
    localStorage.getItem("isToggled") === "true"
  );

  useEffect(() => {
    if (moviesList.length === 0) {
      getMovies();
    }
  }, []);

  useEffect(() => {
    getUserMovies();
  }, []);

  useEffect(() => {
    const localMovies =
      JSON.parse(localStorage.getItem("filteredMovies")) || [];
    const localQuery = localStorage.getItem("query") || "";
    setSearchQuery(localQuery);
    setFilteredMovies(isToggled ? filterShortFilms(localMovies) : localMovies);
  }, [isToggled]);

  const loadLocalStorage = () => {
    const localMovies = JSON.parse(localStorage.getItem("filteredMovies"));
    return localMovies || [];
  };

  const filterShortFilms = (movieList) => {
    return movieList.filter((movie) => movie.duration < 35);
  };

  const handleSearch = () => {
    const filtered = moviesList.filter((movie) => {
      const isMatching =
        movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchQuery.toLowerCase());
      if (isToggled) {
        return isMatching && movie.duration < 35;
      } else {
        return isMatching;
      }
    });

    setFilteredMovies(filtered);
    localStorage.setItem("filteredMovies", JSON.stringify(filtered));
    localStorage.setItem("query", searchQuery);
  };

  const handleSearchChange = (evt) => {
    const value = evt.target.value;
    setSearchQuery(value);
  };

  const handleToggle = () => {
    if (!isToggled) {
      const shortMoviesList = filterShortFilms(filteredMovies);
      setFilteredMovies(shortMoviesList);
      localStorage.setItem("shortMovies", JSON.stringify(shortMoviesList));
    } else {
      setFilteredMovies(loadLocalStorage());
      localStorage.removeItem("shortMovies");
    }
    setIsToggled(!isToggled);
    localStorage.setItem("isToggled", isToggled ? "false" : "true");
  };

  return (
    <main className="movies">
      <SearchForm
        onSearchSubmit={handleSearch}
        searchQuery={searchQuery}
        isToggled={isToggled}
        onToggle={handleToggle}
        handleSearchChange={handleSearchChange}
      />
      {filteredMovies.length > 0 ? (
        <MoviesCardList movies={filteredMovies} isLoading={isLoading} />
      ) : (
        <p className="movies__no-films">Ничего не найдено</p>
      )}
    </main>
  );
}
