import React from "react";
import logo from "../../images/logo.svg";
import accountIcon from "../../images/account-icon.svg";
import { useLocation } from "react-router-dom";

function Header({ isLoggedIn }) {
  isLoggedIn = true;
  const url = useLocation();
  const headerClass =
    url.pathname === "/movies" ||
    url.pathname === "/saved-movies" ||
    url.pathname === "/profile";

  return (
    <header className={`header ${headerClass ? "header_login" : ""}`}>
      <div className="header__container">
        <div className="header__left">
          <a className="header__link" href="/">
            <img src={logo} alt="Logo" className="header__logo" />
          </a>
          {isLoggedIn && headerClass && (
            <>
              <a className="header__btn header__btn_movies" href="/movies">
                Фильмы
              </a>
              <a
                className="header__btn header__btn_saved-movies"
                href="/saved-movies"
              >
                Сохраненные фильмы
              </a>
            </>
          )}
        </div>
        <nav className="header__nav">
          {isLoggedIn ? (
            <a className="header__account" href="/profile">
              <img
                src={accountIcon}
                alt="Аккаунт"
                className="header__account-icon"
              />
            </a>
          ) : (
            <>
              <a className="header__btn header__btn_register" href="/signup">
                Регистрация
              </a>
              <a className="header__btn header__btn_login" href="/signin">
                Войти
              </a>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
