import React from "react";

const footerLinks = [
  {
    id: "yandex",
    text: "Яндекс.Практикум",
    url: "https://practicum.yandex.ru/",
  },
  { id: "gitHub", text: "Github", url: "https://github.com/timmycarousel" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__block">
          <p className="footer__copyright">&#169; {new Date().getFullYear()}</p>
          <nav className="footer__nav">
            <ul className="footer__list">
              {footerLinks.map((link) => (
                <li key={link.id} className="footer__item">
                  <a
                    className="footer__link"
                    href={link.url}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
