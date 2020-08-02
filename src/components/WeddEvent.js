import React, { Component } from "react";
import { Link } from "react-router-dom";
import sabigift from "../images/landing/sabigift.png";
import { Steps } from "antd";
import { Form, Button, Col } from "react-bootstrap";
import { ProductConsumer } from "../Context";

const { Step } = Steps;

export default class getstarted extends Component {
  // constructor() {
    // super();
    // this.state = {
      // wedingwedingweddingQuestions: [
      //   "Yay, we love weddings! \n First off ... what's your name?",
      //   "Who's your lucky spouse to be?",
      //   "Hey \n when is your Special day?",
      //   "How many guests are you inviting?",
      // ],
      // weddinganswers: ["", "", "", ""],
      // firstOff: "",
      // luckySpouse: "",
      // specialDay: "",
      // noOfGuests: 0,
      // weddingcurrentIndex: 0,
      // weddingformValue: "",
      // eventDate : '',
      // formField : {},
    // };
    // this.handleChange = this.handleChange.bind(this);
    // this.dateChange = this.dateChange.bind(this);

  // }
  // handleChange(e) {
  //   e.preventDefault();
  //   let formField = this.state.formField;
  //   formField[e.target.name] = e.target.value;
  //   this.setState({
  //     formField,
  //   });
  //   console.log(formField)
  // }
  //  dateChange(date, dateString) {
  //   this.setState({eventDate: dateString});
  //   console.log(date, dateString);}

  // mapEventValueAndNext = (e) => {
  //   e.preventDefault();
  //   console.log(this.state.weddingformValue);
  //   console.log(this.state.weddingcurrentIndex);
  //   let value = this.state.weddingformValue;
  //   let weddingcurrentIndex = this.state.weddingcurrentIndex;

  //   if (this.state.weddingcurrentIndex > 3) {
  //     this.setState({ weddingcurrentIndex: weddingcurrentIndex + 1});
  //     return;
  //   }

  //   let weddinganswers = this.state.weddinganswers;
  //   weddinganswers[weddingcurrentIndex] = value;
  //   this.setState({ weddinganswers: weddinganswers });
  //   // console.dir(this.state);
  //   console.log(weddinganswers);
  //   this.setState({ weddingcurrentIndex: weddingcurrentIndex + 1 });
  //   this.setState({ weddingformValue: this.state.weddinganswers[weddingcurrentIndex + 1] });

  //   console.log("current index" + this.state.weddingcurrentIndex);
  // };

  // goBackbtn = () => {
  //   // // console.log(this.state);
  //   // console.log("current index " + this.state.weddingcurrentIndex);
  //   // console.log(
  //   //   "current index " + this.state.weddinganswers[this.state.weddingcurrentIndex - 1]
  //   // );
  //   let weddingformValue = this.state.weddinganswers[this.state.weddingcurrentIndex - 1];
  //   if (this.state.weddingcurrentIndex <= 0) {
  //     return;
  //   }

  //   if (this.state.weddingcurrentIndex <= 4) {
  //     this.setState({ weddingcurrentIndex: this.state.weddingcurrentIndex - 1 });
  //     this.setState({ weddingformValue: weddingformValue });
  //     console.log(this.state.weddingformValue);
  //   }

    // const onFinish = values => {
    //     console.log('Received values of form: ', values);
    //   };
  
