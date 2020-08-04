import React, { Component } from 'react'
import { Card } from "react-bootstrap";
import {BsBell} from "react-icons/bs";
import Add from '../images/Sabi-storepage/Add.svg'
import addItem from '../images/Sabi-storepage/addItem.svg'
import invite from '../images/Sabi-storepage/invite.svg'
import manage from '../images/Sabi-storepage/manage.svg'
import setup from '../images/Sabi-storepage/setup.svg'



export class NextSteps extends Component {
    render() {
        return (
            <div className="row justify-content-around ">
                  <Card id='myCards' className='shadow ' style={{ width: "12rem" }}>
                  <Card.Title className='ml-2'><BsBell/></Card.Title>
                    <Card.Body className='stepsCard'></Card.Body>
                    <Card.Footer className='cardFooter'>
                      <strong className="ml-1">1</strong>
                      <img className="ml-1 d-block" src={Add} alt='step1' /> <span className="text-right">+</span>
                    </Card.Footer>
                  </Card>
                  <Card id='myCards' className='shadow ' style={{ width: "12rem" }}>
                  <Card.Title className='ml-2'><BsBell/></Card.Title>
                    <Card.Body className='stepsCard2'></Card.Body>
                    <Card.Footer className='cardFooter'>
                      <strong className="ml-1">2</strong>
                      <img className="ml-1 d-block" src={addItem} alt='step2' /> <span className="text-right">+</span>
                    </Card.Footer>
                  </Card>
                  <Card id='myCards' className='shadow ' style={{ width: "12rem" }}>
                  <Card.Title className='ml-2'><BsBell/></Card.Title>
                    <Card.Body className='stepsCard3'></Card.Body>
                    <Card.Footer className='cardFooter'>
                      <strong className="ml-1">3 </strong>
                      <img className="ml-1 d-block" src={invite} alt='step3' /> <span className="text-right">+</span>
                    </Card.Footer>
                  </Card>
                  <Card id='myCards' className='shadow ' style={{ width: "12rem" }}>
                      <Card.Title className='ml-2'><BsBell/></Card.Title>
                    <Card.Body className='stepsCard4'></Card.Body>
                    <Card.Footer className='cardFooter'>
                      <strong className="ml-1">4</strong>
                      <img className="ml-1 d-block" src={manage} alt='step4' /> <span className="text-right">+</span>
                    </Card.Footer>
                  </Card>
                  <Card id='myCards' className='shadow ' style={{ width: "12rem" }}>
                  <Card.Title className='ml-2'><BsBell/></Card.Title>
                    <Card.Body className='stepsCard5'></Card.Body>
                    <Card.Footer className='cardFooter'>
                      <strong className="ml-1">5 </strong>
                      <img className="ml-1 d-block" src={setup} alt='step5'/> <span className="text-right">+</span>
                    </Card.Footer>
                  </Card>
              </div>
        )
    }
}

export default NextSteps
