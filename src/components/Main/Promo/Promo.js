// Promo.js
import React from "react";

import logo from "../../../images/landing-logo.svg";

function Promo() {
  return (
    <div className="promo">
      <div className="promo__container">
        <img src={logo} className="promo__logo" alt="яндекс практикум" />
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
      </div>
    </div>
  );
}

export default Promo;
