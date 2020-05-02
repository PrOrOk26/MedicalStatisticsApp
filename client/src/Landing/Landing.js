import React from "react";
import { Link, useLocation } from "react-router-dom";
import BackgroundImage from "./assets/backgroundImageMedicine.jpeg";
import AppIcon from "./assets/bars.svg";

export function Landing() {
  return (
    <>
      <div className="banner">
        <a href="/">
          <img className="banner__icon" src={AppIcon} />
        </a>
      </div>
      <header>
        <div className="main-img"></div>
        <div className="main-text">
          <h1>Medical Statistics Application</h1>
          <h2>Get data regarding AIDS/HIV, mortality and more</h2>
        </div>
      </header>
      <main>
        <section className="main-section">
          <h2>Navigate</h2>
          <div className="navigation">
            <Link className="navigation__link" to="/aids">
              Aids
            </Link>
            <Link className="navigation__link" to="/mortality/adult">
              Adult mortality
            </Link>
            <Link className="navigation__link" to="/mortality/child">
              Child mortality
            </Link>
            <Link className="navigation__link" to="/life_expectancy">
              General life expectancy
            </Link>
            <Link
              className="navigation__link"
              to="/life_expectancy/?type=healthy"
            >
              Healthy life expectancy
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
