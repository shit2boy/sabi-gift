import React, { Component } from 'react';
import { Button,Form,Modal } from 'react-bootstrap';
import account from '../images/landing/account.svg'


 class Login extends Component {
     constructor(props){
         super(props)
         this.state={
             username : "",
             password : [],
             modalShow: false,
             modalTitle: "",
             validated : false,
         }
         this.onChange = this.onChange.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
        //  this.setModalShow = this.setModalShow.bind(this);
     }
        onChange(event){
            this.setState({
                [event.target.name]: event.target.value
            })
        }

        onSubmit(event){
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
        
            this.setState({Validated: true});
          };

        setModalHide = () => {
            this.setState({ modalShow: false, modalTitle: "", });
          };
        
          setModalShow = () => {
            this.setState({ modalShow: true ,modalTitle: "Please Login here."});
          };
    render() {
        return (<div>
            <img onClick={() =>
              this.setModalShow(true)} src={account} width='50px' alt='userImage' className='pointer'/>
           
            <Modal
            closeButton
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.state.modalShow}
            onHide={() => this.setModalHide(false)}
          >
            <Modal.Header className="tc" closeButton>
              {/* <Modal.Title id="contained-modal-title-vcenter" className="tc"> */}
                {this.state.modalTitle}
              {/* </Modal.Title> */}
            </Modal.Header>
            <Modal.Body className=" ">
            <Form noValidate onSubmit ={this.onSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" required />
                    <Form.Control.Feedback type='invalid'>Empty</Form.Control.Feedback>

                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" />
                    <Form.Control.Feedback type='invalid'>Empty</Form.Control.Feedback>
                </Form.Group>
                <Button className="w-100" variant="success" type="submit" style={{background:'#58B852', color:'#ffffff'}}>
                    Login
                </Button>
                <div className='text-center mt-4'>
                    <small className='d-block'>Forgot your password? Reset your password</small>
                    <small style={{color:'#223564',opacity:'1'}}> Don’t have an account? Sign up</small>
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