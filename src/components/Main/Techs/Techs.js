import React from "react";

const techsList = [
  "HTML",
  "CSS",
  "JS",
  "React",
  "Git",
  "Express.js",
  "mongoDB",
];

export default function Techs() {
  return (
    <section className="tech" id="Techs">
      <div className="tech__container">
        <div className="tech__title title">
          <h2 className="tech__name title-text">Технологии</h2>
        </div>
        <div className="tech__block">
          <h3 className="tech__block-title">7 технологий</h3>
          <p className="tech__block-subtitle">
            На курсе веб-разработки мы освоили технологии, которые применили в
            дипломном проекте.
          </p>
        </div>
        <div className="tech__list">
          <ul className="tech__list-block">
            {techsList.map((tech, index) => (
              <li key={index} className="tech__list-item">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
