// Portfolio.js
import React from "react";

import site from "../../../images/site.svg";

import portfolioData from "../PortfolioData/PortfolioData";

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h1 className="portfolio__title">Портфолио</h1>
        <div className="portfolio__sites">
          {portfolioData.map((item, index) => (
            <div className="portfolio__site" key={index}>
              <a
                href={item.link}
                className="portfolio__site-link"
                target="_blank"
              >
                <span className="portfolio__site-text">{item.title}</span>
              </a>
              <a href={site} className="portfolio__site-link" target="_blank">
                <img src={site} alt={item.alt} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
