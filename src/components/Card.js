import React from "react";
import { Link } from "react-router-dom";

const Card = ({ image, title, content, footerTitle, footDescription }) => {
  return (
    <div
      className="grow mt-4 mb-3"
      id="myCard"
      style={{ position: "relative" }}
    >
      <div className="card text-center">
        <div style={{ position: "absolute", top: "-25px", left: "40%" }}>
          <img
            className="card-img-top rounded-circle center"
            src={image}
            style={{
              backgroundColor: "#58b852",
              width: "50px",
            }}
            alt="card-cap"
          />
        </div>
        <div className="card-body mt-4">
          <h5 className="card-title">{title}</h5>
          <p className="card-text text-justify">{content}</p>
        </div>
        <div className="card-footer">
          <h6 className="pointer">
            <Link className="text-link" to="/createRegistry">
              {" "}
              {footerTitle}
            </Link>
          </h6>
          <small className="text-center pointer">{footDescription}</small>
        </div>
      </div>
    </div>
  );
};

export default Card;
