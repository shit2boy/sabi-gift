import React, { Component } from "react";
import { Link } from "react-router-dom";
import sabigift from "../images/landing/sabigift.png";
import {Form,Col} from 'react-bootstrap'
import ring from "../images/landing/ring.svg";
import bmw from "../images/landing/bmw.png";
import food from "../images/landing/food-and-restaurant.svg";
import { Steps } from "antd";
import axios from "axios";
import util from "../util/util";

const { Step } = Steps;



export class About extends Component {
    constructor() {
        super();
        this.state = {
          formField : { },
            currentIndex : 0,
            isValidated : false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
      let formField = this.state.formField;
      formField[e.target.name] = e.target.value;
      this.setState({
        formField,
      });
      // console.log(formField)
    }
      handleSubmit(event) {
        event.preventDefault();
        const formValue = new FormData(this.state.formField);
        axios.post(`${util.API_BASE_URL}accounts/register/`, formValue, 
          { 'content-type': 'multipart/form-data' })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
      //   this.setState({formField: ''})
        // axios.post(`${util.API_BASE_URL}accounts/register/`, formField);
        // this.setState({formField: ''})
      }
    //    const handleSubmit = (event) => {
    //     if (formField.checkValidity() === false) {
    //       event.preventDefault();
    //       event.stopPropagation();
    //     } else{
    //       const formField = new FormData();
    
    //       axios (`${util.API_BASE_URL}accounts/register/`, {
    //         method: 'POST',
    //         body: formField,
    //       });
    //     }
    
    //     this.setState({isValidated : false});
    //   }
    // }

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
            <div className=" col-4 d-none d-lg-flex justify-content-center  leftside" >
              <div className="mt-5">
                <div >
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
            </div>

            {this.state.currentIndex === 0 && <div className='col rightSide' >
                <div className='row'>
                    <div className="col d-flex justify-content-center" style={{minHeight:'85vh',marginTop:'35px'}}>
                        <div>
                        <h2 className=''>Hello! Please tell us a little <br/> bit about Yourself.</h2>
                        <Form noValidate onSubmit={this.handleSubmit} className='w-75'>
                            <Form.Row>
                              <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control onChange ={this.handleChange} type="text" name='firstName' placeholder="Jimi" />
                              </Form.Group>

                            <Form.Group as={Col} controlId="formName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control onChange ={this.handleChange} type="text" name='lastName' placeholder="Fola" />
                              <Form.Control.Feedback type='invalid'>Empty</Form.Control.Feedback>
                            </Form.Group>
                            </Form.Row>
                            <Form.Row>
                            <Form.Group as={Col} controlId="Phone">
                            <Form.Label>Phone</Form.Label>
                              <Form.Control onChange ={this.handleChange} type='tel' name='Phone' placeholder="0000 0000-0000" />
                            <Form.Control.Feedback type='invalid'>Empty</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="AltPhone">
                            <Form.Label>Alt Phone</Form.Label>
                              <Form.Control onChange ={this.handleChange} type="tel" name='AltPhone' placeholder="0000-0000-0000" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Group controlId="Address">
                            <Form.Label>Street addresss</Form.Label>
                              <Form.Control onChange ={this.handleChange} type="text" name='address' placeholder="14b wole Ariyo street" />
                            <Form.Control.Feedback type='invalid'>Empty</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} controlId="City">
                            <Form.Label>City</Form.Label>
                              <Form.Control onChange ={this.handleChange} type='text' name='city' placeholder="Lekki" />
                            <Form.Control.Feedback type='invalid'>Empty</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="State">
                            <Form.Label>State</Form.Label>
                              <Form.Control onChange ={this.handleChange} type="text" name='state' placeholder="State" />
                            <Form.Control.Feedback type='invalid'>Empty</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                      </Form>
                        </div>
                    </div>
                </div>
                <div className='row'>
                  <div className="col bg-white d-flex justify-content-around" style={{background:'#ffffff',height:'60px'}}>
                    <button type="button" onClick={this.back} className="btn btn-light rounded-pill px-5">
                      Back
                    </button>
                    <button type="submit" onClick={this.next} className="btn btn-dark rounded-pill px-5">
                      Next
                    </button>
                  </div>
                </div>
            </div>}





             {this.state.currentIndex === 1 && <div className="col rightSide" >
                <div className='row'>
                    <div className='col d-flex justify-content-center' style={{minHeight:'85vh',padding:'40px'}}>
                    <div className=''>
                      <h2>What are you most excited <br/>to register at Sibigifts?</h2>
                      <p className="py-4">Select the Event</p>
                      <div className="d-flex">
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
                        Choose the category that matches your event. 
                      </p>
                      </div>
                </div>
              </div>

            </div>
                <div className='row'>
                <div  className="col bg-white d-flex justify-content-between align-items-center" style={{height:'100px'}}>
                    {/* <div className=" d-flex justify-content-around"> */}
                    <button to="" onClick={this.back} className="btn btn-light rounded-pill px-5">
                      Back
                    </button>
                    <button to="" onClick={this.next} className="btn btn-dark rounded-pill px-5">
                      Next
                    </button>
                    {/* </div> */}
                </div>
                </div>
            </div>}

            {this.state.currentIndex === 2 && <div className=' col py-3 rightSide' >
                        <div className='row'>
                            <div className='col d-flex justify-content-center' style={{minHeight:'90vh',padding:'40px'}}>
                            <div className='' >
                            <h2 id='header'>What are somethings you  <br/> enjoy doing together</h2>
                        
                            <p className='py-4'>Select as many as you want</p>
                            <div className='d-flex mb-2'>
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
                            <div className='d-flex'>
                               
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
                          </div>
                      </div>
                       <div className='row'>
                       <div className="col bg-white d-flex justify-content-between align-items-center" style={{height:'100px'}}>
                            <button to="" onClick={this.back} className="btn btn-light rounded-pill px-5">
                            Back
                            </button>
                            <button to="" onClick={this.next} className="btn btn-dark rounded-pill px-5">
                            Next
                            </button>
                        </div>
                      </div>
                    </div>}
                     {this.state.currentIndex === 3 && <div className='col rightSide '>
                        <div  className='row'>
                            <div className="col d-flex justify-content-center align-items-center" style={{minHeight:'85vh'}}>
                              <h2 className='tet-center'>That's all. You're done! </h2>
                            </div>
                        </div>
                        <div className='row'>
                          <div className="col bg-white d-flex justify-content-between align-items-center" style={{height:'100px'}} >
                              <button to="" onClick={this.back} className="btn btn-light rounded-pill px-5">
                                Back
                              </button>
                              <button to="" onClick={this.next} className="btn btn-dark rounded-pill px-5">
                                Next
                              </button>
                          </div>  
                        </div>
               
                    </div>} 
                    {this.state.currentIndex === 4 && <div className='col-8 rightSide' >
                        <div className='py-5 ml-5'>
                        <h2 id='header'>Try adding few gifts </h2>
                            <p>you can't go wrong with this best sellers</p>
                            <div className='d-flex'>
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
                            <div className='d-flex'>
                                
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
                            <div className='d-flex'>
                               
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
