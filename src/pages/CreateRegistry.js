import React, { Component } from "react";
import { Link } from "react-router-dom";
import sabigift from "../images/landing/sabigift.png";
// import ring from "../images/landing/ring.svg";
import { Steps } from "antd";
import { ProductConsumer, StateContext } from "../Context";
import axios from "axios";
import util from "../util/util";
import Spinner from "../components/spinner";

const { Step } = Steps;

export class CreateRegistry extends Component {
  static contextType = StateContext;
  constructor(props) {
    super(props);
    this.state = {
      eventType: "",
      eventTypeList: [],
      loading: false,
    };
  }

  componentDidMount() {
    axios
      .get(`${util.API_BASE_URL}event-types/`, {
        "content-type": "multipart/form-data",
      })
      .then((res) => {
        console.log(res.data);
        if (res.data !== undefined) {
          // this.setState({ loading: true });
          // const typeList = res.data
          let data = res.data.results;
          for (let i = 0; i < data.length; i++) {
            data[i].image = data[i].image.replace("image/upload/", "");
            this.setState({ eventTypeList: data, loading: true });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleEvent = (e) => {
    // console.log(e);
    this.setState({ eventType: e.target.id });
    // console.log(this.state.eventType);
  };

  render() {
    const { loading } = this.state;

    if (!loading) return <Spinner />;
    return (
      <ProductConsumer>
        {(value) => (
          <div className="container-fluid">
            <div className="row">
              <div className=" col-4 d-none d-lg-flex justify-content-center leftside">
                <div className="mt-5">
                  <div>
                    <Link to="/">
                      <img
                        className="homeicon rounded-circle"
                        src={sabigift}
                        alt="SabiGift-Logo"
                      />
                    </Link>
                  </div>
                  <Steps className="" direction="vertical" current={0}>
                    <Step style={{ divor: " white" }} title="Select Event" />
                    <Step title="Event basics" />
                    <Step title="Select Gifts" />
                    <Step title="Confirm" />
                  </Steps>
                </div>
              </div>
              <div className="col rightside">
                <div className="row">
                  <div
                    className="col offset-1 justify-content-center"
                    style={{ minHeight: "80vh", marginTop: "35px" }}
                  >
                    <div>
                      <h3 className="">
                        First, Let's Make sure we <br />
                        support your events
                      </h3>

                      <p className="py-4">Select the Event type</p>
                      <div className="row col-10">
                        {this.state.eventTypeList.map((type) => (
                          <button
                            onClick={this.handleEvent}
                            key={type.id}
                            id={type.name}
                            className="eventItem"
                          >
                            <img
                              src={type.image}
                              width="40px"
                              alt={type.slug}
                              id={type.name}
                            />
                            <p id={type.name}>{type.name}</p>
                          </button>
                        ))}

                        {/* <button
                          onClick={this.handleEvent}
                          className="eventItem"
                          id="other"
                        >
                          <img
                            src={ring}
                            alt="eventAvatar"
                            id="other"
                            width="40px"
                          />

                          <p id="other">Not on list</p>
                        </button> */}
                      </div>
                      <p className="py-4">
                        Choose the category that matches your event. If your
                        <br />
                        Event is not Listed,Kindly choose others for more
                        options
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div
                    className="col bg-white  d-flex justify-content-between align-items-center"
                    style={{ height: "90px" }}
                  >
                    <Link
                      to="/"
                      className="btn rounded-pill px-5"
                      style={{ background: "#ffffff" }}
                    >
                      Back
                    </Link>
                    {this.state.eventType === "Wedding" && (
                      <Link
                        to="/getstarted"
                        className=" text-link btn btn-dark rounded-pill px-5"
                      >
                        Next
                      </Link>
                    )}
                    {this.state.eventType === "Birthday" && (
                      <Link
                        to="/registration"
                        className=" text-link btn btn-dark rounded-pill px-5"
                      >
                        Next
                      </Link>
                    )}
                    {this.state.eventType === "Others" && (
                      <Link
                        to="/notlisted-event"
                        className=" text-link btn btn-dark rounded-pill px-5"
                      >
                        Next
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </ProductConsumer>
    );
  }
}

export default CreateRegistry;
