import React, { createContext, useState, useEffect, ReactNode } from "react";
import { v4 as uuid } from "uuid";

import { Video } from "../components/types/Video";

interface GlobalContextType {
  videos: Video[];
  categorias: any[];
  destacados: Video[];
  actualizarVideos: (dataVideos: Video[]) => void;
  actualizarCategorias: (dataCategorias: any[]) => void;
  eliminarVideo: (id: string) => void;
  editarVideo: (id: string, nuevoVideo: Video) => void;
  crearCategoria: (nuevaCategoria: any) => void;
  eliminarCategoria: (id: string) => void;
  registrarVideo: (video: any) => void;
}

interface Props {
  children: ReactNode;
}

export const GlobalContext = createContext<GlobalContextType>(
  {} as GlobalContextType
);

export const GlobalProvider = ({ children }: Props) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [destacados, setDestacados] = useState<Video[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resVideos = await fetch(`http://localhost:5000/videos`);
        const resCategorias = await fetch(`http://localhost:5000/categorias`);
        const resDestacados = await fetch(`http://localhost:5000/destacados`);
        const dataVideos: Video[] = await resVideos.json();
        const dataCategorias: any[] = await resCategorias.json();
        const dataDestacados: Video[] = await resDestacados.json();
        actualizarVideos(dataVideos);
        actualizarCategorias(dataCategorias);
        actualizarDestacados(dataDestacados);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const actualizarVideos = (dataVideos: Video[]) => {
    setVideos(dataVideos);
  };

  const actualizarCategorias = (dataCategorias: any[]) => {
    setCategorias(dataCategorias);
  };

  const actualizarDestacados = (dataDestacados: Video[]) => {
    setDestacados(dataDestacados);
  };

  const registrarVideo = async (video: any) => {
    const nuevoVideo: Video = { ...video, id: uuid() };
    try {
      const res = await fetch("http://localhost:5000/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoVideo),
      });

      if (res.ok) {
        const data: Video = await res.json();
        setVideos([...videos, data]);
      } else {
        console.error("Error al registrar el video");
      }
    } catch (error) {
      console.error("Error al registrar el video:", error);
    }
  };

  const eliminarVideo = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/videos/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Error al eliminar el video");
      }

      const nuevosVideos = videos.filter((video) => video.id !== id);
      setVideos(nuevosVideos);
    } catch (error) {
      console.error("Error al eliminar el video:", error);
    }
  };

  const editarVideo = async (id: string, nuevoVideo: Video) => {
    try {
      const response = await fetch(`http://localhost:5000/videos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoVideo),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el video");
      }

      const videoEditado = videos.map((video) =>
        video.id === id ? { ...video, ...nuevoVideo } : video
      );
      setVideos(videoEditado);

      console.log("Video actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar el video:", error);
    }
  };

  const crearCategoria = async (nuevaCategoria: any) => {
    const nuevaCategoriaConId = { ...nuevaCategoria, id: uuid() };
    try {
      const res = await fetch(`http://localhost:5000/categorias`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaCategoriaConId),
      });

      if (!res.ok) {
        throw new Error("Error al crear la categoría");
      }

      const data = await res.json();
      setCategorias([...categorias, data]);
    } catch (error) {
      console.error("Error al crear la categoría:", error);
    }
  };

  const eliminarCategoria = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/categorias/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Error al eliminar la categoría");
      }

      const nuevasCategorias = categorias.filter(
        (categoria) => categoria.id !== id
      );
      setCategorias(nuevasCategorias);
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };

  const contextValue: GlobalContextType = {
    videos,
    categorias,
    destacados,
    actualizarVideos,
    actualizarCategorias,
    eliminarVideo,
    editarVideo,
    crearCategoria,
    eliminarCategoria,
    registrarVideo,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
