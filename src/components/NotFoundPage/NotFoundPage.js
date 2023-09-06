import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <section className="not-found">
      <h1>404</h1>
      <p>Страница не найдена</p>
      <button className="not-found__button" onClick={goBack} type="button">
        Назад
      </button>
    </section>
  );
};

export default NotFoundPage;
