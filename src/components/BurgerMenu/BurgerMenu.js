import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import accountIcon from "../../images/account-icon.svg";
import close from "../../images/close.svg";
import Burger from "../../images/burger.svg";

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="burger-menu">
      <button className="burger-menu__button" onClick={toggleMenu} type="button">
        <img src={Burger} alt="бургер меню" />
      </button>
      <div
        className={`burger-menu__overlay ${isOpen ? "open" : ""}`}
        onClick={closeMenu}
      />

      <nav className={`burger-menu__container ${isOpen ? "open" : ""}`}>
        <img
          onClick={toggleMenu}
          src={close}
          className="burger-menu__btn-close"
          alt="закрыть"
        />
        <ul className="burger-menu__nav">
          <li className="burger-menu__li">
            <NavLink to="/" className="burger-menu__link">
              Главная
            </NavLink>
          </li>
          <li className="burger-menu__li">
            <NavLink to="movies" className="burger-menu__link">
              Фильмы
            </NavLink>
          </li>
          <li className="burger-menu__li">
            <NavLink to="/saved-movies" className="burger-menu__link">
              Сохраненные фильмы
            </NavLink>
          </li>
        </ul>
        <NavLink className="burger-menu__account" to="/profile">
          <img
            src={accountIcon}
            alt="Аккаунт"
            className="burger-menu__account-icon"
          />
        </NavLink>
      </nav>
    </div>
  );
}
