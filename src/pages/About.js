import React, { Component } from "react";
import { Link } from "react-router-dom";
import sabigift from "../images/landing/sabigift.png";
import {Form,Col} from 'react-bootstrap'
import ring from "../images/landing/ring.svg";
import bmw from "../images/landing/bmw.png";
import food from "../images/landing/food-and-restaurant.svg";
import { Steps } from "antd";
// import Form from "antd/lib/form/Form";

const { Step } = Steps;



export class About extends Component {
    constructor() {
        super();
        this.state = {
            currentIndex : 0
        }
    }

back = () => {
    if (this.state.currentIndex <=0) {
        return;
    }
    this.setState({currentIndex : this.state.currentIndex - 1});
}
next =() => {
    if (this.state.currentIndex >=4) {
        return;
    }
    this.setState({currentIndex : this.state.currentIndex + 1});
}
  render() {
    return (
    <div className='container-fluid'>
          <div className="row">
            <div className=" col-4 leftside" >
              <div className="">
                <Link to="/">
                  <img
                    className="homeicon rounded-circle"
                    src={sabigift}
                    alt="SabiGift-Logo"
                  />
                </Link>
              </div>
              <Steps className="px-5" direction="vertical" current={this.state.currentIndex}>
                <Step title="Your Profile" />
                <Step title="Event basics" />
                <Step title="Select Gifts" />
                <Step title="Confirm" />
              </Steps>
            </div>

            {this.state.currentIndex === 0 && <div className='col-8 rightSide' >
                <div className='py-5 ml-5'>
                <h2 className=''>Hello! Please tell us a little <br/> bit about Yourself.</h2>
                  <Form className='w-75'>
                      <Form.Row>
                        <Form.Group as={Col} controlId="formGridNmae">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control type="text" placeholder="Jimi" />
                        </Form.Group>

                      <Form.Group as={Col} controlId="formGridLastname">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" placeholder="Fola" />
                      </Form.Group>
                      </Form.Row>
                      <Form.Row>
                      <Form.Group as={Col} controlId="formGridPhone">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control type='text' placeholder="0000 0000-0000" />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridAltPhone">
                      <Form.Label>Alt Phone</Form.Label>
                      <Form.Control type="text" placeholder="0000-0000-0000" />
                      </Form.Group>
                  </Form.Row>
                  <Form.Group controlId="formGridAltPhone">
                      <Form.Label>Street addresss</Form.Label>
                      <Form.Control type="text" placeholder="14b wole Ariyo street" />
                  </Form.Group>
                  <Form.Row>
                      <Form.Group as={Col} controlId="formGridCity">
                      <Form.Label>City</Form.Label>
                      <Form.Control type='text' placeholder="Lekki" />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridAltPhone">
                      <Form.Label>State</Form.Label>
                      <Form.Control type="text" placeholder="State" />
                      </Form.Group>
                  </Form.Row>
                </Form>
                </div>
                <div className=" d-flex justify-content-around" style={{background:'#ffffff',height:'70px'}}>
                <button type="button" onClick={this.back} className="btn btn-light rounded-pill px-5">
                  Back
                </button>
                <button type="button" onClick={this.next} className="btn btn-dark rounded-pill px-5">
                  Next
                </button>
              </div>
            </div>}





             {this.state.currentIndex === 1 && <div className="col-8 rightSide" >
              <div className='py-5 ml-5'>
                <h2 id="header">What are you most excited <br/>to register at Sibigifts?</h2>
                  <p className="py-4">Select the Event</p>
                  <div className="eventType">
                 
                    <div className="eventItem">
                      <p>
                        <img src={ring} alt="weddingIcon" />{" "}
                      </p>
                      <p>Gifts</p>
                    </div>
                 
                    <div className="eventItem">
                      <p>
                        <img src={food} alt="weddingIcon" />{" "}
                      </p>
                      <p>Cash Fund</p>
                    </div>
                 
                  <div className="eventItem">
                    <p>
                      <img src={ring} alt="babyicon" />{" "}
                    </p>
                    <p>Gift & Cash </p>
                  </div>
                  <div className="eventItem">
                    <p>
                      <img src={ring} alt="undefine" />{" "}
                    </p>
                    <p>Mostly cash</p>
                  </div>
                </div>
                <div className="p-3">
                  <p>
                    Choose the category that matches your event. If your Event
                    is not Listed, Kindly choose others for more options
                  </p>
                </div>
              </div>
              <div className=" d-flex justify-content-around">
                <button to="" onClick={this.back} className="btn btn-light rounded-pill px-5">
                  Back
                </button>
                <button to="" onClick={this.next} className="btn btn-dark rounded-pill px-5">
                  Next
                </button>
              </div>
            </div>}

            {this.state.currentIndex === 2 && <div className=' col-8 py-3 rightSide'>
                        <div className='py-5 ml-5' >
                            <h2 id='header'>What are somethings you  <br/>
                            enjoy doing together</h2>
                        
                            <p className='py-4'>Select as many as you want</p>
                            <div className='eventType'>
                                
                                    <div className='eventItem'>
                                        <p><img src={ring} alt='weddingIcon' /> </p>
                                        <p>Cooking</p>
                                    </div> 
                                
                                    <div className='eventItem'>
                                        <p> </p>
                                        <p>Baking</p>
                                    </div>    
                               
                                <div className='eventItem'>
                                    <p> </p>
                                    <p>Friends over </p>
                                </div> 
                                <div className='eventItem'>
                                    <p></p>
                                    <p>Spa</p>
                                </div> 
                            </div>
                            <div className='eventType'>
                               
                                    <div className='eventItem'>
                                        <p><img src={ring} alt='weddingIcon' /> </p>
                                        <p>Traveling</p>
                                    </div> 
                               
                                    <div className='eventItem'>
                                        <p><img src={food} alt='weddingIcon' /> </p>
                                        <p>Camping</p>
                                    </div>    
                               
                                <div className='faded eventItem'>
                                    <p><img src={ring} alt='babyicon' /> </p>
                                    <p> Chilling</p>
                                </div> 
                                <div className=' faded eventItem'>
                                    <p><img src={ring} alt='undefine' /> </p>
                                    <p>Playing with</p>
                                </div> 
                            </div>
                          
                        </div>
                        <div className="mt-2 d-flex justify-content-around">
                            <button to="" onClick={this.back} className="btn btn-light rounded-pill px-5">
                            Back
                            </button>
                            <button to="" onClick={this.next} className="btn btn-dark rounded-pill px-5">
                            Next
                            </button>
                        </div>
               
                    </div>}
                     {this.state.currentIndex === 3 && <div className='col-8 rightSide '>
                        <div  className='py-5 ml-5  h-50'>
                            <h2 className='tet-center'>That's all. You're done! </h2>
                        
                        </div>
                        <div className=" d-flex justify-content-around" style={{paddingTop:'25vh'}}>
                            <button to="" onClick={this.back} className="btn btn-light rounded-pill px-5">
                            Back
                            </button>
                            <button to="" onClick={this.next} className="btn btn-dark rounded-pill px-5">
                            Next
                            </button>
                        </div>
               
                    </div>} 
                    {this.state.currentIndex === 4 && <div className='col-8 rightSide' >
                        <div className='py-5 ml-5'>
                        <h2 id='header'>Try adding few gifts <br/>you go wrong with this best sellers</h2>
                            <div className='eventType'>
                               <div className='eventItem'>
                                  <p><img src={bmw} alt='weddingIcon' /> </p>
                                  <p>Car</p>
                                </div> 
                               <div className='eventItem'>
                                    <p> </p>
                                    <p>Option 2</p>
                                </div> 
                                 <div className='eventItem'>
                                    <p> </p>
                                    <p>Option 2 </p>
                                </div> 
                                <div className='eventItem'>
                                    <p></p>
                                    <p>Option 3</p>
                                </div> 
                            </div>
                            <div className='eventType'>
                                
                                    <div className=' bg-success eventItem'>
                                        <p><img src={bmw} alt='weddingIcon' /> </p>
                                        <p>Car</p>
                                    </div> 
                               
                                    <div className='eventItem'>
                                        <p> </p>
                                        <p>Option 2</p>
                                    </div>    
                               
                                <div className='eventItem'>
                                    <p> </p>
                                    <p>Option 3 </p>
                                </div> 
                                <div className='eventItem'>
                                    <p></p>
                                    <p>Option 4</p>
                                </div> 
                            </div>
                            <div className='eventType'>
                               
                                    <div className='bg-success eventItem'>
                                        <p><img src={bmw} alt='weddingIcon' /> </p>
                                        <p>Car</p>
                                    </div> 
                               
                                    <div className='eventItem'>
                                        <p> </p>
                                        <p>Option 2</p>
                                    </div>    
                                 
                                <div className='eventItem'>
                                    <p> </p>
                                    <p>Option 3</p>
                                </div> 
                                <div className='eventItem'>
                                    <p></p>
                                    <p>Option 4</p>
                                </div> 
                            </div>
                        </div>
                         
                        <div className="d-flex justify-content-around">
                            <button to="" onClick={this.back} className="btn btn-light rounded-pill px-5">
                            Back
                            </button>
                            <button to="" onClick={this.next} className="btn btn-dark rounded-pill px-5">
                            Next
                            </button>
                        </div>
               
                    </div>}
            
          </div>
        </div>
   
    );
  }
}

export default About;
