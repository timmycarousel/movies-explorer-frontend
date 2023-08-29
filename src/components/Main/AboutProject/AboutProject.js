// AboutProject.js
import React from "react";

function AboutProject() {
  return (
    <section className="about-project" id="AboutProject">
      <div className="about-project__container">
        <div className="about-project__title title">
          <h2 className="about-project__title_text title_text">О проекте</h2>
        </div>
        <div className="about-project__subtitle">
          <div className="about-project__subtitle_left">
            <h3 className="about-project__subtitle_title">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="about-project__subtitle_text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="about-project__subtitle_right">
            <h3 className="about-project__subtitle_title">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="about-project__subtitle_text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="about-project__deadline">
          <div className="about-project__deadline-left">
            <div className="about-project__deadline-left-text">
              <p className="about-project__deadline-text">1 неделя</p>
            </div>
          </div>
          <div className="about-project__deadline-right">
            <div className="about-project__deadline-right-text">
              <p className="about-project__deadline-text">4 недели</p>
            </div>
          </div>
        </div>

        <div className="about-project__deadline-components">
          <div className="about-project__deadline-left-backend">
            <p className="about-project__deadline-text">Back-end</p>
          </div>
          <div className="about-project__deadline-right-frontend">
            <p className="about-project__deadline-text">Front-end</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
