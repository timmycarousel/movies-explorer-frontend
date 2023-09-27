import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import accountIcon from "../../images/account-icon.svg";
import accountIconIn from "../../images/account-icon-in.svg";
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
          <Link to="/" className="header__link">
            <img src={logo} alt="Логотип" className="header__logo" />
          </Link>
          {loggedIn && (
            <>
              <Link to="/movies" className="header__btn header__btn_movies">
                Фильмы
              </Link>
              <Link
                to="/saved-movies"
                className="header__btn header__btn_saved-movies"
              >
                Сохраненные фильмы
              </Link>
            </>
          )}
        </div>
        <nav className="header__nav">
          {loggedIn ? (
            <>
              <Link to="/profile" className="header__account">
                <img
                  src={accountIconSrc}
                  alt="Аккаунт"
                  className="header__account-icon"
                />
              </Link>
              <BurgerMenu />{" "}
            </>
          ) : (
            <>
              <Link to="/signup" className="header__btn header__btn_register">
                Регистрация
              </Link>
              <Link to="/signin" className="header__btn header__btn_login">
                Войти
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
