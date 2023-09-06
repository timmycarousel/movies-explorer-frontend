import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [name, setName] = useState("Виталий");
  const [email, setEmail] = useState("pochta@yandex.ru");

  const handleEditProfileClick = () => {
    const newName = document.querySelector(
      ".profile__info-value[name='name']"
    ).value;
    setName(newName);

    const newEmail = document.querySelector(
      ".profile__info-value[name='email']"
    ).value;
    setEmail(newEmail);
  };

  const handleSignOutClick = () => {
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвратить отправку формы
    handleEditProfileClick(); // Вызвать функцию для обновления имени
  };

  return (
    <section className="profile">
      <h1 className="profile__title">Привет, {name}!</h1>
      <form className="profile__info" onSubmit={handleSubmit}>
        <div className="profile__info-row">
          <span className="profile__info-label">Имя</span>
          <input
            required
            type="text"
            name="name"
            className="profile__info-value"
            defaultValue={name}
            minLength="4"
            maxLength="20"
          />
        </div>
        <div className="profile__info-row profile__info-row-email">
          <span className="profile__info-label">E-mail</span>
          <input
            required
            type="email"
            name="email"
            className="profile__info-value"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            defaultValue={email}
          />
        </div>
        <button className="profile__info-button" type="submit">
          Редактировать
        </button>
      </form>
      <div className="profile__actions">
        <button
          className="profile__action-button"
          onClick={handleSignOutClick}
          type="button"
        >
          Выйти из аккаунта
        </button>
      </div>
    </section>
  );
}
