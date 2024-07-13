import React, { useState, useContext } from "react";
import "./RegistryVideo.css";
import Field from "../../Field/Field";
import ListOption from "../../ListOption/ListOption";
import Boton from "../../Button/Button";
import { GlobalContext } from "../../../context/GlobalContext";

const RegistryVideo: React.FC = () => {
  const { categorias, registrarVideo } = useContext(GlobalContext);

  const [titulo, setTitulo] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [foto, setFoto] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [categoria, setCategoria] = useState<string>("");

  const [errorTitulo, setErrorTitulo] = useState<string | null>(null);
  const [errorUrl, setErrorUrl] = useState<string | null>(null);
  const [errorFoto, setErrorFoto] = useState<string | null>(null);
  const [errorDescripcion, setErrorDescripcion] = useState<string | null>(null);
  const [errorCategoria, setErrorCategoria] = useState<string | null>(null);

  const manejarEnvio = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (titulo.length < 3 || titulo.length > 200) {
      setErrorTitulo("El título debe tener entre 3 y 200 caracteres.");
      return;
    } else {
      setErrorTitulo(null);
    }

    if (!isPhotoURLValid(foto)) {
      setErrorFoto("La URL de la foto no es válida o no es una foto válida.");
      return;
    } else {
      setErrorFoto(null);
    }

    if (!isVideoURLValid(url)) {
      setErrorUrl("La URL del video no es válida o no es un video válido.");
      return;
    } else {
      setErrorUrl(null);
    }

    if (descripcion.length < 3 || descripcion.length > 500) {
      setErrorDescripcion(
        "La descripción debe tener entre 3 y 500 caracteres."
      );
      return;
    } else {
      setErrorDescripcion(null);
    }

    if (!categoria) {
      setErrorCategoria("La categoría es requerida.");
      return;
    } else {
      setErrorCategoria(null);
    }

    const datosAEnviar = {
      titulo,
      url,
      foto,
      descripcion,
      categoria,
    };
    registrarVideo(datosAEnviar);

    limpiarCampos();
  };

  const limpiarCampos = () => {
    setTitulo("");
    setUrl("");
    setFoto("");
    setDescripcion("");
    setCategoria("");
    setErrorTitulo(null);
    setErrorUrl(null);
    setErrorFoto(null);
    setErrorDescripcion(null);
    setErrorCategoria(null);
  };

  const isPhotoURLValid = (url: string) => {
    const photoUrlPattern = /\.(jpg|jpeg|png|gif)$/i;
    return photoUrlPattern.test(url);
  };

  const isVideoURLValid = (url: string) => {
    const videoUrlPattern =
      /^https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+\?si=[a-zA-Z0-9_-]+$/;
    return videoUrlPattern.test(url);
  };

  return (
    <section className="registry-video-formulario">
      <form onSubmit={manejarEnvio}>
        <h2>Rellena el formulario para crear el nuevo video</h2>
        <Field
          title="Título"
          placeholder="Ingresar título"
          required
          value={titulo}
          updateValue={setTitulo}
          errorMsg={errorTitulo}
        />
        <Field
          title="URL del video"
          placeholder="Ingresar URL del video"
          required
          value={url}
          updateValue={setUrl}
          errorMsg={errorUrl}
        />
        <Field
          title="URL de la foto"
          placeholder="Ingresar URL de la foto"
          required
          value={foto}
          updateValue={setFoto}
          errorMsg={errorFoto}
        />
        <Field
          title="Descripción"
          placeholder="Ingresar descripción"
          required
          value={descripcion}
          updateValue={setDescripcion}
          errorMsg={errorDescripcion}
        />
        <ListOption
          title="Categoría"
          value={categoria}
          updateValue={setCategoria}
          cat={categorias}
          errorMsg={errorCategoria}
        />
        <div className="registry-video-bot">
          <Boton type="submit">Crear</Boton>
          <Boton type="button" onClick={limpiarCampos}>
            Limpiar
          </Boton>
        </div>
      </form>
    </section>
  );
};

export default RegistryVideo;
