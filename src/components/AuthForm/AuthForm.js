import React, { useState, useCallback, useEffect } from "react";
import logo from "../../images/logo.svg";
import validator from "validator";

const AuthForm = ({
  isSignUp,
  handleSubmit,
  handleInputChange,
  values,
  buttonText,
  errorMessage,
}) => {
  const [validationMessages, setValidationMessages] = useState({
    name: "Обязательное поле",
    email: "Обязательное поле",
    password: "Обязательное поле",
  });

  console.log(errorMessage);

  const [isValidForm, setIsValidForm] = useState(false); // Состояние для активации кнопки

  // Хук useCallback для оптимизации производительности
  const handleInputChangeWithValidation = useCallback(
    (e) => {
      const { name, value } = e.target;
      handleInputChange(e);

      let isValid = e.target.checkValidity();

      if (name === "email") {
        isValid = validator.isEmail(value);
        updateValidationMessage(
          name,
          isValid ? "" : "Введите корректный адрес электронной почты"
        );
      } else if (name === "name") {
        isValid = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(value);
        updateValidationMessage(
          name,
          isValid
            ? ""
            : "Поле 'Имя' может содержать только латиницу, кириллицу, пробел или дефис"
        );
      } else {
        updateValidationMessage(
          name,
          isValid ? "" : e.target.validationMessage
        );
      }
    },
    [handleInputChange]
  );

  const updateValidationMessage = (name, message) => {
    setValidationMessages((messages) => ({
      ...messages,
      [name]: message,
    }));
  };

  useEffect(() => {
    // Проверяем все поля на валидность и устанавливаем состояние для активации кнопки
    const isFormValid =
      document.querySelector(".auth-page__form").checkValidity() &&
      Object.values(validationMessages).every((message) => !message);
    setIsValidForm(isFormValid);
  }, [validationMessages]);

  const h1Text = isSignUp ? "Добро пожаловать!" : "Рады видеть!";

  return (
    <section className="auth-page">
      <form onSubmit={handleSubmit} className="auth-page__form" noValidate>
        <a href="/" className="auth-page__logo">
          <img src={logo} alt="логотип" />
        </a>
        <h1>{h1Text}</h1>
        <div className="auth-page__groupers">
          {isSignUp && (
            <div className="auth-page__group">
              <label className="auth-page__label">Имя</label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={(e) => {
                  handleInputChange(e);
                  handleInputChangeWithValidation(e);
                }}
                placeholder="Введите ваше имя"
                required
                className="auth-page__input"
                minLength="4"
                maxLength="20"
              />
              <span className="auth-page__validation-message">
                {validationMessages.name}
              </span>
            </div>
          )}
          <div className="auth-page__group">
            <label className="auth-page__label">E-mail</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={(e) => {
                handleInputChange(e);
                handleInputChangeWithValidation(e);
              }}
              placeholder="Введите e-mail"
              required
              className="auth-page__input"
            />
            <span className="auth-page__validation-message">
              {validationMessages.email}
            </span>
          </div>
          <div className="auth-page__group">
            <label className="auth-page__label">Пароль</label>
            <input
              type="password"
              name="password"
              placeholder="Введите пароль"
              value={values.password}
              onChange={(e) => {
                handleInputChange(e);
                handleInputChangeWithValidation(e);
              }}
              required
              className="auth-page__input"
              minLength="6"
              maxLength="20"
            />
            <span className="auth-page__validation-message">
              {validationMessages.password}
            </span>
          </div>
        </div>
        {errorMessage && ( // Отображаем errorMessage, если он существует
          <div className="auth-page__error-message">{errorMessage}</div>
        )}
        <button
          type="submit"
          className={`auth-page__button ${isValidForm ? "" : "disabled"}`}
          disabled={!isValidForm}
        >
          {buttonText}
        </button>
        {isSignUp ? (
          <p>
            Уже зарегистрированы? <a href="/signin">Войти</a>
          </p>
        ) : (
          <p>
            Еще не зарегистрированы? <a href="/signup">Регистрация</a>
          </p>
        )}
      </form>
    </section>
  );
};

export default AuthForm;
