import React from "react";

export default function NavTab() {
  return (
    <nav className="nav-tab">
      <ul className="nav-tab__container">
        <li className="nav-tab__list-item">
          <a className="nav-tab__link" href="#AboutProject">
            О проекте
          </a>
        </li>
        <li className="nav-tab__list-item">
          <a className="nav-tab__link" href="#Techs">
            Технологии
          </a>
        </li>
        <li className="nav-tab__list-item">
          <a className="nav-tab__link" href="#AboutMe">
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
}
