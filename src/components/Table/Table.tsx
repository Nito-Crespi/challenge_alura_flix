import React from "react";
import "./Table.css";
import { Categoria } from "../types/Categoria";

interface TableProps {
  categorias: Categoria[];
}

const Table: React.FC<TableProps> = ({ categorias }) => {
  return (
    <div className="table-list-categories">
      <h3>Categorías existentes:</h3>
      <ul>
        {categorias.map((categoria) => (
          <li
            key={categoria.id}
            style={
              {
                "--colorPrimario": categoria.colorPrimario,
              } as React.CSSProperties
            }
          >
            {categoria.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Table;
