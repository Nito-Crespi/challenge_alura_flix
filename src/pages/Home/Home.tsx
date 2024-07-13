import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import Carousel from "../../components/Carousel/Carousel";
import Banner from "../../components/Banner/Banner";
import { Video } from "../../components/types/Video";

function Home() {
  const { videos, categorias } = useContext(GlobalContext);

  return (
    <>
      <Banner />
      {categorias.map((categoria) => (
        <Carousel
          key={categoria.nombre}
          datos={categoria}
          videos={videos.filter(
            (video: Video) => video.categoria === categoria.nombre
          )}
        />
      ))}
    </>
  );
}

export default Home;
