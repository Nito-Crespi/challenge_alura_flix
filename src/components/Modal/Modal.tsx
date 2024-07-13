import React, { useState, useEffect, useContext } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import styled from "styled-components";
import { GlobalContext } from "../../context/GlobalContext";

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow-y: auto;
`;

const DialogEstilizado = styled.div`
  background: var(--color-bg-edit);
  border: 3px solid var(--color-frontend);
  padding: 2.25rem;
  border-radius: 0.938rem;
  max-width: 50rem;
  width: 100%;
  max-height: 78.5rem;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: visible;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1001;
`;

const CloseIcon = styled(AiFillCloseCircle)`
  position: absolute;
  top: 2rem;
  right: 2rem;
  cursor: pointer;
  font-size: 3.25rem;
  color: var(--color-white);
`;

const ModalHeader = styled.h2`
  font-size: 30px;
  color: var(--color-blue-light);
  background: var(--color-bg-edit);
  width: 100%;
  max-width: 35.813rem;
  align-self: center;
  text-align: left;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  background: var(--color-bg-edit);
  align-self: center;
  text-align: left;
  max-width: 35.813rem;
  width: 100%;
`;

const ModalLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  color: var(--color-white);
  background: var(--color-bg-edit);
`;

const ModalInput = styled.input`
  background: var(--color-bg-edit);
  color: var(--color-light-gray);
  margin-top: 0.5rem;
  border: 3px solid var(--color-blue-light);
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  box-sizing: border-box;
  resize: none;
  overflow: hidden;
  margin-bottom: 1rem;
  outline: none;
  transition: border-color 0.3s ease;
  min-height: 3.875rem;

  &:focus {
    border-color: var(--color-frontend);
  }
`;

const ModalTextarea = styled.textarea`
  background: var(--color-bg-edit);
  color: var(--color-light-gray);
  margin-top: 0.5rem;
  border: 3px solid var(--color-blue-light);
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  box-sizing: border-box;
  resize: vertical;
  overflow: hidden;
  margin-bottom: 1rem;
  outline: none;
  transition: border-color 0.3s ease;
  min-height: 3.875rem;

  &:focus {
    border-color: var(--color-frontend);
  }
`;

const ModalButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

interface ModalEditarVideoProps {
  editarVideo: (id: string, video: any) => Promise<void>;
  video: {
    id: string;
    titulo: string;
    descripcion: string;
    url: string;
    foto: string;
    categoria: string;
  };
  onClose: () => void;
  isOpen: boolean;
}

const ModalEditarVideo: React.FC<ModalEditarVideoProps> = ({
  editarVideo,
  video,
  onClose,
  isOpen,
}) => {
  const [titulo, setTitulo] = useState<string>(video.titulo);
  const [descripcion, setDescripcion] = useState<string>(video.descripcion);
  const [url, setUrlVideo] = useState<string>(video.url);
  const [foto, setFoto] = useState<string>(video.foto);
  const [categoria, setCategoria] = useState<string>(video.categoria);

  const { categorias } = useContext(GlobalContext);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const videoEditado = {
      ...video,
      titulo,
      categoria,
      url,
      foto,
      descripcion,
    };

    await editarVideo(video.id, videoEditado);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <Overlay onClick={onClose}>
        <DialogEstilizado onClick={(e) => e.stopPropagation()}>
          <CloseIcon onClick={onClose} />
          <ModalHeader>Editar video</ModalHeader>
          <ModalForm onSubmit={handleSubmit}>
            <ModalLabel>
              Título:
              <ModalInput
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </ModalLabel>
            <ModalLabel>
              URL del Video:
              <ModalInput
                type="text"
                value={url}
                onChange={(e) => setUrlVideo(e.target.value)}
                required
              />
            </ModalLabel>
            <ModalLabel>
              Foto:
              <ModalInput
                type="text"
                value={foto}
                onChange={(e) => setFoto(e.target.value)}
                required
              />
            </ModalLabel>
            <ModalLabel>
              Categoría:
              <ModalInput
                as="select"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
              >
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.nombre}>
                    {cat.nombre}
                  </option>
                ))}
              </ModalInput>
            </ModalLabel>
            <ModalLabel>
              Descripción:
              <ModalTextarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows={4}
                required
              />
            </ModalLabel>
            <ModalButton type="submit">Guardar cambios</ModalButton>
          </ModalForm>
        </DialogEstilizado>
      </Overlay>
    </>
  );
};

export default ModalEditarVideo;
