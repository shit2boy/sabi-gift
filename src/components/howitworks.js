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
    
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-sm-6 offset-1" data-aos="fade-left">
            <h4 className="mb-3 p-4">
              It's very easy to gift anyone - <br />
              How SabiGifts works
            </h4>
            <div className="d-flex stepOutline" id="active">
              <div className="stepIcon">
               <FcPlus size="60px" />
              </div>
              <div id="stepTitle">
                <p className="text-white id='title'">Add Wedding Gifts</p>
                <p>
                  Register for anything, from plates to airline gift cards,
                  cash,even gifts from other stores.
                </p>
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
            <div className="d-flex stepOutline">
              <div className="stepIcon">
                <FaAllergies size="60px" />
              </div>
              <div id="stepTitle">
                <p id='title'> Guests Buy You Gifts</p>
                <p style={{ color: "#9597A6", opacity: "1" }}>
                  Receive them stress-free and choose when they ship.
                   You can exchange any before they ship, too.
                </p>
              </div>
              <div className="text-center p-2 stepTag">
                <p>2</p>
                <p>Guest</p>
              </div>
            </div>
            <div className="d-flex stepOutline mb-4" data-aos="fade-in">
              <div className="rounded stepIcon">
                <FaHome size="60px" />
              </div>
              <div id="stepTitle">
                <p id='title'>Enjoy Newlywed Life </p>
                <p style={{ color: "#9597A6", opacity: "1" }}>
                  Use your gifts, spend your cash, and don’t forget about
                   your 20% post-wedding discount.
                </p>
              </div>
              <div className="text-center p-2 stepTag">
                <p>3</p>
                <p>Enjoy</p>
              </div>
            </div>
          </div>

          <div className="col-sm" data-aos="fade-right">
            <img className="img-fluid " src={Box5} alt="giftDisplay" />
          </div>
        </div>
        <p className='pionter mt-3 container' style={{color:'#9597A6',textAlign:"left"}}>Want to know more? <span style={{color:'#545871'}}>Read more about our Services</span></p>

      </div>
    
  );
};

export default Howitworks;
