import React from "react";
import Box5 from "../images/landing/box5.png";
import { FaRegHandPaper } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { GrAddCircle } from "react-icons/gr";
import AOS from "aos";
import "aos/dist/aos.css";

const Howitworks = () => {
  AOS.init({
    duration: 2000,
  });
  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-sm-6 offset-1" id="howitworks" data-aos="fade-left">
          <h3 className="mb-3 p-4">
            It's very easy to gift anyone - <br />
            How SabiGifts works
          </h3>
          <div
            className="d-flex justify-content-around stepOutline"
            id="active"
          >
            <div className="rounded-circle stepIcon">
              <GrAddCircle color="#EBD0CE" size="40px" />
            </div>
            <div id="stepTitle">
              <p className="text-white id='title'">Add Wedding Gifts</p>
              <small className="d-block">
                Register for anything, from plates to airline gift cards, cash,
                <br />
                even gifts from other stores.
              </small>
            </div>
            <div className=" text-center p-2 stepTag">
              <p> 1</p>
              <p>
                select
                <br />
                event
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-around stepOutline">
            <div className="rounded-circle stepIcon">
              <FaRegHandPaper color=" #EBD0CE" size="35px" />
            </div>
            <div id="stepTitle">
              <p> Guests Buy You Gifts</p>
              <small className="d-block">
                Receive them stress-free and choose when they ship.
                <br />
                You can exchange any before they ship, too.
              </small>
            </div>
            <div className="text-center p-2 stepTag">
              <p>2</p>
              <p>Guest</p>
            </div>
          </div>
          <div
            className="d-flex stepOutline justify-content-around mb-4"
            data-aos="fade-in"
          >
            <div className="rounded-circle stepIcon">
              <FaHome color=" #EBD0CE" size="40px" />
            </div>
            <div id="stepTitle">
              <p>Enjoy Newlywed Life </p>
              <small className="d-block">
                Use your gifts, spend your cash, and don’t forget about <br />
                your 20% post-wedding discount.
              </small>
            </div>
            <div className="text-center p-2 stepTag">
              <strong>3</strong>
              <p>Enjoy</p>
            </div>
          </div>
        </div>

        <div className="col-sm" data-aos="fade-right">
          <img className="img-fluid " src={Box5} alt="giftDisplay" />
        </div>
      </div>
      <p
        className="pionter mt-3 container"
        style={{ color: "#9597A6", textAlign: "left" }}
      >
        Want to know more?{" "}
        <span style={{ color: "#545871" }}>Read more about our Services</span>
      </p>
    </div>
  );
};

export default Howitworks;
