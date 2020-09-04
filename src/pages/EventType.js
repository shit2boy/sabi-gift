import React, { Component } from "react";
import Hero from "../components/Hero";
import sabigift from "../images/landing/sabigift.png";
import { StateContext } from "../Context";
import Product from "../components/Product";
import AvailableItems from "../components/AvailableItems";
import util from "../util/util";
import axios from "axios";
import { GrCart } from "react-icons/gr";
import { Link } from "react-router-dom";

const date = new Date();
const formatDate = { day: "numeric", year: "numeric", month: "long" };

class EventType extends Component {
  static contextType = StateContext;

  state = {
    date: date.toLocaleDateString(undefined, formatDate),
    event_type: "",
    event_date: "",
    products: [],
    user: null,
    event_owner: "",
    slug: "",
    dayLeftToEvent: "",
  };
  componentDidMount() {
    const { handle } = this.props.match.params;
    // fetch(`${util.API_BASE_URL}events/${handle}`).then((user) => {
    //   this.setState(() => ({ user }));
    //   console.log(user);
    // });

    axios
      .get(`${util.API_BASE_URL}events/${handle}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data !== undefined) {
          let data = res.data;
          window.localStorage.setItem("slug", data.slug);
          window.localStorage.setItem("event_owner", data.event_owner);
          window.localStorage.setItem("event_id", data.id);

          for (let i = 0; i < data.gifts.length; i++) {
            data.gifts[i].picture = data.gifts[i].picture.replace(
              "image/upload/",
              ""
            );
          }

          this.setState({
            event_type: data.event_type,
            event_date: data.start_date,
            slug: data.slug,
            products: data.gifts,
          });
          window.localStorage.setItem("name", res.data.first_name);

          let event_date = this.state.event_date;
          let dateDifference =
            new Date(event_date).getTime() - new Date().getTime(); //Future date - current date
          let daysTillEventday = Math.floor(
            dateDifference / (1000 * 60 * 60 * 24)
          );
          this.setState({ dayLeftToEvent: daysTillEventday });
        }
      })
      .catch((err) => {
        // console.log(err);
        window.localStorage.removeItem("name");
      });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="mb-4 d-flex justify-content-between">
          <a href="/home">
            {" "}
            <img src={sabigift} alt="logo" width="75px" />{" "}
          </a>
          <div style={{ position: "relative" }}>
            {" "}
            <Link to="/cart">
              <span
                className="badge-danger"
                style={{ color: "white", font: "16px", position: "absolute" }}
              >
                {this.context.quantity}
              </span>
              <GrCart size="40px" />
            </Link>
          </div>
        </div>
        <div className="mb-5">
          <Hero hero="birthday">
            <div className="text-center">
              <h4>
                {" "}
                {window.localStorage.event_owner}'s {this.state.event_type}{" "}
              </h4>
              <p>{this.state.dayLeftToEvent} days Left</p>
            </div>
          </Hero>
        </div>
        <div className="container mt-5 ">
          <div className="row">
            <div className="col-3 d-none d-lg-block availableItem">
              <AvailableItems />
            </div>
            <div className=" col">
              <Product Products={this.state.products} showWishList={true} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default EventType;
