import React, { Component } from "react";
import { Link } from "react-router-dom";
import sabigift from "../images/landing/sabigift.png";
import { Steps } from "antd";
import {ProductConsumer} from '../Context'
import { Form, Button, Col } from "react-bootstrap";

const { Step } = Steps;

export default class getstarted extends Component {
  constructor(props) {
        super(props);
        this.state = {
          formField : {},
         
      }
      this.changeHandler = this.changeHandler.bind(this);
        // const onFinish = values => {
        //     console.log('Received values of form: ', values);
        //   };
      };
      changeHandler (e){
        let formField = this.state.formField;
          formField[e.target.name] = e.target.value;
          this.setState({
            formField,
          });
          console.log(formField)
        };





  render() {
    return (
      <ProductConsumer>
        {value=>(
        <div className="container-fluid">
          <div className="row">
            <div
              className="col-4 d-none d-lg-flex align-items-center justify-content-center leftSignUp"
              style={{height: "100vh",opacity:'1' }}
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
                {value.currentIndex === 2 && (
                  <div>
                    {value.questions[value.currentIndex]
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
                          name='noOfGuest'
                          onChange={(e) => value.birthdayHandleChange(e)}
                          placeholder="Number of guest"
                        />
                        {value.currentIndex === 0 && (
                          <Button
                            type="submit"
                            className="p-2 rounded-pill btn-outline-light"
                            onClick={(e) => value.mapValueAndNext(e)}
                            style={{ background: "#AAAAAA" }}
                          >
                            GET STARTED
                          </Button>
                        )}
                        {value.currentIndex > 0 && (
                          <Button
                            type="submit"
                            className="px-4 rounded-pill btn-outline-light"
                            onClick={(e) => value.mapValueAndNext(e)}
                            style={{ background: "#AAAAAA" }}
                          >
                            Next
                          </Button>
                        )}
                      </form>
                    </div>
                  </div>
                )}
                {value.currentIndex !== 2 && value.currentIndex !== 3 && (
                  <div>
                    {value.questions[value.currentIndex]
                      .split("\n")
                      .map((text, index) => (
                        <h2 key={index}>{text}</h2>
                      ))}
                    {/* <h2>Yay, we love weddings! <br/>First off ... what's your name?</h2> */}
                    <div className="mt-4">
                      <form>
                        <input
                          className="p-2"
                          onChange={(e) => value.birthdayHandleChange(e)}
                          type="text"
                          placeholder="Enter "
                        />
                        {value.currentIndex === 0 && (
                          <Button
                            type="submit"
                            className="p-2 rounded-pill btn-outline-light"
                            onClick={(e) => value.mapValueAndNext(e)}
                            style={{ background: "#AAAAAA" }}
                          >
                            GET STARTED
                          </Button>
                        )}
                        {value.currentIndex > 0 && (
                          <Button
                            type="submit"
                            className="px-4 rounded-pill btn-outline-light"
                            onClick={(e) => value.mapValueAndNext(e)}
                            style={{ background: "#AAAAAA" }}
                          >
                            Next
                          </Button>
                        )}
                      </form>
                    </div>
                  </div>
                )}
                
                {value.currentIndex === 3 && (
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
                          type="password" 
                          placeholder="*******" />
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
                          name='confirmPassword'
                            onChange={(e) => value.handlerChange(e)}
                            type="password"
                            placeholder="*********"
                          />
                        </Form.Group>
                      </Form.Row>
                      <Form.Group id="formGridCheckbox">
                        <Form.Check
                          type="checkbox"
                          label="I have read the Privacy Policy and agree to the Terms of Service."
                        />
                      </Form.Group>
                    </Form>
                  </div>
                )}
              </div>
              <div className="text-center">
                {value.currentIndex >= 0 && value.currentIndex <= 2 && (
                  <Button
                    type="submit"
                    onClick={() => value.goBack()}
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
                {value.currentIndex === 3 && (
                  <div className=" d-flex justify-content-around">
                    <span>Already a member? Log in</span>
                    <Link to='/about'
                      type="submit"
                      //   onClick={() => this.goBack()}
                      className="px-5 btn-outline-dark"
                      style={{
                        background: "#AAAAAA",
                        border: "2px solid #DDDDDD",
                        borderRadius: "50px",
                      }}
                    >
                      SIGN UP
                    </Link>{" "}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        )}
      </ProductConsumer>
    );
  }
}
