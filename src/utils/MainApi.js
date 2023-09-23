import { movieServer } from "./constants";

const BASE_URL = "https://api.moviesexplorer.nomoredomainsicu.ru";
// const BASE_URL = "https://localhost:3001";
const jsonHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((data) => {
    return Promise.reject(`Ошибка: ${data.message}`);
  });
};

// Регистрация пользователя
export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: jsonHeaders,
    credentials: "include",
    body: JSON.stringify({ name, email, password }),
  }).then(checkResponse);
};

// Авторизация пользователя
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: jsonHeaders,
    credentials: "include",
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
    .then((data) => {
      localStorage.setItem("token", data.token);
      return data;
    });
};

export function checkToken() {
  // Получение токена из локального хранилища
  const token = localStorage.getItem("token");

  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      ...jsonHeaders,
      Authorization: `Bearer ${token}`, // Добавление токена в заголовок запроса для авторизации
    },
    credentials: "include",
  })
    .then(checkResponse)
    .then((data) => {
      return data;
    });
}

export function getUserData() {
  const token = localStorage.getItem("token");
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: { jsonHeaders, Authorization: `Bearer ${token}` },
    credentials: "include",
  }).then(checkResponse);
}

export function changeUserData({ name, email }) {
  console.log("Имя пользователя:", name);
  console.log("Email пользователя:", email);
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: jsonHeaders,
    credentials: "include",
    body: JSON.stringify({ name, email }),
  }).then(checkResponse);
}

export function getMovies() {
  return fetch(`${BASE_URL}/movies`, {
    method: "GET",
    headers: jsonHeaders,
    credentials: "include",
  }).then(checkResponse);
}

export const saveMovie = ({ movie }) => {
  return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: jsonHeaders,
    credentials: "include",
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: { url: `${movieServer}${movie.image.url}` },

      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: `${movieServer}${movie.image.url}`,
      movieId: movie.id,
    }),
  })
    .then(checkResponse)
    .then((savedMovie) => (movie._id = savedMovie._id));
};

export const removeMovie = (movieId) => {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: "DELETE",
    headers: {
      ...jsonHeaders,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    credentials: "include",
  }).then((res) => {
    if (res.ok) {
      return {};
    }
    return res.json().then((data) => {
      return Promise.reject(`Ошибка: ${data.message}`);
    });
  });
};
