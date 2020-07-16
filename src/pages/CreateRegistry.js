import React, { Component } from "react";
import {Link} from 'react-router-dom'
import sabigift from '../images/landing/sabigift.png';
import  ring from "../images/landing/ring.svg";
import  food from "../images/landing/food-and-restaurant.svg";
import { Steps } from 'antd';
import { Container, Row, Col } from "react-bootstrap";

const { Step } = Steps;



export class CreateRegistry extends Component {
    render() {
        return (
        <Container fluid >

                <Row className="" >
                    <Col className="leftside">
                        <div className="">
                            <Link to='/'><img className='homeicon rounded-circle' src={sabigift} alt='SabiGift-Logo'/></Link>
                        </div>
                        <Steps className=''  direction="vertical" current={1}>
                            <Step style={{ color: ' white' }} title="Select Event" />
                            <Step title="Event basics" />
                            <Step title="Select Gifts"  />
                            <Step title="Confirm" />
                        </Steps>
                    </Col>
                    <Col  xs md lg={8} className='rightside'>
                        <div  className='p-4 '>
                            <h3 id='header'>First, Let's Make sure we </h3>
                            <h3 id='header'> support your events</h3>
                        
                            <p className='py-4'>Select the Event type</p>
                            <div className='eventType'>
                                <Link to='/signUp'>
                                    <div className='eventItem'>
                                        <p><img src={ring} alt='weddingIcon' /> </p>
                                        <p>Wedding</p>
                                    </div> 
                                </Link>
                                <Link to='/signUp'>
                                    <div className='eventItem'>
                                        <p><img src={food} alt='weddingIcon' /> </p>
                                        <p>Birthday</p>
                                    </div>    
                                </Link> 
                                <div className='eventItem'>
                                    <p><img src={ring} alt='babyicon' /> </p>
                                    <p>Baby Shower</p>
                                </div> 
                                <div className='eventItem'>
                                    <p><img src={ring} alt='undefine' /> </p>
                                    <p>Not on list</p>
                                </div> 
                            </div>
                            <div className='p-3'>
                                <p>Choose the category that matches your event. If your Event is not Listed,
                                     <br/>Kindly choose others for more options</p>
                            </div>
                        </div>
                            <div className=' d-flex justify-content-around'>
                                <button to='' className='btn btn-light rounded-pill px-5'>Back</button>
                                <Link to='/signUp' className='btn btn-dark rounded-pill px-5'>Next</Link>
                            </div>
               
                    </Col>
                </Row>
            </Container>
      
    ) }
 }

 export default CreateRegistry
