import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import * as moviesApi from "../../utils/MoviesApi.js";

export default function Movies({ getUserMovies }) {
  // Состояния компонента
  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки
  const [moviesList, setMoviesList] = useState([]); // Список всех фильмов
  const [filteredMovies, setFilteredMovies] = useState([]); // Отфильтрованный список фильмов
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem("searchQuery") || "" // Строка поиска, восстанавливаем из localStorage
  );
  const [isToggled, setIsToggled] = useState(
    localStorage.getItem("isToggled") === "true" // Состояние чекбокса "Короткометражки", восстанавливаем из localStorage
  );
  const [hasSearched, setHasSearched] = useState(false); // Флаг, указывающий, был ли уже произведен поиск

  useEffect(() => {
    getUserMovies(); // Вызываем функцию getUserMovies при загрузке компонента
  }, []);

  useEffect(() => {
    // Восстанавливаем список фильмов из localStorage при загрузке компонента
    const localMovies = JSON.parse(localStorage.getItem("moviesList")) || [];
    setMoviesList(localMovies);
  }, []);

  useEffect(() => {
    // Фильтруем фильмы с учетом поисковой строки и состояния чекбокса
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

    // Сохраняем отфильтрованный список фильмов в localStorage
    localStorage.setItem("filteredMovies", JSON.stringify(filtered));
  }, [searchQuery, isToggled, moviesList]);

  const handleSearch = () => {
    // Выполняем запрос на сервер только при первом поиске
    if (!hasSearched && moviesList.length === 0) {
      setIsLoading(true); // Устанавливаем isLoading в true перед запросом

      // Запрос на сервер для получения фильмов
      moviesApi
        .getMovies()
        .then((data) => {
          setMoviesList(data); // Устанавливаем полученный список фильмов
          setIsLoading(false); // Устанавливаем isLoading в false после завершения запроса
          console.log("получаем фильмы с сервера большого", data);

          // Сохраняем полученный список фильмов в localStorage
          localStorage.setItem("moviesList", JSON.stringify(data));
        })
        .catch((error) => {
          console.error("Ошибка при загрузке фильмов:", error);
          setIsLoading(false); // Устанавливаем isLoading в false после завершения запроса с ошибкой
        });
    }

    setHasSearched(true); // Устанавливаем флаг hasSearched в true
    localStorage.setItem("searchQuery", searchQuery); // Сохраняем поисковую строку в localStorage
    localStorage.setItem("isToggled", isToggled ? "true" : "false"); // Сохраняем состояние чекбокса в localStorage
  };

  const handleSearchChange = (evt) => {
    const value = evt.target.value;
    setSearchQuery(value); // Обновляем состояние searchQuery при изменении строки поиска
  };

  const handleToggle = () => {
    setIsToggled(!isToggled); // Изменяем состояние чекбокса "Короткометражки"
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
        <MoviesCardList movies={filteredMovies} isLoading={isLoading} />
      )}
    </main>
  );
}
