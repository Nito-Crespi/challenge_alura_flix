import React, { useState, useContext } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import "./RegistryCategory.css";
import Field from "../../Field/Field";
import Button from "../../Button/Button";
import Table from "../../Table/Table";
import { Categoria } from "../../types/Categoria";

const RegistryCategory: React.FC = () => {
  const { categorias, crearCategoria } = useContext(GlobalContext);

  const [nombre, actualizarNombre] = useState<string>("");
  const [color, actualizarColor] = useState<string>("#2271D1");
  const [errorNombre, setErrorNombre] = useState<string | null>(null);
  const [errorColor, setErrorColor] = useState<string | null>(null);

  const handleNewCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nombreExistente = categorias.find(
      (cat: Categoria) => cat.nombre === nombre
    );
    if (nombre.length < 3 || nombre.length > 200) {
      setErrorNombre("El nombre debe tener entre 3 y 200 caracteres.");
      return;
    } else if (nombreExistente) {
      setErrorNombre("El nombre elegido ya está en uso.");
      return;
    } else {
      setErrorNombre(null);
    }

    const colorExistente = categorias.find(
      (cat: Categoria) => cat.colorPrimario === color
    );
    if (colorExistente) {
      setErrorColor("El color seleccionado ya está en uso.");
      return;
    } else {
      setErrorColor(null);
    }

    crearCategoria({ nombre, colorPrimario: color });

    actualizarNombre("");
    actualizarColor("#2271D1");
  };

  const cleanFields = () => {
    actualizarNombre("");
    actualizarColor("#2271D1");
    setErrorNombre(null);
    setErrorColor(null);
  };

  return (
    <section className="formm">
      <form onSubmit={handleNewCategory}>
        <h2>Rellena el formulario para crear la nueva categoría</h2>
        <Field
          title="Nombre"
          placeholder="Ingresar nombre de la categoría"
          required
          value={nombre}
          updateValue={actualizarNombre}
          errorMsg={errorNombre}
        />
        <Field
          title="Color"
          placeholder="Ingresar el color en Hex"
          required
          value={color}
          updateValue={actualizarColor}
          type="color"
          errorMsg={errorColor}
        />
        <Table categorias={categorias} />
        <div className="bot-cat">
          <Button type="submit">Registrar categoría</Button>
          <Button type="button" onClick={cleanFields}>
            Limpiar
          </Button>
        </div>
      </form>
    </section>
  );
};

export default RegistryCategory;
