import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Link } from "react-router-dom";
import "./Banner.css";
import { Video } from "../types/Video";

function Banner() {
  const { destacados } = useContext(GlobalContext);
  const [index] = useState<number>(0);

  if (destacados.length === 0) return null;

  const currentVideo: Video = destacados[index];

  return (
    <section className="banner-banner">
      <div className="banner-overlay">
        <div className="banner-group-text">
          <button>FRONT END</button>
          <h2>Challenge React</h2>
          <p>
            Este challenge es una forma de aprendizaje. Es un mecanismo donde
            podrás comprometerte en la resolución de un problema para poder
            aplicar todos los conocimientos adquiridos en la formación React.
          </p>
        </div>
        <div className="banner-container">
          <Link to={`/${currentVideo.id}`}>
            <img src={currentVideo.foto} alt={currentVideo.titulo} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Banner;
