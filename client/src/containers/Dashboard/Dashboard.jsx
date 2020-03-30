import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as rentalActions from "../../store/actions/rentals";

const Dashboard = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(rentalActions.fetchRentals());
  }, [dispatch]);

  return <h1>Dashboard!</h1>;
};

export default Dashboard;
