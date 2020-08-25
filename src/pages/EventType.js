import React, { Component } from "react";
import Hero from "../components/Hero";
import sabigift from "../images/landing/sabigift.png";
import { StateContext } from "../Context";
import Product from "../components/Product";
import AvailableItems from "../components/AvailableItems";

const date = new Date();
const formatDate = { day: "numeric", year: "numeric", month: "long" };

class EventType extends Component {
  static contextType = StateContext;

  state = {
    date: date.toLocaleDateString(undefined, formatDate),
    event_type: "",
    user: null,
  };
  componentDidMount() {
    const { handle } = this.props.match.params;
    fetch(`https://sabigift.netlify.app/registry/${handle}`).then((user) => {
      this.setState(() => ({ user }));
    });
    if (window.localStorage.event_type === "2") {
      this.setState({ event_type: "Wedding" });
    } else {
      this.setState({ event_type: "Birthday" });
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="mb-4">
          <a href="/Dashboard">
            {" "}
            <img src={sabigift} alt="logo" width="75px" />{" "}
          </a>
        </div>
        <div className="mb-5">
          <Hero hero="birthday">
            <div className="text-center">
              <h4>
                {" "}
                {window.localStorage.name}'s {this.state.event_type}{" "}
              </h4>
              <p>{this.state.date}</p>
            </div>
          </Hero>
        </div>
        <div className="container mt-5 ">
          <div className="row">
            <div className="col-3 d-none d-lg-block availableItem">
              <AvailableItems />
            </div>
            <div className=" col">
              <Product showWishList={true} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default EventType;
