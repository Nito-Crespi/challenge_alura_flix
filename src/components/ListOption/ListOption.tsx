import React from "react";
import "./ListOption.css";

interface Categoria {
  id: string;
  nombre: string;
}

interface ListOptionProps {
  title: string;
  value: string;
  updateValue: (value: string) => void;
  cat: Categoria[];
  errorMsg?: string | null;
}

const ListOption: React.FC<ListOptionProps> = (props) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.updateValue(e.target.value);
  };

  return (
    <div className="list-option">
      <label>{props.title}</label>
      <select value={props.value} onChange={handleChange}>
        <option value="" disabled hidden>
          Seleccionar categoría
        </option>
        {props.cat.map((categoria) => (
          <option key={categoria.id} value={categoria.nombre}>
            {categoria.nombre}
          </option>
        ))}
      </select>
      {props.errorMsg && (
        <span className="error-mensaje">{props.errorMsg}</span>
      )}
    </div>
  );
};

export default ListOption;
