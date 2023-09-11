import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import * as moviesApi from "../../utils/MoviesApi";

export default function Movies() {
  // Стейт переменные для хранения данных о фильмах и состояния загрузки
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isToggled, setIsToggled] = useState(false);

  // Получаем значения из localStorage для управления состоянием
  const localStorageIsToggled = localStorage.getItem("isToggled");
  const localStorageMovies = JSON.parse(localStorage.getItem("filteredMovies"));

  // Используем useEffect для обработки значений из localStorage при монтировании компонента
  useEffect(() => {
    if (localStorageIsToggled) {
      setIsToggled(true);
    } else {
      setIsToggled(false);
    }
  }, [localStorageIsToggled]);

  useEffect(() => {
    setIsLoading(true);
    const localMovies = loadMoviesFromLocalStorage();
    setFilteredMovies(localMovies);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Загружаем фильмы с сервера и обновляем состояние при монтировании компонента
    const fetchMovies = () => {
      setIsLoading(true);
      moviesApi
        .getMovies()
        .then((data) => {
          setMoviesList(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Ошибка при загрузке фильмов:", error);
          setIsLoading(false);
        });
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    // Обрабатываем данные из localStorage при монтировании компонента
    handleLocalStorageData();
  }, []);

  const loadMoviesFromLocalStorage = () => {
    const localMovies = JSON.parse(localStorage.getItem("filteredMovies"));
    return localMovies || [];
  };

  function handleLocalStorageData() {
    const localStorageMovies = JSON.parse(
      localStorage.getItem("filteredMovies")
    );
    const localStorageQuery = localStorage.getItem("query");

    if (localStorageMovies === null) {
      return;
    }

    setSearchQuery(localStorageQuery || "");
    setFilteredMovies(localStorageMovies);
  }

  function handleMovieSearch() {
    // Фильтруем фильмы на основе поискового запроса и устанавливаем результаты
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
  }

  function filterShortFilms() {
    // Фильтруем короткометражные фильмы
    return filteredMovies.filter((movie) => movie.duration < 35);
  }

  const handleSearchChange = (evt) => {
    // Обработчик изменения значения в поле поиска
    const value = evt.target.value;
    setSearchQuery(value);
  };

  function handleToggleSwitch() {
    // Обработчик переключения состояния короткометражных фильмов
    if (isToggled === false) {
      const shortMoviesList = filterShortFilms();
      setIsToggled(true);
      setFilteredMovies(shortMoviesList);
      localStorage.setItem("isToggled", true);
      localStorage.setItem("shortMovies", JSON.stringify(shortMoviesList));
    } else {
      setIsToggled(false);
      setFilteredMovies(localStorageMovies);
      localStorage.removeItem("isToggled");
      localStorage.removeItem("shortMovies");
    }
  }

  return (
    <main className="movies">
      {/* Компонент формы поиска */}
      <SearchForm
        onSearchSubmit={handleMovieSearch}
        searchQuery={searchQuery}
        isToggled={isToggled}
        onToggle={handleToggleSwitch}
        handleSearchChange={handleSearchChange}
      />
      {/* Условное отображение результатов */}
      {filteredMovies.length > 0 ? (
        <MoviesCardList movies={filteredMovies} isLoading={isLoading} />
      ) : (
        <p className="movies__no-films">Ничего не найдено</p>
      )}
    </main>
  );
}

// сделать пиксел перфект
