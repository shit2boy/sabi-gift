import React, { Component } from "react";
import { Link } from "react-router-dom";
import sabigift from "../images/landing/sabigift.png";
import { Steps,DatePicker } from "antd";
import { Form, Button, Col } from "react-bootstrap";
import Login from './Login'
import axios from "axios";
import util from "../util/util";

const { Step } = Steps;

export default class getstarted extends Component {
  constructor() {
        super();
        this.state = {
          questions: [
            "Yay, Someone is ready to \n celebrate ! Let's quickly get you started.",
            " when is your \n birthday celebration \n coimng up?",
            " About how many guests are \n you inviting ?",
          ],
          answers: ["", "", "", ],
          firstOff: "",
          specialDay: "",
          noOfGuests: 0,
          currentIndex: 0,
          formValue: "",
          email : '',
          password:'',
          confirm :'',
          eventDate:'',
          error : '',
          message : '',
          errorMessage : [],
          signUpResponse:{successful:false,},
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dateChange = this.dateChange.bind(this);
    
      }
      handleChange(e) {
        this.setState({ [e.target.name] : e.target.value});
      }

      dateChange(date, dateString) {
        this.setState({eventDate: dateString});
        console.log(date, dateString);
      }

      mapValueAndNext = () => {
        // console.log(this.state.formValue);
        // console.log(this.state.currentIndex);
        let value = this.state.formValue;
        let currentIndex = this.state.currentIndex;
    
        if (this.state.currentIndex > 2) {
          this.setState({ currentIndex: currentIndex + 1});
          return;
        }
    
        let answers = this.state.answers;
        answers[currentIndex] = value;
        this.setState({ answers: answers });
        // console.dir(this.state);
        // console.log(answers);
        this.setState({ currentIndex: currentIndex + 1 });
        this.setState({ formValue: this.state.answers[currentIndex + 1] });
      };
    
      goBack = () => {
        // console.log(this.state);
        // console.log("current index " + this.state.currentIndex);
        // console.log(
        //   "current index " + this.state.answers[this.state.currentIndex - 1]
        // );
        let formValue = this.state.answers[this.state.currentIndex - 1];
        if (this.state.currentIndex <= 0) {
          return;
        }
    
        if (this.state.currentIndex <= 3) {
          this.setState({ currentIndex: this.state.currentIndex - 1 });
          this.setState({ formValue: formValue });
          console.log(this.state.formValue);
        }

        
      };
      handleSubmit(event) {
        event.preventDefault();
        const newUserInfo = new FormData();
        newUserInfo.append('first_name', this.state.answers[0]);
        newUserInfo.append('email', this.state.email);
        newUserInfo.append('password', this.state.password);
        newUserInfo.append('event_type', 'Birthday');
        newUserInfo.append('event_date', this.state.eventDate);
        newUserInfo.append('no_of_guest', this.state.answers[2]);
        newUserInfo.append('photo', '');

        axios.post(`${util.API_BASE_URL}accounts/register/`, newUserInfo, 
        { 'content-type': 'multipart/form-data' })
      .then(response => {
        if (response.status === 200 || response.status === 201){
            console.log(response.statusText);
          this.setState({
            message : `Dear ${this.state.answers[0]},We have sent you an email '${this.state.email}' with your verification link.`})
          // console.log(this.state.message);
        }
        
      })
      .catch(error => {
          console.dir( error);
          if ( error.response.data.Error !==undefined) {
            this.setState({errorMessage: error.response.data.Error});  
          } else{
            this.setState({errorMessage: error.response.data.password});  
            
          }

          console.log(error.response.data.Error);
          console.log(error.response.data.password);
          

      });
      }


  render() {
    return (
      <>
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
                {this.state.currentIndex === 1 && (
                  <div>

                    {("Hello, " +
                      this.state.answers[0] + 
                      this.state.questions[1]
                    )
                      .split("\n")
                      .map((text, index) => (
                        <h2 key={index}>{text}</h2>
                      ))}         
                  
                    <div className="mt-4">
                      <form>

                      <DatePicker required onChange={this.dateChange}/>
                       
                        {this.state.currentIndex === 0 && (
                          <Button
                            type="submit"
                            className="registryBtn p-2 rounded-pill btn-outline-light"
                            onClick={(e) => this.mapValueAndNext(e)}
                            style={{ background: "#AAAAAA" }}
                          >
                            GET STARTED
                          </Button>
                        )}
                        {this.state.currentIndex > 0 && (
                          <Button
                            type="submit"
                            className="registryBtn px-4 rounded-pill btn-outline-light"
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
                { this.state.currentIndex === 0 && (
                  <div>
                    {this.state.questions[this.state.currentIndex]
                      .split("\n")
                      .map((text, index) => (
                        <h2 key={index}>{text}</h2>
                      ))}
                   
                    <div className="mt-4">
                      <form>
                        <input
                        value={this.state.formValue}
                        onChange={(e) =>
                          this.setState({ formValue: e.target.value })}
                          className="p-2"
                          type="text"
                          required
                          placeholder="Enter Name"
                        />
                        {this.state.currentIndex === 0 && (
                          <Button
                            type="submit"
                            className="registryBtn p-2 rounded-pill btn-outline-light"
                            onClick={(e) => this.mapValueAndNext(e)}
                            style={{ background: "#AAAAAA" }}
                          >
                            GET STARTED
                          </Button>
                        )}
                        {this.state.currentIndex > 0 && (
                          <Button
                            type="submit"
                            className="registryBtn px-4 rounded-pill btn-outline-light"
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
                { this.state.currentIndex === 2 && (
                  <div>
                    {this.state.questions[this.state.currentIndex]
                      .split("\n")
                      .map((text, index) => (
                        <h2 key={index}>{text}</h2>
                      ))}

                    <div className="mt-4">
                      <form>
                        <input
                        value={this.state.formValue}
                        onChange={(e) =>
                          this.setState({ formValue: e.target.value })}
                          className="p-2"
                          type="text"
                          placeholder="Number of Guest"
                        />
                        {this.state.currentIndex === 0 && (
                          <Button
                            type="submit"
                            className="registryBtn p-2 rounded-pill btn-outline-light"
                            onClick={(e) => this.mapValueAndNext(e)}
                            style={{ background: "#AAAAAA" }}
                          >
                            GET STARTED
                          </Button>
                        )}
                        {this.state.currentIndex > 0 && (
                          <Button
                            type="submit"
                            className="registryBtn px-4 rounded-pill btn-outline-light"
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
                
                { this.state.currentIndex ===3 &&  (
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
                            onChange={this.handleChange}
                            placeholder=" Email Address"
                          />
                          <Form.Control.Feedback type="invalid">
                            Empty
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group as={Col} controlId="formGridPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" name='password' onChange={this.handleChange} placeholder="*******" />
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
                          onChange={this.handleChange}
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
                      { this.state.errorMessage && !this.state.message && <p style={{color:'red',textAlign :'center'}}>{ this.state.errorMessage } </p> }
                      { this.state.message && <p style={{color:'green',textAlign :'center'}}>{ this.state.message } </p> }
                    </Form>
                  </div>
                )}
              </div>
              <div className="text-center">
                {this.state.currentIndex >= 0 && this.state.currentIndex <= 2 && (
                  <Button
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
                  </Button>
                )}
                {this.state.currentIndex === 3 && (
                  <div className=" d-flex justify-content-between">
                    <p>Already a member?<Login signup={<span>Log in</span>}/></p>
                    <Button
                      onClick={this.handleSubmit}
                      className="px-5 btn-outline-dark"
                      style={{
                        background: "#AAAAAA",
                        border: "1px solid #DDDDDD",
                        borderRadius: "50px",
                      }}
                    >
                      SIGN UP
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
