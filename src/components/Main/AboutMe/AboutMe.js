import React from "react";
import photo from "../../../images/photo.jpg";

function AboutMe() {
  return (
    <section className="about-me" id="AboutMe">
      <div className="about-me__container">
        <div className="about-me__title title">
          <h2 className="about-me__title_text title_text">Студент</h2>
        </div>
        <div className="about-me__block">
          <div className="about-me__block_info">
            <h3 className="about-me__block_name">Тимофей Воронов</h3>
            <h4 className="about-me__block_title">
              Фронтенд-разработчик, 35 лет
            </h4>
            <p className="about-me__block_subtitle">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У
              меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
              бегом. Недавно начал кодить.  С 2015 года работал в компании «СКБ
              Контур». После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <a
              className="about-me__link"
              href="https://github.com/timmycarousel"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </div>
          <div className="about-me__photo">
            <img src={photo} className="about-me__img" alt="фотография" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
