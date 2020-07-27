import React from 'react'
import { Button,Form, } from 'react-bootstrap';
import {Link} from 'react-router-dom'



const ResetPassword = () => {
    return (
        <div className='container'>
            <div  className='d-flex justify-content-center align-items-center' style={{height:'500px'}}>
                <div className='p-5 shadow'>
                    <h3 className='text-center'><strong>Reset your Password </strong></h3>
                    <Form noValidate>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter email" required />
                            <Form.Control.Feedback type='invalid'>Empty</Form.Control.Feedback>
                        </Form.Group>
                        
                        <Button className="w-100 mt-3" variant="success" type="submit" style={{background:'#58B852', color:'#ffffff'}}>
                            Log In
                        </Button>
                        <div className='text-center mt-5'>
                            <span className='d-block mt-2'>Already have an account?  <Link className='text-link' style={{color:'#223564'}} to='/'>Login here</Link></span>
                            <span style={{color:'#223564',opacity:'1'}}> Don’t have an account? <Link className='text-link' style={{color:'#223564'}} to='/createRegistry'>Sign up</Link></span>
                        </div>
                        <small style={{color:'#223564',opacity:'1'}}>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</small>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
