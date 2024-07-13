import React from "react";
import "./NotFound.css";

function NotFound(): JSX.Element {
  return (
    <section className="not-found-container">
      <img
        src="/img/notFound.png"
        alt="Not Found"
        className="not-found-image"
      />
      <p className="not-found-text_error">ERROR 404 | No encontrado</p>
    </section>
  );
}

export default NotFound;
