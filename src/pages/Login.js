import React, { Component } from 'react';
import { Button,Form,Modal } from 'react-bootstrap';
import account from '../images/landing/account.svg';
import {Link, } from 'react-router-dom'
import axios from "axios";
import util from "../util/util";


 class Login extends Component {
     constructor(props){
         super(props)
         this.state={
             field : {},
            //  password : [],
             modalShow: false,
             modalTitle: "",
             validated : false,
         }
         this.changeHandler = this.changeHandler.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
        //  this.setModalShow = this.setModalShow.bind(this);
     }
        changeHandler(e){
          let loginField = this.state.field;
          loginField[e.target.name] = e.target.value;
          this.setState({
            loginField,
          });
          // console.log(loginField)
        }
        componentDidMount(){
          if (localStorage.getItem('token')!=null){
            this.props.history.push('/')
          }
        }

        onSubmit(e){
          e.preventDefault();
            const SignInDetails = this.state.field;
            // if (SignInDetails.checkValidity() === false) {
            //   event.stopPropagation();
            //   console.log(SignInDetails);
            // }
            axios.post(`${util.API_BASE_URL}accounts/login/`, SignInDetails,{ 
            'headers': {
              "Content-Type": "application/json",
              },
            })
            . then(data=> {
              if (data.status === 200){
                // console.log(data);
                window.localStorage.setItem('token_id', data.data.token);
                window.localStorage.setItem('username', data.config.data.email);
                window.location.href='/dashboard'
                console.log('successfully login');
              }
              
            })
            .catch(error => {
              console.log(error);
              alert('Invalid email or password');
            });
            this.setState({[e.target.name] : '',field :''});
            
          };

        setModalHide = () => {
            this.setState({ modalShow: false, modalTitle: "", });
          };
        
          setModalShow = () => {
            this.setState({ modalShow: true ,modalTitle: "Log in to Sabigifts."});
          };
    render() {
        return (<div>
            <img onClick={() =>
              this.setModalShow(true)} src={account} width='50px' alt='userImage' className='pointer'/>
           
            <Modal
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.state.modalShow}
            onHide={() => this.setModalHide(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter" className="text-center">
                {this.state.modalTitle}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className=" ">
            <Form noValidate onSubmit ={this.onSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" onChange={this.changeHandler} placeholder="Enter email" required />
                    <Form.Control.Feedback type='invalid'>Empty</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" onChange={this.changeHandler} placeholder="Password" />
                    <Form.Control.Feedback type='invalid'>Empty</Form.Control.Feedback>
                </Form.Group>
                <Button className="w-100" variant="success" type="submit" style={{background:'#58B852', color:'#ffffff'}}>
                    Log In
                </Button>
                <div className='text-center mt-4'>
                    <span className='d-block'>Forgot your password? <Link className='text-link' style={{color:'#223564'}} to='/Passwordreset'>Reset your password</Link></span>
                    <span style={{color:'#223564',opacity:'1'}}> Don’t have an account? <Link className='text-link' style={{color:'#223564'}} to='/createRegistry'>Sign up</Link></span>
                </div>
                <small style={{color:'#223564',opacity:'1'}}>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</small>
            </Form>
            </Modal.Body>
            
          </Modal>
        </div>
        )
    }
}

export default Login;