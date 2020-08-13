import React, { Component } from "react";
import { Link } from "react-router-dom";
import sabigift from "../images/landing/sabigift.png";
import {Form,Col} from 'react-bootstrap'
import bmw from "../images/landing/bmw.png";
import { Steps } from "antd";
import {StateContext} from "../Context"
import axios from "axios";
import util from "../util/util";
import LogOut from "../components/LogOut";

const { Step } = Steps;



export class About extends Component {
  static contextType = StateContext
    constructor(props) {
        super(props);
        this.state = {
          formField : { },
            currentIndex : 0,
            signUpResponse:{successful:false, message:''},
            isValidated : false,
            registryType : [],
            errorMessage : '',
            selectedRegistryType : '',
            registryCategories : [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleRegistryType = this.handleRegistryType.bind(this);
    }

    handleChange(e) {
      let formField = this.state.formField;
      formField[e.target.name] = e.target.value;
      this.setState({
        formField,
      });
      // console.log(formField)
    }

          // componentDidMount() {
      //   axios
      //     .get(`${util.API_BASE_URL}registry-types/`, {
      //       headers: { Authorization: "Token " + localStorage.getItem("token_id") },
      //     })
      //     .then((res) => {
      //       // console.log(res.data);
      //       if (res.data !== undefined) {
      //          this.setState({registryType : res.data});
      //       }
      //     })
      //     .catch((err) => {
      //       // console.log(err);
      //       
      //     });
      // }



      validateForm() {
        let formField = this.state.formField;
        let errors = {};
        let formIsValid = true;
      if (!formField["firstName"]) {
        formIsValid = false;
        errors["firstName"] = "Cannot be empty";
      }
      if (!formField["lastName"]) {
        formIsValid = false;
        errors["lastName"] = "Cannot be empty";
      }
      if (!formField["address"]) {
        formIsValid = false;
        errors["address"] = "Cannot be empty";
      }
      if (!formField["street"]) {
        formIsValid = false;
        errors["street"] = "Cannot be empty";
      }
      if (!formField["city"]) {
        formIsValid = false;
        errors["city"] = "Cannot be empty";
      }
      this.setState({ errorMessage: errors });
      return formIsValid;
    }

     
        handleSubmit(event) {
        event.preventDefault();
        let formField = this.state.formField;
        const newUserInfo = new FormData();       
        // newUserInfo.append('email', formField['email']);
        newUserInfo.append('first_name', formField['firstName']);
        newUserInfo.append('last_name', formField['lastName']);
        newUserInfo.append('mobile', formField['Phone']);
        newUserInfo.append('street', formField['address']);
        newUserInfo.append('lga', formField['city']);
        newUserInfo.append('city', formField['city']);
        newUserInfo.append('gender', undefined);
        newUserInfo.append('photo', '');
        

        axios.patch(`${util.API_BASE_URL}accounts/profile/`, newUserInfo, 
          {headers:{ Authorization: 'Token ' + localStorage.getItem('token_id')} })
        .then(response => {
          if (response.status === 200)
          // console.log(response);
            alert(response.statusText);
            this.setState({currentIndex : this.state.currentIndex + 1, signUpResponse : {successful:true, message:'Registry Successful'}})
           
        })
        .catch(error => {
            console.dir(error);
            this.setState({errorMessage: error.response.data.first_name});

            // alert("Not successful, Check all Input fields")
            
        });
      
      }
        componentDidMount(event){
            
            this.setState({ selectedRegistryType: event})
            let type = this.state.selectedRegistryType
            console.log(type)
            axios.get(`${util.API_BASE_URL}categories/`,
              {headers:{ Authorization: 'Token ' + localStorage.getItem('token_id')} })
            .then(response => {
              if (response.status === 200)
              this.setState({registryCategories : response.data});
               
            })
            .catch(error => {
                console.dir(error);
    
            });
            axios.get(`${util.API_BASE_URL}registry-types/`,
              {headers:{ Authorization: 'Token ' + localStorage.getItem('token_id')} })
            .then(response => {
              if (response.status === 200){
              let data = response.data;
              for (let i=0;i<data.length;i++) {
                data[i].image = data[i].image.replace("image/upload/","");
               this.setState({registryType : data});

              }
              }
              
               
            })
            .catch(error => {
                console.dir(error);
    
            });
          
          }
      
    //    const handleValidation = (event) => {
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
      window.location.href='/dashboard'

    }
    this.setState({currentIndex : this.state.currentIndex + 1});
}
  render() {
    return (
    <div className='container-fluid'>
          <div className="row">
            <div className=" col-4 d-none d-lg-flex justify-content-center  leftside" >
                <div className='mt-5'>
                <div className="row">
                <div >
                  <Link to="/">
                    <img
                      className="homeicon rounded-circle"
                      src={sabigift}
                      alt="SabiGift-Logo"
                    />
                  </Link>
                </div>
                <Steps className="" direction="vertical" current={this.state.currentIndex}>
                  <Step title="Your Profile" />
                  <Step title="Event basics" />
                  <Step title="Select Gifts" />
                  <Step title="Confirm" />
                </Steps>
              </div>
                <div className='row'>
                 <LogOut logout={<p>Save and log out</p>} />
                </div>
                </div>
            </div>

            {this.state.currentIndex === 0 && <div className='col rightSide' >
                <div className='row'>
                    <div className="col offset-1 justify-content-center" style={{minHeight:'85vh',marginTop:'35px'}}>
                        <div>
                        <h2 className=''>Hello! Please tell us a little <br/> bit about Yourself.</h2>
                        <Form noValidate onSubmit={this.handleSubmit} className='w-75'>
                            <Form.Row>
                              <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control onChange ={this.handleChange} type="text" name='firstName' placeholder="Jimi" />
                                {/* <span style={{ color: "red" }}>{this.state.errorMessage["firstName"]} </span> */}
                              </Form.Group>

                            <Form.Group as={Col} controlId="formName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control onChange ={this.handleChange} type="text" name='lastName' placeholder="Fola" />
                            {/* <span style={{ color: "red" }}>{this.state.errorMessage["lastName"]} </span> */}
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
                        { this.state.errorMessage && <p style={{color:'red',textAlign :'center'}}>{ this.state.errorMessage } </p>}
                      </Form>
                        </div>
                    </div>
                </div>
                <div className='row p-4' style={{background:'#ffffff'}}>
                  <div className="col bg-white d-flex justify-content-between" >
                    <button type="button" onClick={this.back} className="btn btn-light rounded-pill px-5">
                      Back
                    </button>
                    <button type="submit" onClick={this.handleSubmit} className="btn btn-dark rounded-pill px-5">
                      Next
                    </button>
                  </div>
                </div>
            </div>}

             {this.state.currentIndex === 1 && <div className="col rightSide" >
                <div className='row'>
                    <div className='col offset-1 justify-content-center' style={{minHeight:'85vh',marginTop:'35px'}}>
                    <div className=''>
                      <h2>What are you most excited <br/>to register at Sibigifts?</h2>
                      <p className="py-4">Select the gift types</p>
                      <div className="col-10 row">
                        {this.state.registryType.map(type=>
                          <div key={type.id} className="eventItem col-lg-2">
                            <div className='text-center'>
                              <img src={type.image} alt={type.name} width='70px' />{" "}
                            </div>
                            <p>{type.name}</p>
                          </div>
                        )}  
                          
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
                <div  className="col bg-white d-flex justify-content-between align-items-center" style={{height:'90px'}}>
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
                            <div className='col offset-1 justify-content-center' style={{minHeight:'90vh',marginTop:'40px'}}>
                            <div className='' >
                            <h2 id='header'>What are somethings you  <br/> enjoy doing together</h2>
                        
                            <p className='py-4'>Select as many as you want</p>
                            <div className='row col-10 mb-2'>

                                {this.state.registryCategories.map(category=>
                                  <div key={category.id} className='eventItem col-lg-3'>
                                    <p></p>
                                  {/* <div className='text-center'><img src={category.image} alt='weddingIcon' /> </div> */}
                                  <p className='text-center'>{category.name}</p>
                              </div> 
                              )}

                               
                            </div>
                          </div>
                          </div>
                      </div>
                       <div className='row'>
                       <div className="col bg-white d-flex justify-content-between align-items-center" style={{height:'100px'}}>
                            <button onClick={this.back} className="btn btn-light rounded-pill px-5">
                            Back
                            </button>
                            <button onClick={this.next} className="btn btn-dark rounded-pill px-5">
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
                    {this.state.currentIndex === 4 && <div className='col rightSide' >
                        <div className='py-5 row offset-1 '>
                        <div className='col'>
                        <h2 id='header'>Try adding few gifts </h2>
                            <p>you can't go wrong with this best sellers</p>
                            <div className='row col-10 mb-2'>
                               <div className='eventItem col-lg-3 bg-success text-center'>
                                  <img src={bmw} width='80px' alt='weddingIcon' /> 
                                  <strong className='d-block text-dark' >Car</strong>
                                  <small className='d-block'>Description of gift</small>
                                    <strong className='text-white'>#200k</strong>
                                </div> 
                               <div className='eventItem col-lg-3 text-center'>
                               <img src={bmw} width='80px' alt='weddingIcon' /> 
                                  <strong className='d-block'>Option 2</strong>
                                  <small className='d-block'>Description of gift</small>
                                    <strong>#200k</strong>
                                </div> 
                                 <div className='eventItem col-lg-3 text-center'>
                                 <img src={bmw} width='80px' alt='weddingIcon' /> 
                                  <strong className='d-block'>Option 3</strong>
                                  <small className='d-block'>Description of gift</small>
                                    <strong>#200k</strong>
                                </div> 
                                <div className='eventItem col-lg-3 text-center'>
                                <img src={bmw} width='80px' alt='weddingIcon' /> 
                                  <strong className='d-block'>Option 4</strong>
                                  <small className='d-block'>Description of gift</small>
                                    <strong>#200k</strong>
                                </div> 
                            </div>
                            <div className='row col-10 mb-2'>
                               <div className='eventItem bg-success col-lg-3 text-center'>
                               <img src={bmw} width='80px' alt='weddingIcon' /> 
                                  <strong className='d-block text-dark'>Car</strong>
                                  <small className='d-block'>Description of gift</small>
                                    <strong className='text-white'>#200k</strong>
                                </div> 
                               <div className='eventItem col-lg-3 text-center'>
                               <img src={bmw} width='80px' alt='weddingIcon' /> 
                                  <strong className='d-block'>Option 2</strong>
                                  <small className='d-block'>Description of gift</small>
                                    <strong>#200k</strong>
                                </div> 
                                 <div className='eventItem col-lg-3 text-center'>
                                 <img src={bmw} width='80px' alt='weddingIcon' /> 
                                  <strong className='d-block'>Option 3</strong>
                                  <small className='d-block'>Description of gift</small>
                                    <strong>#200k</strong>
                                </div> 
                                <div className='eventItem col-lg-3 text-center'>
                                <img src={bmw} width='80px' alt='weddingIcon' /> 
                                  <strong className='d-block'>Option 4</strong>
                                  <small className='d-block'>Description of gift</small>
                                    <strong>#200k</strong>
                                </div> 
                            </div>
                            <div className='row col-10 mb-2'>
                               <div className='eventItem bg-success col-lg-3 text-center'>
                               <img src={bmw} width='80px' alt='weddingIcon' /> 
                                  <strong className='d-block text-dark'>Car</strong>
                                  <small className='d-block'>Description of gift</small>
                                    <strong className='text-white'>#200k</strong>
                                </div> 
                               <div className='eventItem col-lg-3 text-center'>
                               <img src={bmw} width='80px' alt='weddingIcon' /> 
                                  <strong className='d-block'>Option 2</strong>
                                  <small className='d-block'>Description of gift</small>
                                    <strong>#200k</strong>
                                </div> 
                                 <div className='eventItem col-lg-3 text-center'>
                                 <img src={bmw} width='80px' alt='weddingIcon' /> 
                                  <strong className='d-block'>Option 3</strong>
                                  <small className='d-block'>Description of gift</small>
                                    <strong>#200k</strong>
                                </div> 
                                <div className='eventItem col-lg-3 text-center'>
                                <img src={bmw} width='80px' alt='weddingIcon' /> 
                                  <strong className='d-block'>Option 4</strong>
                                  <small className='d-block'>Description of gift</small>
                                    <strong>#200k</strong>
                                </div> 
                            </div>
                           
                        </div> 
                        </div>
                         
                        <div className="d-flex justify-content-around p-2">
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
