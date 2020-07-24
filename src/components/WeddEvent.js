import React, { Component } from "react";
import { Link } from "react-router-dom";
import sabigift from "../images/landing/sabigift.png";
import { Steps } from "antd";
import { Form, Button, Col } from "react-bootstrap";

const { Step } = Steps;

export default class getstarted extends Component {
  constructor() {
    super();
    this.state = {
      questions: [
        "Yay, we love weddings! \n First off ... what's your name?",
        "Who's your lucky spouse to be?",
        " \n when is your Special day?",
        "How many guests are you inviting?",
      ],
      answers: ["", "", "", ""],
      firstOff: "",
      luckySpouse: "",
      specialDay: "",
      noOfGuests: 0,
      currentIndex: 0,
      formValue: "",
      button: "GET STARTED",
    };
  }
  mapValueAndNext = () => {
    console.log(this.state.formValue);
    console.log(this.state.currentIndex);
    let value = this.state.formValue;
    let currentIndex = this.state.currentIndex;

    if (this.state.currentIndex > 3) {
      this.setState({ currentIndex: currentIndex + 1, button: "Submit" });
      return;
    }

    let answers = this.state.answers;
    answers[currentIndex] = value;
    this.setState({ answers: answers });
    console.dir(this.state);
    this.setState({ currentIndex: currentIndex + 1 });
    this.setState({ formValue: this.state.answers[currentIndex + 1] });

    console.log("current index" + this.state.currentIndex);
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

    if (this.state.currentIndex <= 4) {
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
      <>
        <div className="container-fluid">
          <div className="row">
            <div
              className="col-4 d-flex align-items-center justify-content-center"
              style={{ background: "rgb(114, 10, 10)", height: "100vh" }}
            >
              <div className="mt-5">
                <Link className="" to="/">
                  <img
                    className="homeicon rounded-circle"
                    src={sabigift}
                    alt="SabiGift-Logo"
                  />
                </Link>

                <div>
                  <h4 className="text-white">WHY OUR SERVICES?</h4>
                </div>
                <Steps className="text-white" direction="vertical" current={1}>
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
            <div className="col">
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  color: "#888888",
                  height: "90vh",
                  fontFamily: "arial",
                }}
              >
                {this.state.currentIndex === 2 && (
                  <div>
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
                    {/* <h2>Yay, we love weddings! <br/>First off ... what's your name?</h2> */}
                    <div className="mt-4">
                      <form>
                        <input
                          className="p-2"
                          type="date"
                          placeholder="Enter Name"
                        />
                        {this.state.currentIndex === 0 && (
                          <Button
                            type="submit"
                            className="p-2 rounded-pill btn-outline-light"
                            onClick={(e) => this.mapValueAndNext(e)}
                            style={{ background: "#AAAAAA" }}
                          >
                            GET STARTED
                          </Button>
                        )}
                        {this.state.currentIndex > 0 && (
                          <Button
                            type="submit"
                            className="px-4 rounded-pill btn-outline-light"
                            onClick={(e) => this.mapValueAndNext(e)}
                            style={{ background: "#AAAAAA" }}
                          >
                            Next
                          </Button>
                        )}
                      </form>
                    </div>
                  </div>
                )}
                {this.state.currentIndex !== 2 && this.state.currentIndex < 3 && (
                  <div>
                    {this.state.questions[this.state.currentIndex]
                      .split("\n")
                      .map((text, index) => (
                        <h2>{text}</h2>
                      ))}
                    {/* <h2>Yay, we love weddings! <br/>First off ... what's your name?</h2> */}
                    <div className="mt-4">
                      <form>
                        <input
                          className="p-2"
                          type="text"
                          placeholder="Enter Name"
                        />
                        {this.state.currentIndex === 0 && (
                          <Button
                            type="submit"
                            className="p-2 rounded-pill btn-outline-light"
                            onClick={(e) => this.mapValueAndNext(e)}
                            style={{ background: "#AAAAAA" }}
                          >
                            GET STARTED
                          </Button>
                        )}
                        {this.state.currentIndex > 0 && (
                          <Button
                            type="submit"
                            className="px-4 rounded-pill btn-outline-light"
                            onClick={(e) => this.mapValueAndNext(e)}
                            style={{ background: "#AAAAAA" }}
                          >
                            Next
                          </Button>
                        )}
                      </form>
                    </div>
                  </div>
                )}
                {this.state.currentIndex === 3 && (
                  <div>
                    {this.state.questions[this.state.currentIndex]
                      .split("\n")
                      .map((text, index) => (
                        <h2>{text}</h2>
                      ))}
                    {/* <h2>Yay, we love weddings! <br/>First off ... what's your name?</h2> */}
                    <div className="mt-4">
                      <form>
                        <input
                          className="p-2"
                          type="text"
                          placeholder="Enter Name"
                        />
                        {this.state.currentIndex === 0 && (
                          <Button
                            type="submit"
                            className="p-2 rounded-pill btn-outline-light"
                            onClick={(e) => this.mapValueAndNext(e)}
                            style={{ background: "#AAAAAA" }}
                          >
                            GET STARTED
                          </Button>
                        )}
                        {this.state.currentIndex > 0 && (
                          <Button
                            type="submit"
                            className="px-4 rounded-pill btn-outline-light"
                            onClick={(e) => this.mapValueAndNext(e)}
                            style={{ background: "#AAAAAA" }}
                          >
                            Next
                          </Button>
                        )}
                      </form>
                    </div>
                  </div>
                )}
                {this.state.currentIndex === 4 && (
                  <div className="">
                    <h2>
                      Good News! You can create <br />a free registry on
                      SabiGifts.
                    </h2>
                    <h2>Let's create your account.</h2>

                    <Form className="">
                      <Form.Row>
                        <Form.Group as={Col} controlId="formEmail">
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter Email Address"
                          />
                          <Form.Control.Feedback type="invalid">
                            Empty
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group as={Col} controlId="formGridPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" placeholder="*******" />
                          <Form.Control.Feedback type="invalid">
                            Empty
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridConfirm">
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control.Feedback type="invalid">
                            Empty
                          </Form.Control.Feedback>
                          <Form.Control
                            type="password"
                            placeholder="*********"
                          />
                        </Form.Group>
                      </Form.Row>
                      <Form.Group id="formGridCheckbox">
                        <Form.Check type="checkbox" label="I have read the Privacy Policy and agree to the Terms of Service." />
                      </Form.Group>

                    </Form>
                  </div>
                )}
              </div>
              <div className="text-center">
                {this.state.currentIndex >= 0 && this.state.currentIndex <= 3 && (<Button
                  type="submit"
                  onClick={() => this.goBack()}
                  className="px-5 btn-outline-dark"
                  style={{
                    background: "#ffffff",
                    border: "2px solid #DDDDDD",
                    borderRadius: "50px",
                  }}
                >
                  BACK
                </Button>)}
                {this.state.currentIndex === 4 && ( <div className=' d-flex justify-content-around'>
                    <span>Already a member? Log in</span>
                    <Button
                  type="submit"
                //   onClick={() => this.goBack()}
                  className="px-5 btn-outline-dark"
                  style={{
                    background: "#ffffff",
                    border: "2px solid #DDDDDD",
                    borderRadius: "50px",
                  }}
                >
                  SIGN UP
                </Button> </div>)}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
