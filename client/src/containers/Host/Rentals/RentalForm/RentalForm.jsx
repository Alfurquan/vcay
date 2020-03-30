import React from "react";
import Form from "../../../../components/Common/form";
import Joi from "joi-browser";
import _ from "lodash";
import { verifyFile } from "../../../../services/fileService";
import * as rentalActions from "../../../../store/actions/rentals";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class RentalForm extends Form {
  state = {
    data: {
      title: "",
      description: "",
      address: "",
      city: "",
      state: "",
      zip: 0,
      bedrooms: 0,
      guests: 0,
      dailyRentalRate: 0
    },
    mainImage: undefined,
    otherImages: [],
    errors: {}
  };

  schema = {
    title: Joi.string()
      .required()
      .min(5)
      .max(100)
      .label("Title"),
    description: Joi.string()
      .required()
      .min(5)
      .max(255)
      .label("Description"),
    address: Joi.string()
      .min(5)
      .max(255)
      .label("Address"),
    city: Joi.string()
      .min(5)
      .max(255)
      .required(),
    state: Joi.string()
      .min(5)
      .max(255)
      .required(),
    bedrooms: Joi.number()
      .min(1)
      .max(20)
      .required(),
    guests: Joi.number()
      .min(1)
      .max(20)
      .required(),
    dailyRentalRate: Joi.number().required(),
    zip: Joi.number().required(),
    mainImage: Joi.string(),
    otherImages: Joi.array().items(Joi.string())
  };

  handleFileChange = event => {
    const { errors } = this.state;
    let image = event.target.files[0];
    console.log("img", image);

    if (!image) {
      errors["mainImage"] = "Select an image";
      this.setState({
        mainImage: image,
        errors
      });
      return;
    }

    const { result, message } = verifyFile(image);
    console.log("res", result);
    if (!result) {
      errors["mainImage"] = message;
      event.target.value = null;
      image = null;
      this.setState({
        mainImage: image,
        errors
      });
      return;
    }

    if (errors["mainImage"]) {
      delete errors["mainImage"];
    }
    this.setState({
      mainImage: image,
      errors
    });
  };

  handleMultipleFileChange = event => {
    const { errors } = this.state;
    let otherImages = [...this.state.otherImages];
    const files = event.target.files;
    console.log("func called");
    console.log("files", files);

    //check for not more than 3 images per rental
    if (files.length > 3) {
      errors["otherImages"] = "Atmost three images allowed";
      event.target.value = null;
      this.setState({
        errors
      });
      return;
    }

    //If no file selected
    if (files.length === 0) {
      errors["otherImages"] = "Select atleast one image";
      event.target.value = null;
      this.setState({
        errors
      });
      return;
    }

    //check types of file..the files must be images
    _.each(files, file => {
      console.log("loop");
      const { result, message } = verifyFile(file);
      if (!result) {
        errors["otherImages"] = message;
        this.setState({
          errors
        });
      }
      otherImages.push(file);
    });

    if (!_.isEmpty(errors)) {
      console.log("empty called");
      otherImages = [];
      event.target.value = null;
    }

    this.setState({
      otherImages,
      errors
    });
  };

  validateFileInputs = () => {
    if (!this.state.mainImage) {
      alert("Select a Main Image");
      return false;
    }
    if (_.isEmpty(this.state.otherImages)) {
      alert("Select atleast one other image");
      return false;
    }
    if (!_.isEmpty(this.state.errors)) {
      console.log("errs", this.state.errors);
      alert(this.state.errors[Object.keys(this.state.errors)[0]]);
      return false;
    }
    return true;
  };

  doSubmit = async () => {
    console.log("data", this.state.data);
    console.log("mainImage", this.state.mainImage);
    if (this.validateFileInputs()) {
      console.log("submitted");
      try {
        await this.props.addRental(
          this.state.data,
          this.state.mainImage,
          this.state.otherImages
        );
        this.props.history.push("/dashboard");
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          const errors = { ...this.state.errors };
          errors.data = ex.response.data;
          this.setState({
            errors
          });
        }
      }
      if (this.state.errors.data) {
        alert(this.state.errors.data);
      }
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title", "text")}
          {this.renderTextArea("description", "Description", 3, 5, true)}
          {this.renderTextArea("address", "Address", 4, 6, true)}
          {this.renderInput("city", "City", "text")}
          {this.renderInput("state", "State", "text")}
          {this.renderInput("zip", "Zipcode", "number")}
          {this.renderInput("bedrooms", "Bedrooms", "number")}
          {this.renderInput("guests", "Guests", "number")}
          {this.renderInput("dailyRentalRate", "Daily Rental Rate", "number")}
          {this.renderFileInput(
            "mainImage",
            "Main Image",
            "file",
            false,
            this.handleFileChange
          )}
          {this.renderFileInput(
            "otherImages",
            "Other Images",
            "file",
            true,
            this.handleMultipleFileChange
          )}
          {this.renderButton("Submit", this.handleSubmit)}
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addRental: (rental, mainImage, otherImages) =>
      dispatch(rentalActions.addRental(rental, mainImage, otherImages))
  };
};

export default withRouter(connect(null, mapDispatchToProps)(RentalForm));
