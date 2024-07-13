import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer-footer">
      <Link to="/" className="footer-logo-container">
        <img src="/img/logo.png" alt="Logo" className="footer-logo" />
      </Link>
      <div className="footer-autor">
        <strong>Desarrollado por Alvaro Crespi Liut</strong>
      </div>
    </footer>
  );
};

export default Footer;
