// Techs.js
import React from "react";

function Techs() {
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
            <li className="tech__list-item">HTML</li>
            <li className="tech__list-item">CSS</li>
            <li className="tech__list-item">JS</li>
            <li className="tech__list-item">React</li>
            <li className="tech__list-item">Git</li>
            <li className="tech__list-item">Express.js</li>
            <li className="tech__list-item">mongoDB</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Techs;
