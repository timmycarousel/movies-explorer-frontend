import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  // Состояния
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Виталий",
    email: "pochta@yandex.ru",
  });

  // Обработчик для кнопки "Редактировать"
  const handleEditProfileClick = () => {
    setIsEditing(true);
  };

  // Обработчик для кнопки "Сохранить"
  const handleSaveProfileClick = () => {
    // Выполните сохранение данных профиля здесь (например, отправка на сервер)
    // После сохранения выключите режим редактирования
    setIsEditing(false);
  };

  // Обработчик для кнопки "Отмена"
  const handleCancelEditClick = () => {
    setIsEditing(false);
    // Восстановите исходные данные профиля, если они не были сохранены
  };

  // Обработчик для изменения инпутов
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  return (
    <section className="profile">
      <h1 className="profile__title">Привет, {profileData.name}!</h1>
      {isEditing ? (
        <form className="profile__edit-form">
          <div className="profile__edit-row">
            <label className="profile__info-label">Имя</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
              className="profile__info-value"
            />
          </div>
          <div className="profile__edit-row">
            <label className="profile__info-label">E-mail</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
              className="profile__info-value"
            />
          </div>
          <div className="profile__edit-actions">
            <button
              className="profile__action-button"
              onClick={handleSaveProfileClick}
              type="button"
            >
              Сохранить
            </button>
            <button
              className="profile__action-button"
              onClick={handleCancelEditClick}
              type="button"
            >
              Отмена
            </button>
          </div>
        </form>
      ) : (
        <div className="profile__info">
          <div className="profile__info-row">
            <span className="profile__info-label">Имя</span>
            <span className="profile__info-value">{profileData.name}</span>
          </div>
          <div className="profile__info-row">
            <span className="profile__info-label">E-mail</span>
            <span className="profile__info-value">{profileData.email}</span>
          </div>
        </div>
      )}
      <div className="profile__actions">
        {!isEditing && (
          <button
            className="profile__action-button"
            onClick={handleEditProfileClick}
            type="button"
          >
            Редактировать
          </button>
        )}
        <button
          className="profile__action-button"
          onClick={() => navigate("/")}
          type="button"
        >
          Выйти из аккаунта
        </button>
      </div>
    </section>
  );
}
