import React, { useEffect, useContext, useState } from "react";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import { MoviesUserContext } from "../contexts/MoviesUserContext";

export default function SavedMovies({ getMovies }) {
  const { userMovies } = useContext(MoviesUserContext);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isToggledMovies, setIsToggledMovies] = useState(
    localStorage.getItem("isToggledMovies") === "true"
  );

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    setFilteredMovies(userMovies);
  }, [userMovies]);

  useEffect(() => {
    // Восстановление значения isToggledMovies из localStorage
    const isToggledFromStorage =
      localStorage.getItem("isToggledMovies") === "true";
    setIsToggledMovies(isToggledFromStorage);
  }, []); // Пустой массив зависимостей, чтобы эффект выполнился только один раз при загрузке компонента

  function handleSearchMovies() {
    const filtered = filterMovies(userMovies, isToggledMovies, searchQuery);

    if (filtered.length === 0) {
      setIsMoviesNotFound(true);
    }

    setFilteredMovies(filtered);
  }
  // Функция для фильтрации фильмов
  const filterMovies = () => {
    let filtered = userMovies;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (movie) =>
          movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(query.toLowerCase()) ||
          movie.director.toLowerCase().includes(query.toLowerCase()) ||
          movie.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (isToggledMovies) {
      filtered = filtered.filter((movie) => movie.duration < 35);
    }

    setFilteredMovies(filtered);
  };

  // Обработчик изменения значения в поисковой строке
  const handleSearchChange = (evt) => {
    const value = evt.target.value;
    setSearchQuery(value);
  };

  // Обработчик фильтрации
  const handleFilterToggle = () => {
    const newIsToggledMovies = !isToggledMovies;
    setIsToggledMovies(newIsToggledMovies);
    localStorage.setItem("isToggledMovies", newIsToggledMovies.toString());

    // Вызываем фильтрацию при изменении фильтра
    filterMovies();
  };

  return (
    <div className="saved-movies">
      <SearchForm
        onSearchSubmit={handleSearchMovies}
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        isToggled={isToggledMovies}
        onToggle={handleFilterToggle}
      />
      {filteredMovies.length > 0 ? (
        <MoviesCardList movies={filteredMovies} />
      ) : (
        <p className="movies__no-films">Ничего не найдено</p>
      )}
    </div>
  );
}
