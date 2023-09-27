import React from "react";

const tabLinks = [
  { id: "about", text: "О проекте", href: "#AboutProject" },
  { id: "techs", text: "Технологии", href: "#Techs" },
  { id: "student", text: "Студент", href: "#AboutMe" },
];

export default function NavTab() {
  return (
    <nav className="nav-tab">
      <ul className="nav-tab__container">
        {tabLinks.map((link) => (
          <li key={link.id} className="nav-tab__list-item">
            <a className="nav-tab__link" href={link.href}>
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
