import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import * as moviesApi from "../../utils/MoviesApi";

export default function Movies() {
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isToggled, setIsToggled] = useState(false);

  const localStorageIsToggled = localStorage.getItem("isToggled");
  const localStorageMovies = JSON.parse(localStorage.getItem("filteredMovies"));
  useEffect(() => {
    if (localStorageIsToggled) {
      setIsToggled(true);
    } else {
      setIsToggled(false);
    }
  }, [localStorageIsToggled]);

  useEffect(() => {
    setIsLoading(true);
    // Загрузка фильмов из локального хранилища при монтировании компонента
    const localMovies = loadMoviesFromLocalStorage();
    setFilteredMovies(localMovies);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Вынесем запрос к API в отдельную функцию
    const fetchMovies = () => {
      setIsLoading(true);
      moviesApi
        .getMovies() // Передаем параметры поиска
        .then((data) => {
          setMoviesList(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Ошибка при загрузке фильмов:", error);
          setIsLoading(false);
        });
    };

    // Вызываем fetchMovies при изменении searchQuery и isShortFilm
    fetchMovies();
  }, []);

  useEffect(() => {
    handleLocalStorageData();
  }, []);

  // Функция для загрузки фильмов из локального хранилища
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

    setSearchQuery(localStorageQuery || ""); // Устанавливаем значение в searchQuery
    setFilteredMovies(localStorageMovies);
  }

  function handleMovieSearch() {
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
    localStorage.setItem("query", searchQuery); // Сохраняем searchQuery в локальное хранилище
  }

  function filterShortFilms() {
    return filteredMovies.filter((movie) => movie.duration < 35);
    // handleMovieSearch();
  }

  const handleSearchChange = (evt) => {
    const value = evt.target.value;
    setSearchQuery(value);
  };

  function handleToggleSwitch() {
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
      <SearchForm
        onSearchSubmit={handleMovieSearch}
        searchQuery={searchQuery}
        isToggled={isToggled}
        onToggle={handleToggleSwitch}
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

//СДЕЛАТЬ пиксель перфект
