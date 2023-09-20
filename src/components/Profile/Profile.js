import React, { useContext, useState, useEffect } from "react";
import validator from "validator";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Profile({ onLogOut, save }) {
  const userInfo = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);

  useEffect(() => {
    setName(userInfo.name || "");
    setEmail(userInfo.email || "");
  }, [userInfo]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEditProfileClick = (e) => {
    e.preventDefault();
    if (!validateName(name) || !validateEmail(email)) {
      setIsFormValid(false);
      return;
    }

    setIsFormValid(true);

    save({ name, email });
  };

  const validateName = (name) => {
    return /^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(name);
  };

  const validateEmail = (email) => {
    return validator.isEmail(email);
  };

  return (
    <section className="profile">
      <h1 className="profile__title">Привет, {name}!</h1>
      <form className="profile__info" onSubmit={handleEditProfileClick}>
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
            onChange={handleNameChange}
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
            onChange={handleEmailChange}
          />
        </div>
        {!isFormValid && (
          <p className="profile__error-message">Некорректные данные</p>
        )}
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
