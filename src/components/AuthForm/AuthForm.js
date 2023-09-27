import React, { useState, useCallback, useEffect } from "react";
import logo from "../../images/logo.svg";
import { matches, isEmail } from "validator";
import { NavLink } from "react-router-dom";

const AuthForm = ({
  isSignUp,
  handleSubmit,
  handleInputChange,
  values,
  buttonText,
  errorMessage,
}) => {
  const [validationMessages, setValidationMessages] = useState({
    email: "",
    password: "",
  });

  const [isValidForm, setIsValidForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChangeWithValidation = useCallback(
    (e) => {
      const { name, value } = e.target;
      handleInputChange(e);

      let isValid = e.target.checkValidity();

      if (name === "email") {
        isValid = isEmail(value);
        updateValidationMessage(
          name,
          isValid ? "" : "Введите корректный адрес электронной почты"
        );
      } else if (name === "name") {
        isValid = matches(value, /^[a-zA-Zа-яА-Я\s]+$/); // Регулярное выражение для имени (только буквы и пробелы)
        updateValidationMessage(
          name,
          isValid ? "" : "Введите корректное имя (только буквы и пробелы)"
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
    const isFormValid =
      document.querySelector(".auth-page__form").checkValidity() &&
      Object.values(validationMessages).every((message) => !message);
    setIsValidForm(isFormValid);
  }, [validationMessages]);

  const h1Text = isSignUp ? "Добро пожаловать!" : "Рады видеть!";

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    handleSubmit(e);
  };

  return (
    <section className="auth-page">
      <form onSubmit={handleFormSubmit} className="auth-page__form" noValidate>
        <NavLink to="/" className="auth-page__logo">
          <img src={logo} alt="логотип" />
        </NavLink>
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
        {formSubmitted && errorMessage && (
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
            Уже зарегистрированы? <NavLink to="/signin">Войти</NavLink>
          </p>
        ) : (
          <p>
            Еще не зарегистрированы? <NavLink to="/signup">Регистрация</NavLink>
          </p>
        )}
      </form>
    </section>
  );
};

export default AuthForm;
