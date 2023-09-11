import { movieServer } from "./constants";

const BASE_URL = "http://api.moviesexplorer.nomoredomainsicu.ru";
const jsonHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export function getMovies() {
  return fetch(`${BASE_URL}/movies`, {
    method: "GET",
    headers: jsonHeaders,
  }).then(checkResponse);
}

export const saveMovie = (movie) => {
  return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: jsonHeaders,
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
    headers: jsonHeaders,
  }).then(checkResponse);
};
