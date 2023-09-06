import React from "react";

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
              <li className="footer__item">
                <a
                  className="footer__link"
                  href="https://practicum.yandex.ru/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Яндекс.Практикум
                </a>
              </li>
              <li className="footer__item">
                <a
                  className="footer__link"
                  href="https://github.com/timmycarousel"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Github
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
