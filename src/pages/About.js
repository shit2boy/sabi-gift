import React, { Component } from "react";
import { Link } from "react-router-dom";
import sabigift from "../images/landing/sabigift.png";
import { Form, Col } from "react-bootstrap";
// import bmw from "../images/landing/bmw.png";
import { Steps } from "antd";
import { StateContext } from "../Context";
import axios from "axios";
import util from "../util/util";
// import Spinner from "../components/spinner";
// import LogOut from "../components/LogOut";

const { Step } = Steps;

export class About extends Component {
  static contextType = StateContext;
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      street: "",
      city: "",
      Phone: "",
      checked: [],
      state: "",
      eventType: "",
      title: "",
      currentIndex: 0,
      signUpResponse: { successful: false, message: "" },
      registryType: [],
      isLoggedIn: false,
      errorMessage: "",
      errors: {},
      border: " ",
      event_date: "",
      eventId: null,
      selected: false,
      selectedgift: [],
      spouseName: "",
      backgroundColor: "",
      bestSellingItems: [],
      selectedRegistryType: [],
      registryCategories: [],
      loading: false,
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
  // handleSelectedGiftType = (e, id) => {
  // this.setState({
  // selectedGiftType: true,
  // });
  // console.log(this.state.selectedGiftType);
  // };
  handleSelectedGiftType = (e) => {
    let checkedoption = this.state.checked;
    if (this.state.checked.indexOf(e.target.id) === -1) {
      checkedoption.push(e.target.id);
      this.setState({ checked: checkedoption });
    } else {
      checkedoption.splice(this.state.checked.indexOf(e.target.id), 1);
      this.setState({ checked: checkedoption });
    }
    // console.log(this.state.checked);
    // };
    this.setState({
      selectedGiftType: true,
    });
    // console.log(this.state.selectedGiftType);
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
    // console.log("gifts", this.state.selectedgift);
  };

