import React from "react";
import Box5 from "../images/landing/box5.png";
import { FaAllergies } from "react-icons/fa";
import { FcPlus } from "react-icons/fc";
import { FaHome } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const Howitworks = () => {
  AOS.init({
    duration: 2000,
  });
  return (
    
      <div className="container-fluid py-4 mt-4">
        <div className="row">
          <div className="col-6 offset-1" data-aos="fade-left">
            <h4 className="mb-3 p-4">
              It's very easy to gift anyone - <br />
              How SabiGifts works
            </h4>
            <div className="d-flex stepOutline" id="active">
              <div className="stepIcon">
                <p>
                  <FcPlus size="60px" />
                </p>
              </div>
              <div id="stepTitle">
                <h4 className="text-white">Add Wedding Gifts</h4>
                <p>
                  Register for anything, from plates to airline gift cards,
                  cash,
                  <br />
                  even gifts from other stores.
                </p>
              </div>
              <div className=" stepTag">
                <p> 1</p>
                <p>
                  select <br />
                  event
                </p>
              </div>
            </div>
            <div className="d-flex stepOutline">
              <div className="stepIcon">
                <p>
                  {" "}
                  <FaAllergies size="60px" />
                </p>
              </div>
              <div id="stepTitle">
                <h4> Guests Buy You Gifts</h4>
                <p style={{ color: "#9597A6", opacity: "1" }}>
                  Receive them stress-free and choose when they ship.
                  <br /> You can exchange any before they ship, too.
                </p>
              </div>
              <div className=" stepTag">
                <p>2</p>
                <p>Guest</p>
              </div>
            </div>
            <div className="d-flex stepOutline" data-aos="fade-in">
              <div className="rounded stepIcon">
                <p>
                  <FaHome size="60px" />
                </p>
              </div>
              <div id="stepTitle">
                <h4>Enjoy Newlywed Life </h4>
                <p style={{ color: "#9597A6", opacity: "1" }}>
                  Use your gifts, spend your cash, and don’t forget about
                  <br /> your 20% post-wedding discount.
                </p>
              </div>
              <div className=" stepTag">
                <p>3</p>
                <p>Enjoy</p>
              </div>
            </div>
          </div>

          <div className="col-sm" data-aos="fade-right">
            <img className="img-fluid" src={Box5} alt="giftDisplay" />
          </div>
        </div>
      </div>
    
  );
};

export default Howitworks;
