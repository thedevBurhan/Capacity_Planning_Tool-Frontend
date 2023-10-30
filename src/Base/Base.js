import React from "react";

const Base = ({ children }) => {
  return (
    <div className="main-component base-component">
      <h1 className="app-heading">Capacity Planning Tool</h1>

      <div>{children}</div>
    </div>
  );
};

export default Base;
