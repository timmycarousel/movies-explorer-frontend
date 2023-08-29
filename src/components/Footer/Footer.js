import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__container">
        <p className="footer__copyright">&#64; {new Date().getFullYear()}</p>
        <nav className="footer__nav">
          <a
            className="footer__link"
            href="https://practicum.yandex.ru/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Яндекс.Практикум
          </a>
          <a
            className="footer__link"
            href="https://github.com/timmycarousel"
            target="_blank"
            rel="noreferrer noopener"
          >
            Github
          </a>
        </nav>
      </div>
    </footer>
  );
}
