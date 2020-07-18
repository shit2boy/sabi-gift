import React, { Component } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import AvailableItems from "./AvailableItems";
import DashboardNav from "./DashboardNav";
import Avatars from '../images/Sabi-storepage/Avatars.png'
import { imgCardlist,checkList } from "./imageData";
import { GrHome, GrFolder,GrBarChart } from "react-icons/gr";
import {BsFolder,BsAlarm,BsBell} from "react-icons/bs";
import Product from "./Product";


export class NavbarDashboard extends Component {
  render() {

    // const { Search } = Input;

    return (
      <Container fluid>
        <DashboardNav />
        <Row>
          {/* <Col xs lg="1" className='bg-info'> of side</Col> */}
          <Col xs={1} md={1} lg={1} className="ml-4 justify-content-center sidebarMenu">
            <div classname='mt-4'>
                <div className='mt-3 text-center'>
                    <BsBell/>
                </div>
            <div className=' ml-2 mb-4'>
                <img src={Avatars} width='35px' alt='userImage'/>
            </div>
            <div className='ml-2'>
                <div className='py-4'>
                <GrHome size='30px'/>
                </div>
                <div className='py-4'>
                    <BsAlarm size='30px'/>
                </div>
                <div className='py-4'>
                    <GrFolder size='30px'/>
                </div>
                <div className='py-4'>
                    <GrBarChart size='30px'/>
                </div>
                <div className='py-4'>
                    <BsFolder size='30px'/>
                </div>
            </div>
            </div>
           
          </Col>
          <Col className=" content">
            <div>hdg</div>
            <div className="1  row justify-content-around">
              <div className="py-5 text-left">
                <p>Welcome Jimi,</p>
                <p><strong>1 JANUARY, 2002</strong></p>
              </div>
              <div className="bg-info d-flex">
                <div>
                  <div>
                    <p><strong>Cash Gift</strong></p>
                  </div>
                  <div>
                    <p>Gift Received</p>
                  </div>
                </div>
                <div>graph</div>
              </div>
              {/* <div className="bg-success">sss</div> */}
            </div>
            <div className="2  ">
              <h5 className="mt-4 py-4 ">Next steps to take</h5>
              <div className="row justify-content-around ">
                {imgCardlist.map((item) => (
                  <Card id='myCards' className='shadow' style={{ width: "12rem" }}>
                    <Card.Body>
                      <img className="center" alt="items" src={item.imageUrl} />
                    </Card.Body>
                    <Card.Text>
                      <h6 class="ml-1">{item.id + 1}</h6>
                      <small class="ml-1">
                        Add item to Gift registry{" "}
                        <span className="text-center">+</span>
                      </small>
                    </Card.Text>
                  </Card>
                ))}
              </div>
            </div>
            <div className="mt-5 py-5">
              <h5 className='mb-5'>Your Registry Checklist</h5>
              <div className="row justify-content-around">
              {checkList.map((item) => (
                  <Card id='myCards' style={{ width: "8rem" }}>
                    <Card.Body>
                      <Card.Img className="center rounded-circle" alt="items" src={item.imageUrl} />
                    </Card.Body>
                    <Card.Text>
                        <h6 class="p-1">{item.name}</h6>
                      <small class="p-1">
                          +
                      </small>
                    </Card.Text>
                  </Card>
                ))}
              </div>
            </div>
            <div className="mt-5 py-5 ">
              <h5 className="mb-5 ">Add items to your Registry</h5>
              <Row>
                <Col xs md={3} lg={3} className="22 sidear ">
                  <p>Filter</p>
                  <div className='row'>
                    <div className='mx-auto'>
                    <AvailableItems />
                    </div>
                  </div>
                  
                </Col>
                <Col xs md={9} lg={9} classname=" 22">
                  <Product/>
                 
                 
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default NavbarDashboard;