  validateForm() {
    // let formField = this.state.formField;
    let errors = {};
    let formIsValid = true;
    if (!this.state.firstName) {
      formIsValid = false;
      errors["firstName"] = "*This field is required.";
    }
    if (typeof this.state.firstName !== "undefined") {
      if (!this.state.firstName.match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["firstName"] = "*Please enter alphabet characters only.";
      }
    }
    if (!this.state.lastName) {
      formIsValid = false;
      errors["lastName"] = "*This field is required.";
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
    if (!this.state.address) {
      formIsValid = false;
      errors["address"] = "*This field is required.";
    }
    // if (!formField["street"]) {
    //   formIsValid = false;
    //   errors["street"] = "Cannot be empty";
    // }
    if (!this.state.city) {
      formIsValid = false;
      errors["city"] = "*This field is required.";
    }
    if (!this.state.state) {
      formIsValid = false;
      errors["state"] = "*This field is required.";
    }
    this.setState({ errors: errors });
    return formIsValid;
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.validateForm()) {
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
          // console.log(response);
          if (response.status === 200)
            window.localStorage.setItem("userId", response.data.id);
          window.localStorage.setItem("event_type", response.data.event_type);
          window.localStorage.setItem("event_date", response.data.event_date);
          window.localStorage.setItem("name", response.data.first_name);
          // console.log(response);
          // alert(response.statusText);
          this.setState({
            currentIndex: this.state.currentIndex + 1,
            spouseName: response.data.spouse_name,
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
    axios
      .get(`${util.API_BASE_URL}accounts/profile/`, {
        headers: { Authorization: "Token " + localStorage.getItem("token_id") },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data !== undefined) {
          window.localStorage.setItem("name", res.data.first_name);
          this.setState({ firstName: res.data.first_name });
          if (res.data.completed) {
            this.setState({ currentIndex: 1 });
            window.localStorage.setItem("userId", res.data.id);
            window.localStorage.setItem("event_type", res.data.event_type);
            window.localStorage.setItem("event_date", res.data.event_date);
            window.localStorage.setItem("name", res.data.first_name);
            this.setState({
              spouseName: res.data.spouse_name,
              title: res.data.title,
              event_date: res.data.event_date,
              loading: true,
            });
            console.log(this.state.event_date);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState({ selectedRegistryType: event });
    // let type = this.state.selectedRegistryType;
    // console.log(type);
    axios
      .get(`${util.API_BASE_URL}categories/`, {
        headers: { Authorization: "Token " + localStorage.getItem("token_id") },
      })
      .then((response) => {
        // console.log("regtyp", response);
        if (response.status === 200)
          this.setState({ registryCategories: response.data.results });
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
          let data = response.data.results;
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
      .get(`${util.API_BASE_URL}registries/?best_selling=True`, {
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

  createEvent = async (e) => {
    e.preventDefault();
    let UserEventInfo;
    if (window.localStorage.isLoggedIn === true) {
      UserEventInfo = {
        event_owner: window.localStorage.userId,
        start_date: window.localStorage.evnt_date,
        start_time: "07:00:00",
        event_type: window.localStorage.Type_Event,
        spouse_name: window.localStorage.spouse_Nam,
        poster: "",
        title: `${window.localStorage.name}'s ${window.localStorage.title}`,
      };
    } else {
      UserEventInfo = {
        event_owner: window.localStorage.userId,
        start_date: this.context.event_date,
        start_time: "07:10:00",
        event_type: window.localStorage.event_type,
        spouse_name: this.context.spouseName,
        poster: "",
        title: `${this.context.title}`,
      };
    }
    // console.log(UserEventInfo);
    await axios
      .post(`${util.API_BASE_URL}events/`, UserEventInfo, {
        headers: {
          Authorization: "Token " + localStorage.getItem("token_id"),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          let slug = response.data.slug;
          this.setState({ eventId: response.data.id });
          let event_link = {
            event_link: `https://sabigift.netlify.app/registry/${slug}`,
          };
          axios
            .patch(`${util.API_BASE_URL}events/${slug}/`, event_link, {
              headers: {
                Authorization: "Token " + localStorage.getItem("token_id"),
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            })
            .then((res) => {
              if (res.status === 200) {
                window.localStorage.removeItem("evnt_date");
                window.localStorage.removeItem("Type_Event");
                window.localStorage.removeItem("spouse_Nam");
                window.localStorage.removeItem("evnt_date");
                window.localStorage.removeItem("title");
                // window.location.href = "/manageregistry";
                this.next();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleGiftSubmit = async (event) => {
    event.preventDefault();
    const gift = this.state.selectedgift;
    for (let i = 0; i < gift.length; i++) {
      gift[i] = gift[i].replace("k", "");
      // console.log(gift[i]);
    }
    let gifts = gift.map(Number);

    // console.log(gifts);
    let addeditem = {
      gifts: gifts,
      event: Number(this.state.eventId),
      quantity: 1,
    };
    axios
      .post(`${util.API_BASE_URL}add-registry/`, addeditem, {
        headers: {
          Authorization: "Token " + localStorage.getItem("token_id"),
        },
      })

      .then((res) => {
        // console.log(res.data);
        if (res.status === 200) {
          window.location.href = "/manageregistry";
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
    }
    this.setState({ currentIndex: this.state.currentIndex + 1 });
    // console.log("clicked");
  };
  render() {
    const containerStyle = {
      // border: "1px solid",
      backgroundColor: "#ffffff",
      cursor: "pointer",
    };
    const unmarkedStyle = {
      backgroundColor: "#f7f7f7",
      cursor: "pointer",
    };
    const unmarkedgiftStyle = {
      // backgroundColor: "red",
      cursor: "pointer",
    };
    // if (this.state.loading) return <Spinner />;
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
                            // value={this.state.formField['firstName']}
                            placeholder="E.g Jimi"
                            pattern="[A-Za-z]"
                            value={this.state.firstName}
                            required
                          />
                          <span
                            style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
                          >
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
                            placeholder="E.g Fola"
                            pattern="[A-Za-z]"
                            required
                          />
                          <span
                            style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
                          >
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
                            placeholder="E.g 0000 0000-0000"
                          />
                          <span
                            style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
                          >
                            {this.state.errors["Phone"]}
                          </span>
                        </Form.Group>

                        <Form.Group as={Col} controlId="AltPhone">
                          <Form.Label>Alt Phone</Form.Label>
                          <Form.Control
                            onChange={this.handleChange}
                            value={this.state.AltPhone}
                            type="tel"
                            name="AltPhone"
                            placeholder="E.g 0000-0000-0000"
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
                          value={this.state.address}
                          placeholder="E.g 14b wole Ariyo street"
                        />
                        <span
                          style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
                        >
                          {this.state.errors["address"]}
                        </span>
                      </Form.Group>
                      <Form.Row>
                        <Form.Group as={Col} controlId="City">
                          <Form.Label>City</Form.Label>
                          <Form.Control
                            onChange={this.handleChange}
                            value={this.state.city}
                            type="text"
                            name="city"
                            placeholder="E.g Lekki"
                          />
                          <span
                            style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
                          >
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
                            placeholder="E.g State"
                          />
                          <span
                            style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
                          >
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
                <div className="col bg-white d-flex justify-content-end">
                  {/* <button
                    type="button"
                    onClick={this.back}
                    className="btn btn-light rounded-pill px-5"
                  >
                    Back
                  </button> */}
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
                        <div
                          id={"dd" + type.id}
                          onClick={this.handleSelectedGiftType}
                          key={type.id}
                          style={
                            this.state.checked.indexOf("dd" + type.id) > -1
                              ? containerStyle
                              : unmarkedStyle
                          }
                          // style={
                          //   this.state.selectedGiftType
                          //     ? containerStyle
                          //     : unmarkedStyle
                          // }
                          className="eventItem col-lg-3"
                        >
                          <div id={type.id} className="text-center">
                            <img
                              id={"dd" + type.id}
                              src={type.image}
                              alt={type.name}
                              width="80px"
                            />{" "}
                          </div>
                          <p className="text-center mb-0" id={"dd" + type.id}>
                            {type.name}
                          </p>
                        </div>
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
                  {this.state.selectedGiftType && (
                    <button
                      onClick={this.next}
                      className="btn btn-dark rounded-pill px-5"
                    >
                      Next
                    </button>
                  )}
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
                      What are some things you <br /> enjoy doing together
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
                          onClick={this.context.handleSelectOpt}
                        >
                          <p></p>
                          {/* <div className='text-center'><img src={category.image} alt='weddingIcon' /> </div> */}
                          <p
                            id={"ddd" + category.id}
                            // onClick={this.context.handleSelectOpt}
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
                  {this.context.clicked && (
                    <button
                      onClick={this.next}
                      className="btn btn-dark rounded-pill px-5"
                    >
                      Next
                    </button>
                  )}
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
                    onClick={this.createEvent}
                    className="btn btn-dark rounded-pill px-5"
                  >
                    Complete
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
                    {this.state.bestSellingItems.map((item, index) => (
                      <div
                        id={"k" + item.id}
                        key={index}
                        onClick={this.addedToRegistry}
                        style={
                          this.state.selectedgift.indexOf("k" + item.id) > -1
                            ? containerStyle
                            : unmarkedgiftStyle
                        }
                        className="eventItem col-lg-3 text-center"
                      >
                        <div id={"k" + item.id}>
                          {" "}
                          <img
                            className="rounded-circle"
                            src={item.picture}
                            id={"k" + item.id}
                            width="100px"
                            alt={item.slug}
                          />
                        </div>
                        <strong
                          id={"k" + item.id}
                          className="d-block text-dark"
                        >
                          {item.name}
                        </strong>
                        {/* <small className="d-block">Description of gift</small> */}
                        <strong id={"k" + item.id} className="">
                          #{item.price}
                        </strong>
                      </div>
                    ))}
                  </div>
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
