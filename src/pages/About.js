import React, { Component } from "react";
import { Link } from "react-router-dom";
import sabigift from "../images/landing/sabigift.png";
import {Form,Col,Row, Container} from 'react-bootstrap'
import ring from "../images/landing/ring.svg";
import bmw from "../images/landing/bmw.png";
import food from "../images/landing/food-and-restaurant.svg";
// import { Layout } from "antd";
import { Steps } from "antd";
// import Form from "antd/lib/form/Form";

const { Step } = Steps;

// const { Sider, Content } = Layout;

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
    <Container fluid>
          <Row className="">
            <Col className="leftside" >
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
            </Col>

            {this.state.currentIndex === 0 && <Col xs md lg={8} className='rightSide' >
                <h2 className=''>Hello! Please tell us a little </h2>
                <h2> bit about Yourself</h2>
                <div className=''>
                <Form className='w-50 mx-auto '>
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
                    <Form.Label>Alt Phone</Form.Label>
                    <Form.Control type="text" placeholder="0000-0000-0000" />
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
                <div className=" d-flex justify-content-around">
                <button to="" onClick={this.back} className="btn btn-light rounded-pill px-5">
                  Back
                </button>
                <button to="" onClick={this.next} className="btn btn-dark rounded-pill px-5">
                  Next
                </button>
              </div>
            </Col>}





             {this.state.currentIndex === 1 && <Col xs md lg={8} className="py-3 rightSide" >
              <div >
                <h3 id="header">What are you most excited </h3>
                <h3 id="header"> to register at Sibigifts?</h3>

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
            </Col>}

            {this.state.currentIndex === 2 && <Col xs md lg={8} className='py-3 rightSide'>
                        <div  >
                            <h3 id='header'>What are somethings you  </h3>
                            <h3 > enjoy doing together</h3>
                        
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
               
                    </Col>}
                     {this.state.currentIndex === 3 && <Col xs md lg={8} className='rightSide '>
                        <div  className=' '>
                            <h3 className='p-5'>That's all. You're done! </h3>
                        
                        </div>
                        <div className=" d-flex justify-content-around" style={{paddingTop:'45vh'}}>
                            <button to="" onClick={this.back} className="btn btn-light rounded-pill px-5">
                            Back
                            </button>
                            <button to="" onClick={this.next} className="btn btn-dark rounded-pill px-5">
                            Next
                            </button>
                        </div>
               
                    </Col>} 
                    {this.state.currentIndex === 4 && <Col xs md lg={8} className='py-3 rightside' >
                        <h3 id='header'>Try adding few gifts </h3>
                            <p id='header'> you go wrong with this best sellers</p>
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
                         
                        <div className="d-flex justify-content-around">
                            <button to="" onClick={this.back} className="btn btn-light rounded-pill px-5">
                            Back
                            </button>
                            <button to="" onClick={this.next} className="btn btn-dark rounded-pill px-5">
                            Next
                            </button>
                        </div>
               
                    </Col>}
            
          </Row>
        </Container>
   
    );
  }
}

export default About;
