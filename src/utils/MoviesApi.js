// Базовый URL для сервиса beatfilm-movies
const BASE_URL = "https://api.nomoreparties.co/beatfilm-movies";

// Функция для отправки GET-запроса к сервису beatfilm-movies
export function getMovies() {
  return fetch(`${BASE_URL}`, {
    method: "GET",
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    return response.json();
  });
}
