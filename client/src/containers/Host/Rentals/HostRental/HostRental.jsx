import React, { useRef, Children } from "react";
import Tabs from "../../../../components/Navigation/Tabs/Tabs";
import "./HostRental.css";
import Button from "../../../../components/UI/Button/button";
import RentalForm from "../RentalForm/RentalForm";

const HostRental = props => {
  const tabRef = useRef();

  const goToRentalForm = () => {
    tabRef.current.onClickTabItem("Add rental");
  };

  return (
    <section className="main-content mt-5 container">
      <div className="tabs-section">
        <Tabs ref={tabRef} classes="tabs">
          <div label="Overview">
            <div className="row justify-content-center">
              <div className="col-md-6 text-center">
                <h1 className="py-4 main-header">How to start hosting?</h1>
                <p className="deep-para pb-5">
                  Listing a home on Vcay has never been easier or more
                  customizable. You’re just a few steps away from earning money
                  and reaching millions of global travelers.
                </p>
                <Button classes="button" onClick={goToRentalForm}>
                  Get Started
                </Button>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-10">
                <div className="image-container my-5">
                  <img
                    src="https://a0.muscache.com/pictures/5fb428c8-6829-43ee-ba1b-3c557791c73e.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <hr />
            <h1 className="py-4 main-header text-center">
              Control how you host
            </h1>
            <div className="row pt-2 justify-content-center">
              <div className="col-md-10">
                <div className="row">
                  <div className="col-md-6 pb-4">
                    <h4 className="small-header">Host whenever you want</h4>
                    <p className="deep-para pt-2">
                      There’s no minimum or mandatory time you have to host, so
                      you can block off dates when you’re not available. You can
                      also set rules about your availability, including: <br />
                      <br />• Min/max nights a guest can stay • How far in the
                      future guests can book • Advance notice needed before a
                      booking
                    </p>
                  </div>
                  <div className="col-md-6 pb-4">
                    <h4 className="small-header">
                      Set prices you feel good about
                    </h4>
                    <p className="deep-para pt-2">
                      You get to choose your nightly prices, and our pricing
                      tools can help you decide. You can also easily add custom
                      details and modify them later if you want like: <br />
                      <br /> • Cleaning fees • Weekly discounts • Special prices
                      for specific times of year
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h4 className="small-header">
                      Quickly coordinate calendars
                    </h4>
                    <p className="deep-para pt-2">
                      To avoid getting booked when you can’t host or have an
                      existing reservation, you can connect your Vcay calendar
                      with your other calendars. This allows you to keep all
                      calendars up-to-date automatically.
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h4 className="small-header">
                      Establish rules for your space
                    </h4>
                    <p className="deep-para pt-2">
                      To help set expectations, you can add House Rules that
                      guests must agree to before booking. If a guest breaks a
                      rule after they book, you can cancel the reservation
                      without penalty.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <h1 className="py-4 main-header text-center">
              Get hosting support
            </h1>
            <div className="row pt-2 justify-content-center">
              <div className="col-md-10">
                <div className="row">
                  <div className="col-md-6">
                    <img
                      src="https://images.unsplash.com/photo-1556565681-67b9cd907d20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                      alt=""
                      width="100%"
                      height="100%"
                    />
                  </div>
                  <div className="col-md-6 flex">
                    <h4 className="small-header pt-3">Resources throughout</h4>
                    <p className="deep-para">
                      As a host, the Vcay community always has your back. For
                      helpful tips and suggestions, you’ll find a robust Help
                      Center, 375,000 hosts in our Community Center, and a
                      number of hosting toolkits.
                    </p>
                  </div>
                </div>
                <div className="row pt-4">
                  <div className="col-md-6 flex">
                    <h4 className="small-header pt-3">
                      We’re here for you 24/7
                    </h4>
                    <p className="deep-para">
                      Our global team is standing by 24/7 to support you by
                      phone, email, and live chat. The team can help you with
                      everything from issues creating your listing to concerns
                      about guests.
                    </p>
                  </div>
                  <div className="col-md-6">
                    <img
                      src="https://a0.muscache.com/pictures/ddbe060b-49b0-45a8-9f69-dda5762a7c50.jpg"
                      alt=""
                      width="100%"
                      height="100%"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="footer-content">
                  <div className="content">
                    <h2>Ready to earn?</h2>
                    <Button classes="button" onClick={goToRentalForm}>
                      Get Started
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div label="Add rental">
            <div className="row justify-content-center">
              <div className="col-md-10">
                <div className="rental">
                  <div className="add-rental">
                    <h1 className="main-header">Add Your</h1>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1490197415175-074fd86b1fcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=753&q=80"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <RentalForm />
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default HostRental;
