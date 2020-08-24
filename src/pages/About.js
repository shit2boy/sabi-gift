import React, { Component } from "react";
import { Link } from "react-router-dom";
import sabigift from "../images/landing/sabigift.png";
import { Form, Col } from "react-bootstrap";
// import bmw from "../images/landing/bmw.png";
import { Steps } from "antd";
import { StateContext } from "../Context";
import axios from "axios";
import util from "../util/util";
// import LogOut from "../components/LogOut";

const { Step } = Steps;

export class About extends Component {
  static contextType = StateContext;
  constructor(props) {
    super(props);
    this.state = {
      formField: {},
      currentIndex: 0,
      signUpResponse: { successful: false, message: "" },
      registryType: [],
      isLoggedIn: false,
      errorMessage: "",
      errors: {},
      border: " ",
      selected: [],
      selectedgift: [],
      backgroundColor: "",
      bestSellingItems: [],
      selectedRegistryType: [],
      registryCategories: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let formField = this.state.formField;
    formField[e.target.name] = e.target.value;
    this.setState({
      formField,
    });
  }
  handleSelectedGiftType = (e) => {
    this.setState({
      selectedGiftType: e.target.innerText,
    });
    console.log(this.state.selectedGiftType);
  };
  // handleSelectOpt = (e) => {
  //   let selectedArrr = this.state.selected;
  //   if (this.state.selected.indexOf(e.target.id) === -1) {
  //     selectedArrr.push(e.target.id);
  //     this.setState({ selected: selectedArrr });
  //   } else {
  //     selectedArrr.splice(this.state.selected.indexOf(e.target.id), 1);
  //     this.setState({ selected: selectedArrr });
  //   }
  //   // console.log(this.state.selected);
  // };
  addedToRegistry = (e) => {
    let selectedArr = this.state.selectedgift;
    if (this.state.selectedgift.indexOf(e.target.id) === -1) {
      selectedArr.push(e.target.id);
      this.setState({ selectedgift: selectedArr });
    } else {
      selectedArr.splice(this.state.selectedgift.indexOf(e.target.id), 1);
      this.setState({ selectedgift: selectedArr });
    }
    console.log(this.state.selectedgift);
  };

  validateForm() {
    let formField = this.state.formField;
    let errors = {};
    let formIsValid = true;
    if (!formField["firstName"] || formField["firstName"].length < 3) {
      formIsValid = false;
      errors["firstName"] = "Cannot be empty or less than 3 characters";
    }
    if (typeof formField["firstName"] !== "undefined") {
      if (!formField["firstName"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["firstName"] = "*Please enter alphabet characters only.";
      }
    }
    if (!formField["lastName"] || formField["lastName"].length < 3) {
      formIsValid = false;
      errors["lastName"] = "Cannot be empty  or less than 3 characters";
    }
    if (typeof formField["lastName"] !== "undefined") {
      if (!formField["lastName"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["lastName"] = "*Please enter alphabet characters only.";
      }
    }
    if (!formField["Phone"]) {
      formIsValid = false;
      errors["Phone"] = "*Please enter your mobile no.";
    }

    if (typeof formField["Phone"] !== "undefined") {
      if (!formField["Phone"].match(/^[0-9]{11}$/)) {
        formIsValid = false;
        errors["Phone"] = "*Please enter valid mobile no.";
      }
    }
    if (!formField["address"]) {
      formIsValid = false;
      errors["address"] = "Cannot be empty";
    }
    if (!formField["street"]) {
      formIsValid = false;
      errors["street"] = "Cannot be empty";
    }
    if (!formField["city"]) {
      formIsValid = false;
      errors["city"] = "Cannot be empty";
    }
    if (!formField["state"]) {
      formIsValid = false;
      errors["state"] = "Cannot be empty";
    }
    this.setState({ errors: errors });
    return formIsValid;
  }

  handleSubmit(event) {
    console.log(this.validateForm());

    event.preventDefault();
    if (this.validateForm()) {
      event.stopPropagation();
      alert("Profile Updated");
      let formField = this.state.formField;
      const newUserInfo = new FormData();
      // newUserInfo.append('email', formField['email']);
      newUserInfo.append("first_name", formField["firstName"]);
      newUserInfo.append("last_name", formField["lastName"]);
      newUserInfo.append("mobile", formField["Phone"]);
      newUserInfo.append("street", formField["address"]);
      newUserInfo.append("lga", formField["city"]);
      newUserInfo.append("city", formField["city"]);
      newUserInfo.append("gender", undefined);
      newUserInfo.append("photo", "");

      axios
        .patch(`${util.API_BASE_URL}accounts/profile/`, newUserInfo, {
          headers: {
            Authorization: "Token " + localStorage.getItem("token_id"),
          },
        })
        .then((response) => {
          if (response.status === 200)
            // console.log(response);
            // alert(response.statusText);
            this.setState({
              currentIndex: this.state.currentIndex + 1,
              signUpResponse: {
                successful: true,
                message: "Registry Successful",
              },
            });
        })
        .catch((error) => {
          console.dir(error);
          this.setState({ errorMessage: error.response.data.first_name });
        });
    }
  }

  componentDidMount(event) {
    this.setState({ selectedRegistryType: event });
    let type = this.state.selectedRegistryType;
    console.log(type);
    axios
      .get(`${util.API_BASE_URL}categories/`, {
        headers: { Authorization: "Token " + localStorage.getItem("token_id") },
      })
      .then((response) => {
        if (response.status === 200)
          this.setState({ registryCategories: response.data });
      })
      .catch((error) => {
        console.dir(error);
      });
    axios
      .get(`${util.API_BASE_URL}registry-types/`, {
        headers: { Authorization: "Token " + localStorage.getItem("token_id") },
      })
      .then((response) => {
        if (response.status === 200) {
          let data = response.data;
          for (let i = 0; i < data.length; i++) {
            data[i].image = data[i].image.replace("image/upload/", "");
            this.setState({ registryType: data });
          }
        }
      })
      .catch((error) => {
        console.dir(error);
      });
    axios
      .get(`${util.API_BASE_URL}registries/?best_selling=False`, {
        headers: { Authorization: "Token " + localStorage.getItem("token_id") },
      })
      .then((response) => {
        // console.log(response.data);
        if (response.status === 200) {
          let data = response.data;

          for (let i = 0; i < data.length; i++) {
            data[i].picture = data[i].picture.replace("image/upload/", "");
          }
          this.setState({ bestSellingItems: data });
        }
      })
      .catch((error) => {
        console.dir(error);
      });
  }

  handleGiftSubmit = (event) => {
    event.preventDefault();
    const gift = this.state.selectedgift;
    // let result = gift.map(Number);
    let gifts = {
      gifts: gift.map(Number),
    };

    axios
      .patch(`${util.API_BASE_URL}add-registries/3/`, gifts, {
        headers: { Authorization: "Token " + localStorage.getItem("token_id") },
      })
      .then((response) => {
        if (response.status === 200)
          // console.log(response);
          window.location.href = "/manageregistry";

        // console.log(gifts);
      })
      .catch((error) => {
        console.dir(error);
        // this.setState({ errorMessage: error.response.data.first_name });
      });
    // console.log(gifts);
    // console.log(this.state.selectedgift);
  };

  back = () => {
    if (this.state.currentIndex <= 0) {
      return;
    }
    this.setState({ currentIndex: this.state.currentIndex - 1 });
  };
  next = () => {
    if (this.state.currentIndex >= 4) {
      window.location.href = "/manageregistry";

      return;
    }
    this.setState({ currentIndex: this.state.currentIndex + 1 });
  };
  render() {
    const containerStyle = {
      border: "1px solid",
      backgroundColor: "#ffffff",
      cursor: "pointer",
    };
    const unmarkedStyle = {
      backgroundColor: "#f7f7f7",
      cursor: "pointer",
    };
    const unmarkedgiftStyle = {
      backgroundColor: "#red",
      cursor: "pointer",
    };
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
                    <h2 className="">
                      Hello! Please tell us a little <br /> bit about Yourself.
                    </h2>
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
                            placeholder="Fola"
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
                            placeholder="0000 0000-0000"
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
                          name="address"
                          placeholder="14b wole Ariyo street"
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
                            placeholder="Lekki"
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
                            placeholder="State"
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
                  </div>
                </div>
              </div>
              <div className="row p-4" style={{ background: "#ffffff" }}>
                <div className="col bg-white d-flex justify-content-between">
                  <button
                    type="button"
                    onClick={this.back}
                    className="btn btn-light rounded-pill px-5"
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

          {this.state.currentIndex === 1 && (
            <div className="col rightSide">
              <div className="row">
                <div
                  className="col offset-1 justify-content-center"
                  style={{ minHeight: "85vh", marginTop: "35px" }}
                >
                  <div className="">
                    <h2>
                      What are you most excited <br />
                      to register at Sibigifts?
                    </h2>
                    <p className="py-4">Select the gift types</p>
                    <div className="col-10 row">
                      {this.state.registryType.map((type) => (
                        <button key={type.id} className="eventItem col-lg-3">
                          <div className="text-center">
                            <img
                              src={type.image}
                              alt={type.name}
                              width="80px"
                            />{" "}
                          </div>
                          <p
                            onClick={this.handleSelectedGiftType}
                            className="text-center mb-0"
                          >
                            {type.name}
                          </p>
                        </button>
                      ))}
                    </div>
                    <div className="p-3">
                      <p>Choose the category that matches your event.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div
                  className="col bg-white d-flex justify-content-between align-items-center"
                  style={{ height: "90px" }}
                >
                  {/* <div className=" d-flex justify-content-around"> */}
                  <button
                    onClick={this.back}
                    className="btn btn-light rounded-pill px-5"
                  >
                    Back
                  </button>
                  <button
                    onClick={this.next}
                    className="btn btn-dark rounded-pill px-5"
                  >
                    Next
                  </button>
                  {/* </div> */}
                </div>
              </div>
            </div>
          )}

          {this.state.currentIndex === 2 && (
            <div className=" col rightSide">
              <div className="row">
                <div
                  className="col offset-1 justify-content-center"
                  style={{ minHeight: "80vh", marginTop: "40px" }}
                >
                  <div className="">
                    <h2 id="header">
                      What are somethings you <br /> enjoy doing together
                    </h2>

                    <p className="py-4">Select as many as you want</p>
                    <div
                      className="row col-10 mb-2"
                      // onClick={this.handleSelectOpt}
                    >
                      {this.state.registryCategories.map((category) => (
                        <div
                          id={"ddd" + category.id}
                          key={category.id}
                          style={
                            this.context.selected.indexOf("ddd" + category.id) >
                            -1
                              ? containerStyle
                              : unmarkedStyle
                          }
                          className="eventItem col-lg-3"
                          // onClick={this.handleSelectOpt}
                        >
                          <p></p>
                          {/* <div className='text-center'><img src={category.image} alt='weddingIcon' /> </div> */}
                          <p
                            id={"ddd" + category.id}
                            onClick={this.context.handleSelectOpt}
                            className="text-center"
                          >
                            {category.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div
                  className="col bg-white d-flex justify-content-between align-items-center"
                  style={{ height: "90px" }}
                >
                  <button
                    onClick={this.back}
                    className="btn btn-light rounded-pill px-5"
                  >
                    Back
                  </button>
                  <button
                    onClick={this.next}
                    className="btn btn-dark rounded-pill px-5"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
          {this.state.currentIndex === 3 && (
            <div className="col rightSide ">
              <div className="row">
                <div
                  className="col d-flex justify-content-center align-items-center"
                  style={{ minHeight: "85vh" }}
                >
                  <h2 className="tet-center">That's all. You're done! </h2>
                </div>
              </div>
              <div className="row">
                <div
                  className="col bg-white d-flex justify-content-between align-items-center"
                  style={{ height: "100px" }}
                >
                  <button
                    to=""
                    onClick={this.back}
                    className="btn btn-light rounded-pill px-5"
                  >
                    Back
                  </button>
                  <button
                    to=""
                    onClick={this.next}
                    className="btn btn-dark rounded-pill px-5"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
          {this.state.currentIndex === 4 && (
            <div className="col rightSide">
              <div className="py-5 row offset-1 ">
                <div className="col">
                  <h2 id="header">Try adding few gifts </h2>
                  <p>you can't go wrong with this best sellers</p>
                  <div className="row col-10 mb-2">
                    {this.state.bestSellingItems.map((item) => (
                      <div
                        id={item.id}
                        key={item.id}
                        style={
                          this.state.selectedgift.indexOf(item.id) > -1
                            ? containerStyle
                            : unmarkedgiftStyle
                        }
                        className="eventItem col-lg-3 text-center"
                      >
                        <img
                          src={item.picture}
                          id={item.id}
                          width="100px"
                          alt={item.slug}
                          onClick={this.addedToRegistry}
                        />
                        <strong className="d-block text-dark">
                          {item.slug}
                        </strong>
                        {/* <small className="d-block">Description of gift</small> */}
                        <strong className="">#{item.price}</strong>
                      </div>
                      // <div className="eventItem col-lg-3 text-center">
                      //   <img src={bmw} width="80px" alt="weddingIcon" />
                      //   <strong className="d-block">Option 2</strong>
                      //   <small className="d-block">Description of gift</small>
                      //   <strong>#200k</strong>
                      // </div>
                    ))}

                    {/* <div className="eventItem col-lg-3 text-center">
                      <img src={bmw} width="80px" alt="weddingIcon" />
                      <strong className="d-block">Option 3</strong>
                      <small className="d-block">Description of gift</small>
                      <strong>#200k</strong>
                    </div>
                    <div className="eventItem col-lg-3 text-center">
                      <img src={bmw} width="80px" alt="weddingIcon" />
                      <strong className="d-block">Option 4</strong>
                      <small className="d-block">Description of gift</small>
                      <strong>#200k</strong>
                    </div> */}
                  </div>
                  {/* <div className="row col-10 mb-2">
                    <div className="eventItem bg-success col-lg-3 text-center">
                      <img src={bmw} width="80px" alt="weddingIcon" />
                      <strong className="d-block text-dark">Car</strong>
                      <small className="d-block">Description of gift</small>
                      <strong className="text-white">#200k</strong>
                    </div>
                    <div className="eventItem col-lg-3 text-center">
                      <img src={bmw} width="80px" alt="weddingIcon" />
                      <strong className="d-block">Option 2</strong>
                      <small className="d-block">Description of gift</small>
                      <strong>#200k</strong>
                    </div>
                    <div className="eventItem col-lg-3 text-center">
                      <img src={bmw} width="80px" alt="weddingIcon" />
                      <strong className="d-block">Option 3</strong>
                      <small className="d-block">Description of gift</small>
                      <strong>#200k</strong>
                    </div>
                    <div className="eventItem col-lg-3 text-center">
                      <img src={bmw} width="80px" alt="weddingIcon" />
                      <strong className="d-block">Option 4</strong>
                      <small className="d-block">Description of gift</small>
                      <strong>#200k</strong>
                    </div>
                  </div> */}
                  {/* <div className="row col-10 mb-2">
                    <div className="eventItem bg-success col-lg-3 text-center">
                      <img src={bmw} width="80px" alt="weddingIcon" />
                      <strong className="d-block text-dark">Car</strong>
                      <small className="d-block">Description of gift</small>
                      <strong className="text-white">#200k</strong>
                    </div>
                    <div className="eventItem col-lg-3 text-center">
                      <img src={bmw} width="80px" alt="weddingIcon" />
                      <strong className="d-block">Option 2</strong>
                      <small className="d-block">Description of gift</small>
                      <strong>#200k</strong>
                    </div>
                    <div className="eventItem col-lg-3 text-center">
                      <img src={bmw} width="80px" alt="weddingIcon" />
                      <strong className="d-block">Option 3</strong>
                      <small className="d-block">Description of gift</small>
                      <strong>#200k</strong>
                    </div>
                    <div className="eventItem col-lg-3 text-center">
                      <img src={bmw} width="80px" alt="weddingIcon" />
                      <strong className="d-block">Option 4</strong>
                      <small className="d-block">Description of gift</small>
                      <strong>#200k</strong> 
                    </div>
                  </div> */}
                </div>
              </div>

              <div className="d-flex justify-content-around p-2">
                <button
                  to=""
                  onClick={this.back}
                  className="btn btn-light rounded-pill px-5"
                >
                  Back
                </button>
                <button
                  to=""
                  // onClick={this.next}
                  onClick={this.handleGiftSubmit}
                  className="btn btn-dark rounded-pill px-5"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default About;
