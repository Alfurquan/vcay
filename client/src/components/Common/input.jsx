import React from "react";

const Input = ({
  name,
  label,
  value,
  onChange,
  type,
  error,
  multiple,
  onMultipleChange
}) => {
  const inputStyle = {
    fontSize: "14px",
    padding: "13px 20px",
    fontWeight: "300",
    height: "44px",
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
      <label style={labelStyle} htmlFor={name}>
        {label}
      </label>
      {multiple ? (
        <input
          style={type !== "file" ? inputStyle : null}
          type={type}
          className={type === "file" ? "form-control-file" : "form-control"}
          id={name}
          name={name}
          value={value}
          onChange={onMultipleChange}
          multiple
        />
      ) : (
        <input
          style={type !== "file" ? inputStyle : null}
          type={type}
          className={type === "file" ? "form-control-file" : "form-control"}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
        />
      )}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default Input;
