// Techs.js
import React from "react";

function Techs() {
  return (
    <section className="tech">
      <div className="tech__container">
        <div className="tech__title title">
          <h2 className="tech__name title_text">Технологии</h2>
        </div>
        <div className="tech__block">
          <h3 className="tech__block_title">7 технологий</h3>
          <p className="tech__block_subtitle">
            На курсе веб-разработки мы освоили технологии, которые применили в
            дипломном проекте.
          </p>
        </div>
        <div className="tech__list">
          <ul className="tech__list_block">
            <li className="tech__list_item">HTML</li>
            <li className="tech__list_item">CSS</li>
            <li className="tech__list_item">JS</li>
            <li className="tech__list_item">React</li>
            <li className="tech__list_item">Git</li>
            <li className="tech__list_item">Express.js</li>
            <li className="tech__list_item">MongoDB</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Techs;
