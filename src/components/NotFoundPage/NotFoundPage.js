import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="not-found">
      <h2>404</h2>
      <p>Страница не найдена</p>
      <button className="not-found__button" onClick={goBack}>
        Назад
      </button>
    </div>
  );
};

export default NotFoundPage;
