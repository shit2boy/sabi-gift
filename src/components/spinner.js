import React, { Fragment } from "react";
// import loader from "./loader.gif";
import loader from "../images/landing/loader.gif";

export const Spinner = () => {
  return (
    <Fragment>
      <img
        src={loader}
        alt="loading"
        style={{ with: "150px", margin: "auto", display: "block" }}
      />
    </Fragment>
  );
};
export default Spinner;
