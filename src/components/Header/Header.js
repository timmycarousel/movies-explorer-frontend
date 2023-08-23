import React from "react";
import logo from "../../images/logo.svg";

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <a className="header__link" href="/">
          <img src={logo} alt="Logo" className="header__logo" />
        </a>
        <nav className="header__nav">
          <a className="header__btn header__btn_register" href="/signup">
            Регистрация
          </a>
          <a className="header__btn header__btn_login" href="/signin">
            Войти
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
