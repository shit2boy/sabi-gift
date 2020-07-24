import React, { Component } from "react";
import { Link } from "react-router-dom";
import sabigift from "../images/landing/sabigift.png";
import {  Steps } from "antd";
import { Col,Form} from "react-bootstrap";
// import axios from 'axios';
const { Step } = Steps;

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      questions: [
        "Yay, Someone is ready to \n celebrate ! Let's quickly get you started.",
        "Hello John, when is your \n birthday celebration \n coimng up?",
        " About how many guests are \n you inviting ?",
      ],
      answers: ["", "", "", ],
      firstOff: "",
      specialDay: "",
      noOfGuests: 0,
      currentIndex: 0,
      formValue: "",
    };
  }
  mapValueAndNext = () => {
    console.log(this.state.formValue);
    console.log(this.state.currentIndex);
    let value = this.state.formValue;
    let currentIndex = this.state.currentIndex;

    if (this.state.currentIndex > 2) {
      this.setState({ currentIndex: currentIndex + 1, });
      return;
    }

    let answers = this.state.answers;
    answers[currentIndex] = value;
    this.setState({ answers: answers });
    console.dir(this.state);
    this.setState({ currentIndex: currentIndex + 1 });
    this.setState({ formValue: this.state.answers[currentIndex + 1] });
  };

  goBack = () => {
    console.log(this.state);
    console.log("current index " + this.state.currentIndex);
    console.log(
      "current index " + this.state.answers[this.state.currentIndex - 1]
    );
    let formValue = this.state.answers[this.state.currentIndex - 1];
    if (this.state.currentIndex <= 0) {
      return;
    }

    if (this.state.currentIndex <= 3) {
      this.setState({ currentIndex: this.state.currentIndex - 1 });
      this.setState({ formValue: formValue });
      console.log(this.state.formValue);
    }

    // const onFinish = values => {
    //     console.log('Received values of form: ', values);
    //   };
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className=" col-4 d-flex align-items-center justify-content-center leftSignUp">
            <div className='mt-5'>
                <Link to="/">
                  <img
                    className="homeicon rounded-circle"
                    src={sabigift}
                    alt="SabiGift-Logo"
                  />
                </Link>
                <h4 className="text-white">WHY OUR SERVICES?</h4>
                <Steps
                className="text-white"
                direction="vertical"
                current={1}
                >
                <Step
                  color=" white"
                  title="Lorem ipsum lorem ipsum"
                  description="Lorem ipsum lorem sioe"
                />
                <Step
                  title="Lorem ipsum lorem ipsum"
                  description="Lorem ipsum lorem sioe"
                />
                <Step
                  title="Lorem ipsum lorem ipsum"
                  description="Lorem ipsum lorem sioe"
                />
                <Step
                  title="Lorem ipsum lorem ipsum"
                  description="Lorem ipsum lorem sioe"
                />
                <Step
                  title="Lorem ipsum lorem ipsum"
                  description="Lorem ipsum lorem sioe"
                />
              </Steps>
              </div>
          </div>
          <div className="col-8 d-flex align-items-center justify-content-center rightSignUp">
            <div className="">
              {this.state.currentIndex === 2 && (
                <div >
                  {(
                    this.state.answers[0] +
                    " " +
                    this.state.answers[1] +
                    this.state.questions[2]
                  )
                    .split("\n")
                    .map((text, index) => (
                      <h2>{text}</h2>
                    ))}
                  <div className="">
                    <input
                      className="p-2"
                      type="date"
                      id="inputField"
                      value={this.state.formValue}
                      placeholder="Enter Name"
                      required
                      onChange={(e) =>
                        this.setState({ formValue: e.target.value })
                      }
                    />
                    {this.state.currentIndex === 0 && (
                      <button
                        className="btn btn-dark rounded-pill ml-4 px-3"
                        onClick={(e) => this.mapValueAndNext(e)}
                      >
                        GET STARTED
                      </button>
                    )}

                    {this.state.currentIndex > 0 && (
                      <button
                        className="btn btn-dark rounded-pill ml-4 px-3"
                        onClick={(e) => this.mapValueAndNext(e)}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}
              {this.state.currentIndex !== 2 && this.state.currentIndex !== 3 && (
                <div>
                  {this.state.questions[this.state.currentIndex]
                    .split("\n")
                    .map((text, index) => (
                      <h2>{text}</h2>
                    ))}
                  <div className="">
                    <input
                      className="p-2"
                      type="text"
                      id="inputField"
                      value={this.state.formValue}
                      placeholder="Enter Name"
                      required
                      onChange={(e) =>
                        this.setState({ formValue: e.target.value })
                      }
                    />
                    {this.state.currentIndex === 0 && (
                      <button
                        className="btn btn-dark rounded-pill ml-4 px-3"
                        onClick={(e) => this.mapValueAndNext(e)}
                      >
                        GET STARTED
                      </button>
                    )}

                    {this.state.currentIndex > 0 && (
                      <button
                        className="btn btn-dark rounded-pill ml-4 px-3"
                        onClick={(e) => this.mapValueAndNext(e)}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}

              {this.state.currentIndex === 3 && 
                <div className="mt-5">
                  <div className="">
                    <h2>
                      Good News! You can create <br/>a free registry on
                      SabiGifts.
                    </h2>
                    <h2>Let's create your account.</h2>

                     <Form className="">
                      <Form.Row>
                        <Form.Group as={Col} controlId="formEmail">
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control type="email" placeholder="Enter Email Address" />
                          <Form.Control.Feedback type='invalid'>Empty</Form.Control.Feedback>
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group as={Col} controlId="formGridPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" placeholder="*******" />
                          <Form.Control.Feedback type='invalid'>Empty</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridConfirm">
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control.Feedback type='invalid'>Empty</Form.Control.Feedback>
                          <Form.Control
                            type="password"
                            placeholder="*********"
                          />
                        </Form.Group>
                      </Form.Row>
                        <Form.Check type="checkbox" label="I have read the Privacy Policy and agree to the Terms of Service." />
                          
                      
                    </Form> 

                    <Link
                      to="/about"
                      className=" text-link btn btn-dark rounded-pill px-5"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              }

              <div className="">
                {this.state.currentIndex < 4 && (
                  <div style={{ paddingTop: "40vh" }}>
                    <button
                      onClick={() => this.goBack()}
                      className=" btn btn-light rounded-pill px-5"
                    >
                      Back
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
