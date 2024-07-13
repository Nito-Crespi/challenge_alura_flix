import React from "react";
import { NavLink } from "react-router-dom";
import Boton from "../Button/Button";
import { FaHome, FaPlus, FaTag } from "react-icons/fa";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <NavLink to="/" className="nav-link">
        <img src="/img/logo.png" alt="Logo" />
      </NavLink>
      <div className="button-group">
        <NavLink to="/" className="nav-link">
          <Boton>
            <span className="btn-text">HOME</span>
            <FaHome className="btn-icon" />
          </Boton>
        </NavLink>
        <NavLink to="/nuevo-video" className="nav-link">
          <Boton>
            <span className="btn-text">NUEVO VIDEO</span>
            <FaPlus className="btn-icon" />
          </Boton>
        </NavLink>
        <NavLink to="/nueva-categoria" className="nav-link">
          <Boton>
            <span className="btn-text">NUEVA CATEGORÍA</span>
            <FaTag className="btn-icon" />
          </Boton>
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
