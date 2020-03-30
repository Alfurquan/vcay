import { ADD_RENTAL, FETCH_RENTALS } from "../actions/rentals";
import Rental from "../../models/Rental";

const initialState = {
  searchedRentals: [],
  userRentals: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RENTALS:
      return {
        ...state,
        userRentals: action.rentals.map(
          rental =>
            new Rental(
              rental._id,
              rental.title,
              rental.description,
              rental.bedrooms,
              rental.guests,
              rental.dailyRentalRate,
              rental.address,
              rental.city,
              rental.state,
              rental.zip,
              rental.location,
              rental.createdAt,
              rental.ownerId,
              rental.mainImage,
              rental.subImages
            )
        )
      };

    case ADD_RENTAL:
      const userRentals = [...state.userRentals];
      const rental = action.rental;
      const newRental = new Rental(
        rental._id,
        rental.title,
        rental.description,
        rental.bedrooms,
        rental.guests,
        rental.dailyRentalRate,
        rental.address,
        rental.city,
        rental.state,
        rental.zip,
        rental.location,
        rental.createdAt,
        rental.ownerId,
        rental.mainImage,
        rental.subImages
      );
      userRentals.push(newRental);
      return {
        ...state,
        userRentals: userRentals
      };

    default:
      return state;
  }
};
