import React, { useEffect } from "react";
import logo from "../../images/logo.svg";
import accountIcon from "../../images/account-icon.svg";
import accountIconIn from "../../images/account-icon-in.svg";
import { useLocation } from "react-router-dom";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

function Header({ loggedIn }) {
  const url = useLocation();
  const isHomepage = url.pathname === "/";
  const headerClass =
    url.pathname === "/movies" ||
    url.pathname === "/saved-movies" ||
    url.pathname === "/profile";

  const accountIconSrc = loggedIn && isHomepage ? accountIconIn : accountIcon;

  return (
    <header className={`header ${headerClass ? "header_login" : ""}`}>
      <div className="header__container">
        <div className="header__left">
          <a className="header__link" href="/">
            <img src={logo} alt="Логотип" className="header__logo" />
          </a>
          {loggedIn && headerClass && (
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
          {loggedIn ? (
            <>
              <a className="header__account" href="/profile">
                <img
                  src={accountIconSrc}
                  alt="Аккаунт"
                  className="header__account-icon"
                />
              </a>
              <BurgerMenu />{" "}
            </>
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
