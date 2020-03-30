import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import TextArea from "./TextArea";
import Button from "../UI/Button/button";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({
      errors: errors || {}
    });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const { errors } = this.state;
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({
      data,
      errors
    });
  };

  renderTextArea(name, placeholder, rows, cols, showLabel) {
    const { data, errors } = this.state;
    return (
      <TextArea
        name={name}
        showLabel={showLabel}
        label={placeholder}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
        cols={cols}
        rows={rows}
      />
    );
  }

  //   renderSelect(name, label, options) {
  //     const { data, errors } = this.state;
  //     return (
  //       <Select
  //         name={name}
  //         value={data[name]}
  //         label={label}
  //         options={options}
  //         onChange={this.handleChange}
  //         error={errors[name]}
  //       />
  //     );
  //   }

  renderFileInput(name, placeholder, type, multiple, handleFileChange) {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={placeholder}
        value={data[name]}
        type={type}
        error={errors[name]}
        onChange={handleFileChange}
        onMultipleChange={handleFileChange}
        multiple={multiple}
      />
    );
  }

  renderInput(name, placeholder, type) {
    const { data, errors } = this.state;

    return (
      <Input
        name={name}
        label={placeholder}
        value={data[name]}
        type={type}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  }
  renderButton(label, clickHandler) {
    // console.log("valid", this.validate());
    return (
      <Button
        classes="button"
        disabled={this.validate()}
        onClick={clickHandler}
      >
        {label}
      </Button>
    );
  }
}

export default Form;
