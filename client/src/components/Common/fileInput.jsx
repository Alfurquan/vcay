import React from "react";

const FileInput = props => {
  const inputStyle = {
    fontSize: "14px",
    padding: "13px 20px",
    fontWeight: "300",
    borderRadius: 0,
    backgroundColor: "#f0f0f0",
    border: 0,
    height: "44px",
    lineHeight: "44px",
    boxShadow: "none"
  };

  const labelStyle = {
    color: "#252525",
    fontSize: "13px"
  };
  return (
    <div className="form-group">
      <label style={labelStyle} htmlFor={name}>
        {label}
      </label>
      <input
        style={inputStyle}
        type={type}
        className="form-control"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default FileInput;
