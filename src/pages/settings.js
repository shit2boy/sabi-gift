import React, { Component } from "react";
import { Link } from "react-router-dom";
import sabigift from "../images/landing/sabigift.png";
import { Form, Col } from "react-bootstrap";
// import bmw from "../images/landing/bmw.png";
import { Steps } from "antd";
import { StateContext } from "../Context";
import axios from "axios";
import util from "../util/util";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Step } = Steps;

export class Setting extends Component {
  static contextType = StateContext;
  constructor(props) {
    super(props);
    this.state = {
      //   formField: {},
      currentIndex: 0,
      signUpResponse: { successful: false, message: "" },
      registryType: [],
      isLoggedIn: false,
      errorMessage: "",
      errors: {},
      fristName: "",
      lastName: "",
      street: "",
      city: "",
      Phone: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    // console.log(formField);
  }

  validateForm() {
    // let formField = this.state.formField;
    let errors = {};
    let formIsValid = true;
    if (!this.state.firstName) {
      formIsValid = false;
      errors["firstName"] = "*Cannot be empty";
    }
    if (typeof this.state.firstName !== "undefined") {
      if (!this.state.firstName.match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["firstName"] = "*Please enter alphabet characters only.";
      }
    }
    if (!this.state.lastName) {
      formIsValid = false;
      errors["lastName"] = "Cannot be empty";
    }
    if (typeof this.state.lastName !== "undefined") {
      if (!this.state.lastName.match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["lastName"] = "*Please enter alphabet characters only.";
      }
    }
    if (!this.state.Phone) {
      formIsValid = false;
      errors["Phone"] = "*Please enter your mobile no.";
    }

    if (typeof this.state.Phone !== "undefined") {
      if (!this.state.Phone.match(/^[0-9]{11}$/)) {
        formIsValid = false;
        errors["Phone"] = "*Please enter valid mobile no.";
      }
    }
    // if (!this.state.address) {
    //   formIsValid = false;
    //   errors["address"] = "*Cannot be empty";
    // }
    if (!this.state.street) {
      formIsValid = false;
      errors["street"] = "Cannot be empty";
    }
    if (!this.state.city) {
      formIsValid = false;
      errors["city"] = "*Cannot be empty";
    }
    if (!this.state.state) {
      formIsValid = false;
      errors["state"] = "*Cannot be empty";
    }
    this.setState({ errors: errors });
    return formIsValid;
  }
  errorNotify = () =>
    toast.error("Error processing your request!", { autoClose: 2000 });
  notify = () => toast.success("updated successfully!", { autoClose: 2000 });
  handleSubmit(event) {
    // console.log(this.validateForm());

    event.preventDefault();
    if (this.validateForm()) {
      //   let formField = this.state.formField;
      const newUserInfo = new FormData();
      newUserInfo.append("first_name", this.state.firstName);
      newUserInfo.append("last_name", this.state.lastName);
      newUserInfo.append("mobile", this.state.Phone);
      newUserInfo.append("street", this.state.address);
      newUserInfo.append("state", this.state.state);
      newUserInfo.append("city", this.state.city);
      newUserInfo.append("gender", undefined);
      newUserInfo.append("photo", "");

      axios
        .patch(`${util.API_BASE_URL}accounts/profile/`, newUserInfo, {
          headers: {
            Authorization: "Token " + localStorage.getItem("token_id"),
          },
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) window.location.href = "/manageregistry";
          this.notify();
          // console.log(response);
        })
        .catch((error) => {
          console.dir(error);
          this.errorNotify();
        });
    }
  }

