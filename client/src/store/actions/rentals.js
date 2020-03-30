import http from "../../services/httpService";
import { apiUrl } from "../../config/config.json";
import _ from "lodash";

export const ADD_RENTAL = "ADD_RENTAL";
export const FETCH_RENTALS = "FETCH_RENTALS";

export const fetchRentals = () => {
  return async dispatch => {
    try {
      const response = await http.get(apiUrl + "api/rentals");
      dispatch({ type: FETCH_RENTALS, rentals: response.data });
    } catch (err) {
      throw err;
    }
  };
};

export const addRental = (rental, mainImage, otherImages) => {
  return async dispatch => {
    try {
      let formData = new FormData();
      formData.append("title", rental.title);
      formData.append("description", rental.description);
      formData.append("bedrooms", rental.bedrooms);
      formData.append("guests", rental.guests);
      formData.append("address", rental.address);
      formData.append("city", rental.city);
      formData.append("state", rental.state);
      formData.append("zip", rental.zip);
      formData.append("dailyRentalRate", rental.dailyRentalRate);
      formData.append("mainImage", mainImage);
      _.each(otherImages, img => {
        formData.append("subImages", img);
      });
      const response = await http.post(apiUrl + "api/rentals", formData);
      dispatch({ type: ADD_RENTAL, rental: response.data });
    } catch (ex) {
      throw ex;
    }
  };
};
