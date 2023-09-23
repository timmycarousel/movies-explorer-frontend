import React, { useContext, useState, useEffect } from "react";
import validator from "validator";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Profile({ onLogOut, save, errorMessage }) {
  const userInfo = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const isDataChanged = name !== userInfo.name || email !== userInfo.email;
  const [isFormValid, setIsFormValid] = useState(true);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isProfileSaved, setIsProfileSaved] = useState(false);
  const [profileSavedMessage, setProfileSavedMessage] = useState("");

  useEffect(() => {
    setName(userInfo.name || "");
    setEmail(userInfo.email || "");
  }, [userInfo]);

  useEffect(() => {
    if (isProfileSaved) {
      const timer = setTimeout(() => {
        setIsProfileSaved(false);
        setProfileSavedMessage("");
      }, 5000); // Скрываем сообщение через 5 секунд (по вашему усмотрению)
      return () => clearTimeout(timer);
    }
  }, [isProfileSaved]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Обновляем соответствующее состояние на основе имени поля
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    }
    // Проверяем и устанавливаем состояние валидности формы
    const isNameValid =
      name === "name" ? validateName(value) : validateName(name);
    const isEmailValid =
      name === "email" ? validateEmail(value) : validateEmail(email);
    setIsFormValid(isNameValid && isEmailValid);
  };

  const handleEditProfileClick = (e) => {
    e.preventDefault();
    if (!validateName(name) || !validateEmail(email)) {
      setIsFormValid(false);
      return;
    }

    setIsFormValid(true);

    save({ name, email });
    setIsProfileSaved(true);
    setProfileSavedMessage("Профиль успешно сохранен");
  };

  const validateName = (name) => {
    const isValid =
      /^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(name) &&
      name.length >= 3 &&
      name.length <= 20;
    setNameError(isValid ? "" : "Только буквы и пробелы от 3 до 20 знаков");
    return isValid;
  };

  const validateEmail = (email) => {
    const isValid = validator.isEmail(email);
    setEmailError(isValid ? "" : "Пожалуйста, введите корректный Email");
    return isValid;
  };

  return (
    <section className="profile">
      <h1 className="profile__title">Привет, {userInfo.name}!</h1>
      <form
        className="profile__info"
        onSubmit={handleEditProfileClick}
        noValidate
      >
        <div className="profile__info-row">
          <span className="profile__info-label">Имя</span>
          <input
            required
            type="text"
            name="name"
            placeholder="Введите ваше имя"
            className="profile__info-value"
            defaultValue={name}
            minLength="4"
            maxLength="20"
            onChange={handleInputChange}
          />
        </div>
        {nameError && <div className="profile__error">{nameError}</div>}

        <div className="profile__info-row profile__info-row-email">
          <span className="profile__info-label">E-mail</span>
          <input
            required
            type="email"
            name="email"
            placeholder="Введите e-mail"
            className="profile__info-value"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            defaultValue={email}
            onChange={handleInputChange}
          />
        </div>
        {emailError && <div className="profile__error">{emailError}</div>}

        {errorMessage && <div className="profile__error">{errorMessage}</div>}
        {isProfileSaved && (
          <div className="profile__success-message">{profileSavedMessage}</div>
        )}

        <button
          className={`profile__info-button ${
            !isFormValid || !isDataChanged
              ? "profile__info-button_disabled"
              : ""
          }`}
          type="submit"
          disabled={!isFormValid || !isDataChanged}
        >
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
