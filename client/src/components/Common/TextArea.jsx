import React from "react";

const TextArea = ({
  name,
  value,
  onChange,
  label,
  rows,
  cols,
  error,
  showLabel
}) => {
  const textAreaStyle = {
    fontSize: "14px",
    padding: "13px 20px",
    fontWeight: "300",
    lineHeight: "44px",
    boxShadow: "none"
  };

  const labelStyle = {
    fontSize: ".875rem",
    fontWeight: "400",
    lineHeight: "1.5",
    color: "#212529"
  };
  return (
    <div className="form-group">
      {showLabel && (
        <label style={labelStyle} htmlFor={name}>
          {label}
        </label>
      )}
      <textarea
        style={textAreaStyle}
        className="form-control"
        id={name}
        rows={rows}
        cols={cols}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default TextArea;
