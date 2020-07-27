import React, { Component } from "react";
import {Link} from 'react-router-dom'
import sabigift from '../images/landing/sabigift.png';
import  ring from "../images/landing/ring.svg";
import  food from "../images/landing/food-and-restaurant.svg";
import { Steps } from 'antd';
// import { Container, Row, div } from "react-bootstrap";

const { Step } = Steps;



export class CreateRegistry extends Component {
    render() {
        return (
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
                  <Steps className="" direction="vertical" current={1}>
                    <Step style={{ divor: " white" }} title="Select Event" />
                    <Step title="Event basics" />
                    <Step title="Select Gifts" />
                    <Step title="Confirm" />
                  </Steps>
                </div>
              </div>
              <div className="col rightside">
                <div className='row'>
                  <div  className="col d-flex justify-content-center" style={{minHeight:'80vh',marginTop:'35px'}}>
                    <div>
                      <h3 className="">
                        First, Let's Make sure we <br />
                        support your events
                      </h3>

                      <p className="py-4">Select the Event type</p>
                      <div className="d-flex">
                            <Link to="/getstarted" className="text-link">
                                <div className="eventItem">
                                    <p>
                                    <img src={ring} alt="weddingIcon" />{" "}
                                    </p>
                                    <p>Wedding</p>
                                </div>
                            </Link>
                            <Link to="/signUp" className="text-link">
                                <div className="eventItem">
                                    <p>
                                    <img src={food} alt="weddingIcon" />{" "}
                                    </p>
                                    <p>Birthday</p>
                                </div>
                            </Link>
                                <div className="eventItem">
                                    <p>
                                        <img src={ring} alt="babyicon" />{" "}
                                    </p>
                                    <p>Baby Shower</p>
                                </div>
                            <div className="eventItem">
                                <p>
                                    <img src={ring} alt="undefine" />{" "}
                                </p>
                                <p>Not on list</p>
                            </div>
                      </div>
                        <p className="py-4">
                          Choose the category that matches your event. If your<br/>
                          Event is not Listed,Kindly choose others for more
                          options
                        </p>
                    </div>
                  </div>
                   
                </div>
                   <div className='row'>
                   <div className="col bg-white  d-flex justify-content-between align-items-center" style={{height:'90px'}} >
                       <button to="" className="btn rounded-pill px-5" style={{background:'#ffffff'}}>
                            Back
                        </button>
                        <Link
                        to="/signUp"
                        className=" text-link btn btn-dark rounded-pill px-5"
                        >
                            Next
                        </Link>
                    </div>
                   </div>
              </div>
            </div>
          </div>
        ); }
 }

 export default CreateRegistry
