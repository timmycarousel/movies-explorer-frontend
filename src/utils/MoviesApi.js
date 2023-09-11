const BASE_URL = "https://api.nomoreparties.co/beatfilm-movies";

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
