import React, {useState }from "react";
import { Form, Col,Table } from "react-bootstrap";
import sabigift from '../images/landing/sabigift.png'
import { Link } from "react-router-dom";

const CheckoutForm = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
        <>
            <div className=' container-fluid'>
                <Link to='/Dashboard' className='mt-3'>
                    <img src={sabigift} width='70px' alt='logo' /> 
                </Link>
                    <div className='ml-4 mb-4'><h3>Check out</h3></div>
                   <div className='row justify-content-center'>
                      <div className='col-7 mx-auto p-3' style={{border:'1px solid #707070',borderRadius:'30px'}}>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Row>
                            <Form.Group as={Col} controlId="Fname">
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                required
                                type="text"
                                placeholder="First name"
                                />
                                <Form.Control.Feedback type='invalid'>Empty</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}  controlId="Lname">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                required
                                type="text"
                                placeholder="Last name"
                                />
                                <Form.Control.Feedback type='invalid'>Empty</Form.Control.Feedback>
                            </Form.Group>
                            </Form.Row>
                            <Form.Row>
                            <Form.Group as={Col}  controlId="Lname">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                required
                                type="tel"
                                placeholder="0000-0000"
                                />
                                <Form.Control.Feedback type='invalid'>Empty</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}  controlId="Lname">
                                <Form.Label>Alt Phone</Form.Label>
                                <Form.Control
                                required
                                type="tel"
                                placeholder="0000-0000"
                                />
                                <Form.Control.Feedback type='invalid'>Empty</Form.Control.Feedback>
                            </Form.Group>
                            </Form.Row>
                            <Form.Row>
                            <Form.Group as={Col}  controlId="validationCustomUsername">
                                <Form.Label>Label</Form.Label>
                                <Form.Control
                                type="text"
                                placeholder="Placeholder text"
                                />
                            </Form.Group>
                            </Form.Row> 
                            <Form.Row>
                            <Form.Group as={Col}  controlId="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" placeholder="City" required />
                                <Form.Control.Feedback type="invalid">
                                Please provide a valid city.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}  controlId="state">
                                <Form.Label>State</Form.Label>
                                <Form.Control type="text" placeholder="State" required />
                                <Form.Control.Feedback type="invalid">
                                Please provide a valid state.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}  controlId="Zip">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control type="text" placeholder="33789"  />
                            </Form.Group>
                            </Form.Row>
                            <Form.Group  as={Col} >
                            <Form.Label>Gift info</Form.Label>
                            <Form.Control as="textarea" rows="3" placeholder="Message"  />
                            </Form.Group>
                        </Form>
                        </div>
                    <div className='col-sm-3 mx-auto' style={{border:'2px solid #e6e6e6',background:'#f2f2f2',height:'350px', opacity:'1'}}>
                    <Table>
                        <tbody>
                            <tr>
                                <td>Sub-total</td>
                                <td>#300,000</td>
                            </tr>
                            <tr>
                                <td>Estimated</td>
                                <td>#30,000</td>
                            </tr>
                            <tr>
                                <td>Sub-total</td>
                                <td>#300,000</td>
                            </tr>
                            <tr>
                                <td>Shipping</td>
                                <td>#2,000</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td>#332,000</td>
                            </tr>
                        </tbody>
                    </Table>
                        <div className='text-center'><p type='submit' className='p-3' style={{background:'#6F66F8', width:'200px', color:'#FFFFFF'}}>Place Order</p> </div>
                    </div>
                </div>
                   
            </div>
        </>
  );
};

export default CheckoutForm;
