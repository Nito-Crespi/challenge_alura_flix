import React, { CSSProperties } from "react";
import "./TitleCategory.css";

interface TitleCategoryProps {
  style?: CSSProperties;
  children: React.ReactNode;
}

const TitleCategory: React.FC<TitleCategoryProps> = ({ style, children }) => {
  return (
    <h1 className="title-category-title" style={style}>
      {children}
    </h1>
  );
};

export default TitleCategory;
