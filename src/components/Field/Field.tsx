import React from "react";
import "./Field.css";

interface FieldProps {
  title: string;
  placeholder: string;
  required?: boolean;
  value: string;
  updateValue: (value: string) => void;
  type?: string;
  errorMsg?: string | null;
}

const Field: React.FC<FieldProps> = (props) => {
  const placeholderMod = `${props.placeholder}...`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.updateValue(e.target.value);
  };

  return (
    <div className={`field-field field-${props.type || "text"}`}>
      <label>{props.title}</label>
      <input
        placeholder={placeholderMod}
        required={props.required}
        value={props.value}
        onChange={handleChange}
        type={props.type || "text"}
      />
      {props.errorMsg && (
        <p className="field-error-msg">{props.errorMsg}</p>
      )}
    </div>
  );
};

export default Field;
