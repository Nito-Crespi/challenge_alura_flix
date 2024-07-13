import React from "react";
import VideoCard from "./VideoCard/VideoCard";
import TitleCategory from "../TitleCategory/TitleCategory";
import "./Carousel.css";
import { Video } from "../types/Video";

interface CarouselProps {
  datos: {
    nombre: string;
    colorPrimario: string;
  };
  videos: Video[];
}

const Carousel: React.FC<CarouselProps> = ({ datos, videos }) => {
  const titleStyled = { backgroundColor: datos.colorPrimario };

  return (
    <>
      {videos.length > 0 && (
        <section className="carousel-carousel">
          <TitleCategory style={titleStyled}>{datos.nombre}</TitleCategory>
          <div className="carousel-videos">
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                datos={video}
                colorPrimario={datos.colorPrimario}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Carousel;
