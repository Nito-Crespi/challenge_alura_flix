import React, { useEffect, useState } from "react";
import "./Player.css";
import NotFound from "../NotFound/NotFound";
import { useParams } from "react-router-dom";
import { Video } from "../../components/types/Video";

function Player(): JSX.Element {
  const [video, setVideo] = useState<Video | null>(null);

  const parametros = useParams<{ id: string }>();

  useEffect(() => {
    fetch(`http://localhost:5000/videos?id=${parametros.id}`)
      .then((response) => response.json())
      .then((data: Video[]) => {
        if (data.length > 0) {
          setVideo(data[0]);
        } else {
          setVideo(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching video:", error);
        setVideo(null);
      });
  }, [parametros.id]);

  if (!video) return <NotFound />;

  return (
    <div className="player-back">
      <div className="player-text">
        <h1 className="player-sub-text">{video.descripcion}</h1>
      </div>
      <section className="player-container">
        <iframe
          width="100%"
          height="100%"
          src={video.url}
          title={video.titulo}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </section>
    </div>
  );
}

export default Player;
