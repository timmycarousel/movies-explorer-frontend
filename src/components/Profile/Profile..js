import React from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const handleEditProfileClick = () => {
    navigate("/profile/edit");
  };

  const handleSignOutClick = () => {
    navigate("/");
  };

  return (
    <div className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
      <div className="profile__info">
        <div className="profile__info-row">
          <span className="profile__info-label">Имя:</span>
          <span className="profile__info-value">Виталий</span>
        </div>
        <div className="profile__info-row">
          <span className="profile__info-label">E-mail:</span>
          <span className="profile__info-value">pochta@yandex.ru</span>
        </div>
      </div>
      <div className="profile__actions">
        <button
          className="profile__action-button"
          onClick={handleEditProfileClick}
        >
          Редактировать
        </button>
        <button className="profile__action-button" onClick={handleSignOutClick}>
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}
