import React, { useEffect, useContext, useState } from "react";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import { MoviesUserContext } from "../contexts/MoviesUserContext";

export default function SavedMovies({ getMovies }) {
  const { userMovies } = useContext(MoviesUserContext);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isToggledMovies, setIsToggledMovies] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    setFilteredMovies(userMovies);
  }, [userMovies]);

  useEffect(() => {
    if (hasSearched) {
      handleSearchMovies();
    }
  }, [searchQuery, isToggledMovies, hasSearched]);

  function handleSearchMovies() {
    const filtered = filterMovies(userMovies, isToggledMovies, searchQuery);

    setFilteredMovies(filtered);
  }

  const filterMovies = () => {
    let filtered = userMovies;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (movie) =>
          movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (isToggledMovies) {
      filtered = filtered.filter((movie) => movie.duration < 35);
    }

    return filtered;
  };

  const handleSearchChange = (evt) => {
    const value = evt.target.value;
    setSearchQuery(value);
  };

  const handleFilterToggle = () => {
    const newIsToggledMovies = !isToggledMovies;
    setIsToggledMovies(newIsToggledMovies);
  };

  const handleSearchSubmit = () => {
    setHasSearched(true);
    handleSearchMovies();
  };

  return (
    <div className="saved-movies">
      <SearchForm
        onSearchSubmit={handleSearchSubmit}
        searchQuery={searchQuery}
        isToggled={isToggledMovies}
        onToggle={handleFilterToggle}
        handleSearchChange={handleSearchChange}
      />

      {hasSearched && filteredMovies.length === 0 ? (
        <p className="movies__no-films">Ничего не найдено</p>
      ) : (
        <MoviesCardList movies={filteredMovies} isMoviesPage={false} />
      )}
    </div>
  );
}
