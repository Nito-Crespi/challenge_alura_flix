import React, { useState, useContext } from "react";
import { RiDeleteBin2Line, RiEdit2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import ModalEditarVideo from "../../Modal/Modal";
import "./VideoCard.css";
import { GlobalContext } from '../../../context/GlobalContext';

interface VideoData {
  foto: string;
  id: string;
  titulo: string;
  descripcion: string;
  url: string;
  categoria: string;
}

interface VideoCardProps {
  datos: VideoData;
  colorPrimario: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ datos, colorPrimario }) => {
  const { editarVideo, eliminarVideo } = useContext(GlobalContext);
  const { foto, id, titulo, descripcion, url, categoria } = datos;
  const [modalAbierto, setModalAbierto] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const openModal = () => {
    setModalAbierto(true);
  };

  const closeModal = () => {
    setModalAbierto(false);
  };

  const handleEditVideo = async (id: string, nuevoVideo: VideoData) => {
    try {
      await editarVideo(id, nuevoVideo);
      setMensaje("Video actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar el video:", error);
      setMensaje("Error al actualizar el video");
    }
  };

  return (
    <div
      className="videoCard"
      style={{
        "--colorPrimario": colorPrimario,
      } as React.CSSProperties}
    >
      <Link to={`/${id}`}>
        <img className="imagen" src={foto} alt={titulo} />
      </Link>
      <div className="info">
        <button className="eliminar" onClick={() => eliminarVideo(id)}>
          <RiDeleteBin2Line className="icon" /> ELIMINAR
        </button>
        <button className="editar" onClick={openModal}>
          <RiEdit2Line className="icon" /> EDITAR
        </button>
      </div>
      <ModalEditarVideo
        isOpen={modalAbierto}
        onClose={closeModal}
        video={{ foto, id, titulo, descripcion, url, categoria }}
        editarVideo={handleEditVideo}
        // colorPrimario={colorPrimario}
      />
    </div>
  );
};

export default VideoCard;
