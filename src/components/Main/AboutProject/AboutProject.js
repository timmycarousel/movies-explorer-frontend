// AboutProject.js
import React from "react";

function AboutProject() {
  return (
    <section className="about about-project">
      <div className="about__container">
        <div className="about__title">
          <h2 className="about__title_text">О проекте</h2>
        </div>
        <div className="about__subtitle">
          <div className="about__subtitle_left">
            <h3 className="about__subtitle_title">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="about__subtitle_text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="about__subtitle_right">
            <h3 className="about__subtitle_title">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="about__subtitle_text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="about__deadline">
          <div className="about__deadline-left">
            <div className="about__deadline-left-text">
              <p className="about__deadline-text">1 неделя</p>
            </div>
          </div>
          <div className="about__deadline-right">
            <div className="about__deadline-right-text">
              <p className="about__deadline-text">4 недели</p>
            </div>
            {/* <div className="about__deadline-left-backend">
              <p className="about__deadline-text">Back-end</p>
            </div>
            <div className="about__deadline-right-frontend">
              <p className="about__deadline-text">Front-end</p>
            </div> */}
          </div>
        </div>

        <div className="about__deadline-components">
          {/* <div className="about__deadline-left-text">
              <p className="about__deadline-text">1 неделя</p>
            </div>
          </div>
          <div className="about__deadline-right">
            <div className="about__deadline-right-text">
              <p className="about__deadline-text">4 недели</p>
            </div> */}
            <></>
          <div className="about__deadline-left-backend">
            <p className="about__deadline-text">Back-end</p>
          </div>
          <div className="about__deadline-right-frontend">
            <p className="about__deadline-text">Front-end</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
