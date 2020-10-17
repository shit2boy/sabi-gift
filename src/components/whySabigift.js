import React from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import coupleImage from "../images/landing/bg-1.png";

const WhySabigift = () => {
  AOS.init({
    duration: 2000,
  });

  return (
    <div className="container-fluid mt-4 ">
      <div className="row no-gutters">
        <div className="col-sm" data-aos="fade-left">
          {/* <div> */} <img className="" src={coupleImage} alt="coupleImage" />
          {/* </div> */}
        </div>
        <div
          className="col-sm"
          style={{ backgroundColor: "#D2F5D9", position: "relative" }}
          data-aos="fade-right"
        >
          <div className=" why">
            <h3>Why we built SabiGifts</h3>

            <p className="firstPara pt-5 text-justify">
              No store had everything couples wanted. And no place recognized
              what engaged couple crave in a registry while planning their
              weddings.{" "}
            </p>
            <p className=" secondPara text-justify pt-4">
              So we talked to tons of couples and built what they wanted: One
              store with gifts, gift cards, and cash funds. Smart ways to
              personalize their registry to delight guests. Flexible (and free)
              shipping and so much more. We made registering easy for couples
              and their guests, so all of you can enjoy this special time.
            </p>
            <div
              className="createReg"
              style={{ marginTop: "60px", color: "#ffffff" }}
            >
              <Link
                to="/createRegistry"
                style={{
                  backgroundColor: "#545871",
                  color: "#ffffff",
                  borderRadius: "1.50rem",
                }}
                className="py-3 px-5 text-link text-white "
              >
                Create a registry
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhySabigift;