  componentDidMount() {
    axios
      .get(`${util.API_BASE_URL}accounts/profile/`, {
        headers: { Authorization: "Token " + localStorage.getItem("token_id") },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data !== undefined) {
          this.setState({ firstName: res.data.first_name });
          this.setState({ lastName: res.data.last_name });
          this.setState({ city: res.data.city });
          this.setState({ Phone: res.data.mobile });
          this.setState({ street: res.data.street });
          this.setState({ state: res.data.state });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  back = () => {
    if (this.state.currentIndex <= 0) {
      return;
    }
    this.setState({ currentIndex: this.state.currentIndex - 1 });
  };
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className=" col-4 d-none d-lg-flex justify-content-center  leftside">
            <div className="mt-5">
              <div className="row">
                <div>
                  <Link to="/">
                    <img
                      className="homeicon rounded-circle"
                      src={sabigift}
                      alt="SabiGift-Logo"
                    />
                  </Link>
                </div>
                <Steps
                  className=""
                  direction="vertical"
                  current={this.state.currentIndex}
                >
                  <Step className="mb-3" title="Your Profile" />
                  <Step className="mb-3" title="Event basics" />
                  <Step className="mb-3" title="Select Gifts" />
                  <Step className="mb-3" title="Confirm" />
                </Steps>
              </div>
              {/* <div className='row mb-0'>
                 <LogOut logout={<p>Save and log out</p>} />
                </div> */}
            </div>
          </div>

          {this.state.currentIndex === 0 && (
            <div className="col rightSide">
              <div className="row">
                <div
                  className="col offset-1 justify-content-center"
                  style={{ minHeight: "85vh", marginTop: "35px" }}
                >
                  <div>
                    <h2 className="">Your Information</h2>
                    <Form onSubmit={this.handleSubmit} className="w-75">
                      <Form.Row>
                        <Form.Group as={Col} controlId="formGridName">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            onChange={this.handleChange}
                            type="text"
                            name="firstName"
                            placeholder="Jimi"
                            pattern="[A-Za-z]"
                            value={this.state.firstName}
                            required
                          />
                          <span style={{ color: "red" }}>
                            {this.state.errors["firstName"]}
                          </span>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formName">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            onChange={this.handleChange}
                            type="text"
                            name="lastName"
                            value={this.state.lastName}
                            pattern="[A-Za-z]"
                            required
                          />
                          <span style={{ color: "red" }}>
                            {this.state.errors["lastName"]}
                          </span>
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group as={Col} controlId="Phone">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control
                            onChange={this.handleChange}
                            type="tel"
                            name="Phone"
                            value={this.state.Phone}
                          />
                          <span style={{ color: "red" }}>
                            {this.state.errors["Phone"]}
                          </span>
                        </Form.Group>

                        <Form.Group as={Col} controlId="AltPhone">
                          <Form.Label>Alt Phone</Form.Label>
                          <Form.Control
                            onChange={this.handleChange}
                            type="tel"
                            name="AltPhone"
                            placeholder="0000-0000-0000"
                            required
                          />
                        </Form.Group>
                      </Form.Row>
                      <Form.Group controlId="Address">
                        <Form.Label>Street addresss</Form.Label>
                        <Form.Control
                          onChange={this.handleChange}
                          type="text"
                          name="street"
                          value={this.state.street}
                        />
                        <span style={{ color: "red" }}>
                          {this.state.errors["address"]}
                        </span>
                      </Form.Group>
                      <Form.Row>
                        <Form.Group as={Col} controlId="City">
                          <Form.Label>City</Form.Label>
                          <Form.Control
                            onChange={this.handleChange}
                            type="text"
                            name="city"
                            value={this.state.city}
                          />
                          <span style={{ color: "red" }}>
                            {this.state.errors["city"]}
                          </span>
                        </Form.Group>

                        <Form.Group as={Col} controlId="State">
                          <Form.Label>State</Form.Label>
                          <Form.Control
                            onChange={this.handleChange}
                            type="text"
                            name="state"
                            value={this.state.state}
                          />
                          <span style={{ color: "red" }}>
                            {this.state.errors["state"]}
                          </span>
                        </Form.Group>
                      </Form.Row>
                      {this.state.errorMessage && (
                        <p style={{ color: "red", textAlign: "center" }}>
                          {this.state.errorMessage}{" "}
                        </p>
                      )}
                    </Form>
                    <ToastContainer />
                  </div>
                </div>
              </div>
              <div className="row p-4" style={{ background: "#ffffff" }}>
                <div className="col bg-white d-flex justify-content-between">
                  <button
                    type="button"
                    onClick={() => {
                      window.location.href = "/manageregistry";
                    }}
                    className="btn btn-light rounded-pill px-5 "
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    onClick={this.handleSubmit}
                    className="btn btn-dark rounded-pill px-5"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Setting;
