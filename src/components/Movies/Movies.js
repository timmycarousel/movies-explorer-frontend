import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import * as moviesApi from "../../utils/MoviesApi";

export default function Movies() {
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isShortFilm, setIsShortFilm] = useState(false);

  // Функция для загрузки фильмов из локального хранилища
  const loadMoviesFromLocalStorage = () => {
    const localMovies = JSON.parse(localStorage.getItem("filteredMovies"));
    return localMovies || [];
  };

  useEffect(() => {
    // Загрузка фильмов из локального хранилища при монтировании компонента
    const localMovies = loadMoviesFromLocalStorage();
    setFilteredMovies(localMovies); // Установите фильмы из локального хранилища в состояние
    setIsLoading(false); // Устанавливаем isLoading в false, так как фильмы уже загружены
  }, []);

  useEffect(() => {
    // Вынесем запрос к API в отдельную функцию
    const fetchMovies = () => {
      moviesApi
        .getMovies(searchQuery, isShortFilm) // Передаем параметры поиска
        .then((data) => {
          setMoviesList(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Ошибка при загрузке фильмов:", error);
          setIsLoading(false);
        });
    };

    // Вызываем fetchMovies при монтировании компонента и при изменении searchQuery и isShortFilm
    fetchMovies();
  }, [searchQuery, isShortFilm]);

  function handleMovieSearch() {
    const filtered = moviesList.filter((movie) => {
      const isMatching =
        movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchQuery.toLowerCase());

      if (isShortFilm) {
        // Если включена кнопка короткометражных фильмов, фильтруем по длительности
        return isMatching && movie.duration < 35;
      } else {
        return isMatching;
      }
    });

    setFilteredMovies(filtered);
    localStorage.setItem("filteredMovies", JSON.stringify(filtered)); // Сохраните фильмы в локальное хранилище
  }

  function handleShortFilmToggle() {
    setIsShortFilm(!isShortFilm);
  }

  function handleSearchChange(value) {
    // Обновляем searchQuery при изменении значения поля ввода
    setSearchQuery(value);
  }

  return (
    <main className="movies">
      <SearchForm
        onSearchSubmit={handleMovieSearch}
        searchQuery={searchQuery}
        onShortFilmToggle={handleShortFilmToggle}
        isToggled={isShortFilm}
        handleSearchChange={handleSearchChange} // Передаем функцию handleSearchChange
      />
      {filteredMovies.length > 0 ? (
        <MoviesCardList movies={filteredMovies} isLoading={isLoading} />
      ) : (
        <p>No movies found.</p>
      )}
    </main>
  );
}
