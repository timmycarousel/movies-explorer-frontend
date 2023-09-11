import React, { useState, useEffect } from "react";
import Preloader from "../../Preloader/Preloader";
import { renderMovies } from "../../../utils/movieUtils";

export default function MoviesCardList({ isLoading, movies }) {
  // Состояние для отслеживания количества видимых карточек
  const [visibleMovies, setVisibleMovies] = useState(
    // Инициализация количества видимых карточек в зависимости от ширины экрана
    window.innerWidth <= 400 ? 5 : window.innerWidth <= 895 ? 8 : 12
  );

  useEffect(() => {
    let resizeTimer;

    // Функция для обработки изменения размера окна
    const handleResize = () => {
      clearTimeout(resizeTimer);
      // Устанавливаем таймер, чтобы отложить обработку изменения размера окна
      resizeTimer = setTimeout(() => {
        // Определение количества видимых карточек в зависимости от ширины экрана
        if (window.innerWidth <= 400) {
          setVisibleMovies(5);
        } else if (window.innerWidth <= 895) {
          setVisibleMovies(8);
        } else {
          setVisibleMovies(12);
        }
      }, 1000); // Задержка перед обработкой изменения размера окна
    };

    handleResize(); // Вызываем функцию при монтировании компонента
    window.addEventListener("resize", handleResize); // Добавляем слушателя события изменения размера окна

    return () => {
      // Очищаем слушателя события при размонтировании компонента
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Функция для обработки нажатия на кнопку "Еще"
  const handleShowMore = () => {
    let cardsToAdd = 0;

    // Определение количества карточек для добавления в зависимости от ширины экрана
    if (window.innerWidth >= 1280) {
      cardsToAdd = 3 - (visibleMovies % 3);
    } else if (window.innerWidth >= 895) {
      cardsToAdd = 2 - (visibleMovies % 2);
    } else if (window.innerWidth >= 320) {
      cardsToAdd = 2 - (visibleMovies % 2);
    }

    // Обновление состояния для отображения дополнительных карточек
    setVisibleMovies(visibleMovies + cardsToAdd);
  };

  return (
    <section className="movies-card-list">
      {/* Отображение прелоадера или списка карточек в зависимости от isLoading */}
      {isLoading ? <Preloader /> : renderMovies(movies.slice(0, visibleMovies))}
      {/* Отображение кнопки "Еще", если есть дополнительные карточки */}
      {visibleMovies < movies.length && (
        <button
          className="movies-card-list__button"
          onClick={handleShowMore}
          type="button"
        >
          Еще
        </button>
      )}
    </section>
  );
}
