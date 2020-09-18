import React, { Component } from "react";
import { Form, Col, Table, Alert, Spinner } from "react-bootstrap";
import sabigift from "../images/landing/sabigift.png";
import { Link } from "react-router-dom";
import axios from "axios";
import util from "../util/util";
import { StateContext } from "../Context";

export default class CheckoutForm extends Component {
  static contextType = StateContext;

  constructor() {
    super();
    this.state = {
      formField: {},
      customerId: false,
      errors: {},
      cartIds: [],
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    let formField = this.state.formField;
    formField[e.target.name] = e.target.value;
    this.setState({
      formField,
    });
  }

  handlePost = async () => {
    this.setState({ loading: true });
    let formField = this.state.formField;
    let customer = new FormData();
    let authorization_url;
    let reference;
    customer.append("first_name", formField["firstName"]);
    customer.append("last_name", formField["lastName"]);
    customer.append("mobile", formField["phone"]);
    customer.append("email", formField["email"]);
    customer.append("city", formField["city"]);
    customer.append("street_address", formField["address"]);
    customer.append("state", formField["state"]);
    customer.append("zip_code", formField["zip"]);

    try {
      var res = await axios.post(`${util.API_BASE_URL}customers/`, customer);
      console.log(res.data);
      if (res.data !== undefined) {
        window.localStorage.setItem("customer_id", res.data.id);
        this.setState({ customerId: true });
        let newArr = window.localStorage.cartList;
        const customer_details = {
          customer_id: Number(window.localStorage.customer_id),
          carts: JSON.parse(newArr),
        };

        axios
          .post(`${util.API_BASE_URL}init-payment/`, customer_details)
          .then((res) => {
            authorization_url = res.data.paystack.data.authorization_url;
            reference = res.data.paystack.data.reference;
            return {
              ref_code: reference,
              items: JSON.parse(newArr),
              customers: window.localStorage.customer_id,
            };
          })
          .then((orderItemDetails) => {
            axios
              .post(`${util.API_BASE_URL}make-order/`, orderItemDetails)
              .then((res) => {
                // console.log(res.data);
                if (res !== undefined) {
                  this.setState({ loading: false });
                  window.location.href = authorization_url;
                }
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (err) {
      // Handle Error Here
      console.log(err);
      this.setState({ loading: false });
      Alert("Please check your connection and try again");
    }
  };

  validateForm = () => {
    let formField = this.state.formField;
    let errors = {};
    let formIsValid = true;
    if (!formField["firstName"]) {
      formIsValid = false;
      errors["firstName"] = "*Cannot be empty";
    }
    if (typeof formField["firstName"] !== "undefined") {
      if (!formField["firstName"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["firstName"] = "*Please enter alphabet characters only.";
      }
    }
    if (!formField["lastName"]) {
      formIsValid = false;
      errors["lastName"] = "*Cannot be empty";
    }
    if (typeof formField["lastName"] !== "undefined") {
      if (!formField["lastName"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["lastName"] = "*Please enter alphabet characters only.";
      }
    }
    if (!formField["email"]) {
      formIsValid = false;
      errors["email"] = "*Please enter your email-ID.";
    }

    if (typeof formField["email"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(formField["email"])) {
        formIsValid = false;
        errors["email"] = "*Please enter valid email-ID.";
      }
    }
    if (!formField["phone"]) {
      formIsValid = false;
      errors["phone"] = "*Please enter your mobile no.";
    }

    if (typeof formField["phone"] !== "undefined") {
      if (!formField["phone"].match(/^[0-9]{11}$/)) {
        formIsValid = false;
        errors["phone"] = "*Please enter valid mobile no.";
      }
    }
    // if (!formField["address"]) {
    //   formIsValid = false;
    //   errors["address"] = "*Cannot be empty";
    // }
    if (!formField["address"]) {
      formIsValid = false;
      errors["address"] = "Cannot be empty";
    }
    // if (!formField["zip"]) {
    //   formIsValid = false;
    //   errors["zip"] = "Cannot be empty";
    // }
    if (!formField["city"]) {
      formIsValid = false;
      errors["city"] = "*Cannot be empty";
    }
    if (!formField["state"]) {
      formIsValid = false;
      errors["state"] = "*Cannot be empty";
    }
    this.setState({ errors: errors });
    return formIsValid;
  };

  handleSubmit(event) {
    event.preventDefault();
    if (this.validateForm()) {
      this.handlePost();
    }
  }

  render() {
    return (
      <>
        <div className=" container-fluid mb-5">
          <div className="row">
            <Link to="/Dashboard" className="mt-3">
              <img src={sabigift} width="70px" alt="logo" />
            </Link>
          </div>
          <div className="row col">
            <h3>Check out</h3>
          </div>
          <div className="row justify-content-center">
            <div
              className="col-7 mx-auto p-3"
              style={{ border: "1px solid #707070", borderRadius: "30px" }}
            >
              <Form onSubmit={this.handleSubmit}>
                <Form.Row>
                  <Form.Group as={Col} controlId="Fname">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      onChange={this.handleChange}
                      name="firstName"
                      required
                      type="text"
                      placeholder="First name"
                    />
                    <span style={{ color: "red", font: "italic" }}>
                      {this.state.errors["firstName"]}
                    </span>
                  </Form.Group>
                  <Form.Group as={Col} controlId="Lname">
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control
                      onChange={this.handleChange}
                      name="lastName"
                      required
                      type="text"
                      placeholder="Last name"
                    />
                    <span style={{ color: "red", font: "italic" }}>
                      {this.state.errors["lastName"]}
                    </span>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      onChange={this.handleChange}
                      name="phone"
                      required
                      type="tel"
                      placeholder="0000-0000"
                    />
                    <span style={{ color: "red", font: "italic" }}>
                      {this.state.errors["phone"]}
                    </span>
                  </Form.Group>
                  <Form.Group as={Col} controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      onChange={this.handleChange}
                      name="email"
                      required
                      type="email"
                      placeholder="Enter Email Address"
                    />
                    <span style={{ color: "red" }}>
                      {this.state.errors["email"]}
                    </span>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="label">
                    <Form.Label>Street Address</Form.Label>
                    <Form.Control
                      onChange={this.handleChange}
                      name="address"
                      type="text"
                      placeholder="Address"
                    />
                    <span style={{ color: "red", font: "italic" }}>
                      {this.state.errors["address"]}
                    </span>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      onChange={this.handleChange}
                      name="city"
                      type="text"
                      placeholder="City"
                      required
                    />
                    <span style={{ color: "red", font: "italic" }}>
                      {this.state.errors["city"]}
                    </span>
                  </Form.Group>
                  <Form.Group as={Col} controlId="state">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      onChange={this.handleChange}
                      name="state"
                      type="text"
                      placeholder="State"
                      required
                    />
                    <span style={{ color: "red", font: "italic" }}>
                      {this.state.errors["state"]}
                    </span>
                  </Form.Group>
                  <Form.Group as={Col} controlId="Zip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                      onChange={this.handleChange}
                      name="zip"
                      type="text"
                      placeholder="33789"
                    />
                    {/* <span style={{ color: "red",font : 'italic' }}>
                            {this.state.errors["zip"]}
                          </span> */}
                  </Form.Group>
                </Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Gift info</Form.Label>
                  <Form.Control as="textarea" rows="3" placeholder="Message" />
                </Form.Group>
              </Form>
            </div>
            <div
              className="col-sm-3 mx-auto"
              style={{
                border: "2px solid #e6e6e6",
                background: "#f2f2f2",
                height: "300px",
                opacity: "1",
              }}
            >
              <Table className="p-2 center ">
                <tbody>
                  <tr>
                    <td>Sub-total</td>
                    <td>#{window.localStorage.getItem("sum")}</td>
                  </tr>
                  <tr>
                    <td>Shipping</td>
                    <td>#0</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td>#{window.localStorage.getItem("sum")}</td>
                  </tr>
                </tbody>
              </Table>
              <div className="text-center">
                {/* <button onClick={this.handleSubmit}>pay</button> */}
                {!this.state.loading && (
                  <span
                    onClick={this.handleSubmit}
                    type="button"
                    className="p-3 orderBtn"
                  >
                    Place Order
                  </span>
                )}
                {this.state.loading && (
                  <span type="button" className="p-3 orderBtn">
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Loading...
                  </span>
                )}

                {/* {this.state.customerId ? (
                  <PaystackButton
                    className="p-3 orderBtn"
                    {...componentProps}
                  />
                ) : (
                  <span
                    onClick={this.handleSubmit}
                    type="button"
                    className="p-3 orderBtn"
                  >
                    Place Order
                  </span>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
