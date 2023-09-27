import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import * as moviesApi from "../../utils/MoviesApi.js";
import { SHORT_FILM_DURATION } from "../../utils/constants";

export default function Movies({ getUserMovies }) {
  const [isLoading, setIsLoading] = useState(false);
  const [moviesList, setMoviesList] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem("searchQuery") || ""
  );
  const [isToggled, setIsToggled] = useState(
    localStorage.getItem("isToggled") === "true"
  );
  const [hasSearched, setHasSearched] = useState(
    localStorage.getItem("hasSearched") === "true"
  );
  const [searchQueryAfterSubmit, setSearchQueryAfterSubmit] = useState(
    localStorage.getItem("searchQueryAfterSubmit") || ""
  );

  useEffect(() => {
    getUserMovies();
  }, []);

  useEffect(() => {
    const localMovies = JSON.parse(localStorage.getItem("moviesList")) || [];
    setMoviesList(localMovies);
  }, []);

  useEffect(() => {
    if (hasSearched) {
      const filtered = moviesList.filter((movie) => {
        const isMatching =
          movie.nameRU
            .toLowerCase()
            .includes(searchQueryAfterSubmit.toLowerCase()) ||
          movie.nameEN
            .toLowerCase()
            .includes(searchQueryAfterSubmit.toLowerCase());
        if (isToggled) {
          return isMatching && movie.duration < SHORT_FILM_DURATION;
        } else {
          return isMatching;
        }
      });

      setFilteredMovies(filtered);

      localStorage.setItem("filteredMovies", JSON.stringify(filtered));
    }
  }, [searchQueryAfterSubmit, isToggled, moviesList, hasSearched]);

  const handleSearch = () => {
    if (!hasSearched && moviesList.length === 0) {
      setIsLoading(true);

      moviesApi
        .getMovies()
        .then((data) => {
          setMoviesList(data);
          setIsLoading(false);
          console.log("получаем фильмы с сервера большого", data);

          localStorage.setItem("moviesList", JSON.stringify(data));
        })
        .catch((error) => {
          console.error("Ошибка при загрузке фильмов:", error);
          setIsLoading(false);
        });
    }

    localStorage.setItem("searchQuery", searchQuery);
    localStorage.setItem("isToggled", isToggled ? "true" : "false");
    localStorage.setItem("hasSearched", "true");
    localStorage.setItem("searchQueryAfterSubmit", searchQuery);
    setHasSearched(true);
    setSearchQueryAfterSubmit(searchQuery);
  };

  const handleSearchChange = (evt) => {
    const value = evt.target.value;
    setSearchQuery(value);
  };

  const handleToggle = () => {
    const updatedIsToggled = !isToggled;
    setIsToggled(updatedIsToggled);
    localStorage.setItem("isToggled", updatedIsToggled ? "true" : "false");
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

      {!isLoading && hasSearched && filteredMovies.length === 0 ? (
        <p className="movies__no-films">Ничего не найдено</p>
      ) : (
        <MoviesCardList
          movies={filteredMovies}
          isLoading={isLoading}
          isMoviesPage={true}
        />
      )}
    </main>
  );
}
