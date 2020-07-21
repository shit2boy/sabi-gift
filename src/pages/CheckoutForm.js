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
            <div>
               <img src={sabigift} alt='logo' /> 
            </div>
                <div className='d-flex justify-content-around'>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Row>
                    <Form.Group as={Col} md="2" controlId="Fname">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                        required
                        type="text"
                        placeholder="First name"
                        />
                        <Form.Control.Feedback type='invalid'>Empty</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="2" controlId="Lname">
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
                    <Form.Group as={Col} md="2" controlId="Lname">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                        required
                        type="tel"
                        placeholder="0000-0000"
                        />
                        <Form.Control.Feedback type='invalid'>Empty</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="2" controlId="Lname">
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
                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                        <Form.Label>Label</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Placeholder text"
                        />
                    </Form.Group>
                    </Form.Row> 
                    <Form.Row>
                    <Form.Group as={Col} md="2" controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" placeholder="City" required />
                        <Form.Control.Feedback type="invalid">
                        Please provide a valid city.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="1" controlId="state">
                        <Form.Label>State</Form.Label>
                        <Form.Control type="text" placeholder="State" required />
                        <Form.Control.Feedback type="invalid">
                        Please provide a valid state.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="1" controlId="Zip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control type="text" placeholder="22789"  />
                    </Form.Group>
                    </Form.Row>
                    <Form.Group  as={Col} md='4'>
                    <Form.Label>Gift info</Form.Label>
                    <Form.Control as="textarea" rows="2" placeholder="Message"  />
                    </Form.Group>
                </Form>
                <div style={{border:'1px solid #ffffff',background:'#dddddd',height:'150px'}}>
                    <Table>
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
                            <td>#1,000</td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td>#331,000</td>
                        </tr>
                    </Table>
                    <Link type='button' className='p-2 center' style={{background:'#6F64F8', width:'100px', color:'#FFFFFF'}}>Place Order</Link>
                </div>
                </div>
        </>
  );
};

export default CheckoutForm;
