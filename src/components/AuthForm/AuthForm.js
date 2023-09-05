import React, { useState } from "react";
import logo from "../../images/logo.svg";

const AuthForm = ({
  isSignUp,
  handleSubmit,
  handleInputChange,
  values,
  buttonText,
}) => {
  const [validationMessages, setValidationMessages] = useState({
    email: "Обязательное поле",
    name: "Обязательное поле",
    password: "Обязательное поле",
  });

  const handleInputChangeWithValidation = (e) => {
    const { name, value } = e.target;
    handleInputChange(e);

    const isValid = e.target.checkValidity();
    updateValidationMessage(name, isValid ? "" : e.target.validationMessage);
  };

  const customValidation = (e, message) => {
    e.target.setCustomValidity(message);
  };

  const updateValidationMessage = (name, message) => {
    setValidationMessages((messages) => ({
      ...messages,
      [name]: message,
    }));
  };

  const h1Text = isSignUp ? "Добро пожаловать!" : "Рады видеть!";

  return (
    <section className="auth-page">
      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        <a href="/" className="auth-form__logo">
          <img src={logo} alt="Logo" />
        </a>
        <h1>{h1Text}</h1>
        <div className="form-groupers">
          {isSignUp && (
            <div className="form-group">
              <label className="form-label">Имя</label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleInputChangeWithValidation}
                placeholder="Введите ваше имя"
                required
                className="form-input"
                minLength="4"
                maxLength="20"
              />
              <span className="validation-message">
                {validationMessages.name}
              </span>
            </div>
          )}
          <div className="form-group">
            <label className="form-label">E-mail</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleInputChangeWithValidation}
              placeholder="Введите e-mail"
              required
              className="form-input"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              onInvalid={(e) =>
                customValidation(
                  e,
                  "Введите корректный адрес электронной почты"
                )
              }
              onInput={(e) => e.target.setCustomValidity("")}
            />
            <span className="validation-message">
              {validationMessages.email}
            </span>
          </div>
          <div className="form-group">
            <label className="form-label">Пароль</label>
            <input
              type="password"
              name="password"
              placeholder="Введите пароль"
              value={values.password}
              onChange={handleInputChangeWithValidation}
              required
              className="form-input"
              minLength="6"
              maxLength="20"
              onInvalid={(e) => customValidation(e, "Что-то пошло не так...")}
              onInput={(e) => e.target.setCustomValidity("")}
            />
            <span className="validation-message">
              {validationMessages.password}
            </span>
          </div>
        </div>
        <button type="submit" className="form-button">
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
