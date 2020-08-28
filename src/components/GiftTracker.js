import React, { Component } from "react";
import smartwatch from "../images/Sabi-storepage/smartwatch.jpg";
// import Button from './Button'
import { GrFavorite } from "react-icons/gr";
import DashboardNav from "./DashboardNav";
import SideBar from "./SideBar";
import { Button } from "react-bootstrap";
import axios from "axios";
import util from "../util/util";

let styles = {
  boxShadow: "0px 2px 8px #00000022",
  borderRadius: "8px",
  opacity: 1,
};
export class GiftTracker extends Component {
  constructor() {
    super();
    this.state = {
      trackedItems: [],
    };
  }
  componentDidMount() {
    axios
      .get(
        `${util.API_BASE_URL}gift-tracker/?event=${window.localStorage.eventId}`,
        {
          headers: {
            Authorization: "Token " + localStorage.getItem("token_id"),
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data !== undefined) {
          let data = res.data;
          let trackedGift;
          for (let key in data) {
            trackedGift = data[key];
          }
          this.setState({ trackedItems: data });
          console.log(trackedGift);
        }
      })
      .catch((err) => {
        console.log(err);
        // this.setState({ emptyRegistry: true });
      });
  }

  render() {
    return (
      <div className="container-fluid">
        <DashboardNav />
        <hr className="mt-0 mb-0" />
        <div className="row mt-4">
          <div className="col-1 ml-4 justify-content-center ">
            <SideBar />
          </div>
          <div className="col-10 mx-auto px-2">
            <h2>Gift Tracker</h2>
            <p>
              We'll list all gifts the guests buy you on this page and your app.
              Here's a rundown on how to them get them home.
            </p>
            <div className="d-flex justify-content-between" style={styles}>
              <div className="d-flex align-items-center">
                <img
                  src={smartwatch}
                  width="100px"
                  alt="giftFromGuest"
                  className="m-4"
                />
                <div className="ml-2">
                  <h5>Apple watch Series 4 GPS</h5>
                  <p>Redesigned from scratch and completely revised.</p>
                  <span>#13,000</span>
                </div>
              </div>
              <div className="p-4">
                <div>
                  <Button
                    className="mb-1 shadow-lg"
                    style={{
                      background: "#6F64F8",
                      width: "158px",
                      borderBottomRightRadius: "8px",
                    }}
                  >
                    SEND NOW
                  </Button>
                </div>
                <div>
                  <Button
                    style={{
                      background: "#ededed",
                      color: "#2c2c2c",
                      borderBottomLeftRadius: "8px",
                    }}
                  >
                    <GrFavorite />
                    Convert to credit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GiftTracker;
