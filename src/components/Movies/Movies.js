import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import * as moviesApi from "../../utils/MoviesApi.js";

export default function Movies({ getUserMovies }) {
  const [isLoading, setIsLoading] = useState(true);
  const [moviesList, setMoviesList] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isToggled, setIsToggled] = useState(
    localStorage.getItem("isToggled") === "true"
  );
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    getUserMovies();
  }, []);

  function getMovies() {
    return moviesApi
      .getMovies()
      .then((data) => {
        setMoviesList(data);
        setIsLoading(false);
        console.log("получаем фильмы с сервера большого", data);
        return data;
      })
      .catch((error) => {
        console.error("Ошибка при загрузке фильмов:", error);
        setIsLoading(false);
        return Promise.reject(error);
      });
  }
  useEffect(() => {
    if (moviesList.length === 0) {
      getMovies();
    }
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
        movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase());
      if (isToggled) {
        return isMatching && movie.duration < 35;
      } else {
        return isMatching;
      }
    });

    setFilteredMovies(filtered);
    localStorage.setItem("filteredMovies", JSON.stringify(filtered));
    localStorage.setItem("query", searchQuery);

    setHasSearched(true);
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
      {hasSearched && filteredMovies.length === 0 ? (
        <p className="movies__no-films">Ничего не найдено</p>
      ) : (
        <MoviesCardList movies={filteredMovies} isLoading={isLoading} />
      )}
    </main>
  );
}
