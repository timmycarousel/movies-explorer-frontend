import React, { useState, useEffect } from "react";
import validator from "validator"; // Импортируйте библиотеку для валидации

export default function Profile({ onLogOut }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Получаем значения из localStorage и устанавливаем их в состояние
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");

    if (storedName && storedEmail) {
      setName(storedName);
      setEmail(storedEmail);
    }
  }, []);

  const handleEditProfileClick = () => {
    // Валидация полей "Имя" и "Email"
    const newName = document.querySelector(
      ".profile__info-value[name='name']"
    ).value;
    const newEmail = document.querySelector(
      ".profile__info-value[name='email']"
    ).value;

    if (!validateName(newName) || !validateEmail(newEmail)) {
      // Валидация не прошла, обработка ошибок (например, показ сообщений об ошибке)
      return;
    }

    // Переход к сохранению профиля, так как валидация пройдена
    setName(newName);
    setEmail(newEmail);

    // Сохраняем обновленные значения в localStorage
    localStorage.setItem("userName", newName);
    localStorage.setItem("userEmail", newEmail);
  };

  const validateName = (name) => {
    // Ваша логика валидации для имени
    return /^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(name);
  };

  const validateEmail = (email) => {
    // Используйте библиотеку validator для валидации email
    return validator.isEmail(email);
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
          onClick={onLogOut}
          type="button"
        >
          Выйти из аккаунта
        </button>
      </div>
    </section>
  );
}