  render() {
    return (
      <ProductConsumer>
        {value=>(
        <div className="container-fluid">
          <div className="row">
            <div
              className="col-4 d-none d-lg-flex align-items-center justify-content-center"
              style={{ background: "rgb(114, 10, 10)", height: "100vh",opacity:'1' }}
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
                {value.weddingcurrentIndex === 2 && (
                  <div>
                    {( 
                      value.weddinganswers[0] +" " +
                      "and " +
                      value.weddinganswers[1] +
                      value.weddingQuestions[2]
                    )
                      .split("\n")
                      .map((text, index) => (
                        <h2 key={index}>{text}</h2>
                      ))}
                    {/* <h2>Yay, we love weddings! <br/>First off ... what's your name?</h2> */}
                    <div className="mt-4">
                      <form>
                      <input
                          className="p-2"
                          type="text"
                          onChange={(e) => value.weddingHandleChange(e)}
                          placeholder="yyyy-mm-dd"
                          required
                        />
                        {/* <DatePicker onChange={this.dateChange}/> */}
                        {value.weddingcurrentIndex === 0 && (
                          <Button
                            type="submit"
                            className="p-2 rounded-pill btn-outline-light"
                            onClick={(e) => value.mapEventValueAndNext(e)}
                            style={{ background: "#AAAAAA" }}
                          >
                            GET STARTED
                          </Button>
                        )}
                        {value.weddingcurrentIndex > 0 && (
                          <Button
                            type="submit"
                            className="px-4 rounded-pill btn-outline-light"
                            onClick={(e) => value.mapEventValueAndNext(e)}
                            style={{ background: "#AAAAAA" }}
                          >
                            Next
                          </Button>
                        )}
                      </form>
                    </div>
                  </div>
                )}
                {value.weddingcurrentIndex !== 2 && value.weddingcurrentIndex < 3 && (
                  <div>
                    {value.weddingQuestions[value.weddingcurrentIndex]
                      .split("\n")
                      .map((text, index) => (
                        <h2 key={index}>{text}</h2>
                      ))}
                    {/* <h2>Yay, we love weddings! <br/>First off ... what's your name?</h2> */}
                    <div className="mt-4">
                      <form>
                        <input
                          className="p-2"
                          type="text"
                          onChange={(e) => value.weddingHandleChange(e)}
                          placeholder="Enter Name"
                          required
                        />
                        {value.weddingcurrentIndex === 0 && (
                          <Button
                            type="submit"
                            className="p-2 rounded-pill btn-outline-light"
                            onClick={(e) => value.mapEventValueAndNext(e)}
                            style={{ background: "#AAAAAA" }}
                          >
                            GET STARTED
                          </Button>
                        )}
                        {value.weddingcurrentIndex > 0 && (
                          <Button
                            type="submit"
                            className="px-4 rounded-pill btn-outline-light"
                            onClick={(e) => value.mapEventValueAndNext(e)}
                            style={{ background: "#AAAAAA" }}
                          >
                            Next
                          </Button>
                        )}
                      </form>
                    </div>
                  </div>
                )}
                {value.weddingcurrentIndex === 3 && (
                  <div>
                    {value.weddingQuestions[value.weddingcurrentIndex]
                      .split("\n")
                      .map((text, index) => (
                        <h2 key={index}>{text}</h2>
                      ))}
                    {/* <h2>Yay, we love weddings! <br/>First off ... what's your name?</h2> */}
                    <div className="mt-4">
                      <form>
                        <input
                          className="p-2"
                          type="text"
                          name='expectedGuest'
                          onChange={(e) => value.weddingHandleChange(e)}
                          placeholder="Enter Number of Guest"
                          required
                        />
                        {value.weddingcurrentIndex === 0 && (
                          <Button
                            type="submit"
                            className="p-2 rounded-pill btn-outline-light"
                            onClick={(e) => value.mapEventValueAndNext(e)}
                            style={{ background: "#AAAAAA" }}
                          >
                            GET STARTED
                          </Button>
                        )}
                        {value.weddingcurrentIndex > 0 && (
                          <Button
                            type="submit"
                            className="px-4 rounded-pill btn-outline-light"
                            onClick={(e) => value.mapEventValueAndNext(e)}
                            style={{ background: "#AAAAAA" }}
                          >
                            Next
                          </Button>
                        )}
                      </form>
                    </div>
                  </div>
                )}
                {value.weddingcurrentIndex === 4 && (
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
                            name='email'
                            type="email"
                            onChange={(e) => value.handlerChange(e)}
                            placeholder="Enter Email Address"
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Empty
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group as={Col} controlId="formGridPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            name='password'
                            onChange={(e) => value.handlerChange(e)}
                          type="password" placeholder="*******" />
                          required
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
                            name='confirm'
                            onChange={(e) => value.handlerChange(e)}
                            type="password"
                            placeholder="*********"
                            required
                          />
                        </Form.Group>
                      </Form.Row>
                      <Form.Group id="formGridCheckbox">
                        <Form.Check
                          type="checkbox"
                          label="I have read the Privacy Policy and agree to the Terms of Service."
                          required
                        />
                      </Form.Group>
                    </Form>
                  </div>
                )}
              </div>
              <div className="text-center">
                {value.weddingcurrentIndex >= 0 && value.weddingcurrentIndex <= 3 && (
                  <Button
                    type="submit"
                    onClick={() =>value.goBackbtn()}
                    className="px-5 btn-outline-dark"
                    style={{
                      background: "#ffffff",
                      border: "2px solid #DDDDDD",
                      borderRadius: "50px",
                    }}
                  >
                    BACK
                  </Button>
                )}
                {value.weddingcurrentIndex === 4 && (
                  <div className=" d-flex justify-content-around">
                    <span>Already a member? Log in</span>
                    <Link
                    to='/about'
                      type="submit"
                      //   onClick={() => this.goBackbtn()}
                      className="px-5 py-3 btn-outline-dark"
                      style={{
                        background: "#AAAAAA",
                        border: "2px solid #DDDDDD",
                        borderRadius: "50px",
                      }}
                    >
                      SIGN UP
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>)}
      </ProductConsumer>
    );
  }
}
