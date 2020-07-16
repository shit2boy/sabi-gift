import React, { Component } from 'react'
import { Container, Row,Col,Nav,Navbar, NavDropdown } from 'react-bootstrap';
import sabigift from '../images/landing/sabigift.png'
import Card from './Card'
import AvailableItems from './AvailableItems';

// import { Layout } from 'antd';

// const { Header, Footer, Sider, Content } = Layout;

export class NavbarDashboard extends Component {
    render() {
        return (
                <Container >
                    <Navbar collapseOnSelect expand="lg" bg="white" >
                        <Navbar.Brand href="/"><img src={sabigift} alt='logo' width='70px' /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                            <Nav.Link href="#">Dashboard</Nav.Link>
                            <Nav.Link href="#">Manage Regisrty</Nav.Link>
                            <Nav.Link href="#">Checklist</Nav.Link>
                            <Nav.Link href="#">Gift Tracker</Nav.Link>
                           
                            </Nav>
                            <Nav>
                            <Nav.Link href="#deets">
                                <p>Jimi & Johanna's registry</p>
                                <small>setting</small>
                                <small>Preview</small>
                            </Nav.Link>
                            <Nav.Link eventKey={2} href="#memes">
                            <Navbar.Brand href="/"><img className='rounded-circle shadow' width='70px' src={sabigift} alt='logo' /></Navbar.Brand>
                            </Nav.Link>
                            <NavDropdown title="" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <Row >
                        {/* <Col xs lg="1" className='bg-info'> of side</Col> */}
                        <Col xs lg="1" className='bg-info sidebar'>
                        <AvailableItems/>
                        <Card/>
                             of side</Col>
                        <Col className=' content'>
                            hdg
                            <div className='1 bg-warning row justify-content-around'>

                                <div className='bg-warning'>sds</div>
                                <div className='bg-info'>sss</div>
                                <div className='bg-success'>sss</div>
                            </div>
                            <div className='2 bg-info row '>
                                <h3>Next steps to take</h3>
                                <div className='justify-content-between border border-navy'></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>

                            </div>
                            <div className='3 row bg-success '>
                                <h3>Your Registry Checklist</h3>
                                <div className='justify-content-between'>

                                </div>
                            </div>
                            <div className='4 row'>
                                <h3>Add items to your Registry</h3>
                                <Row className=''>
                                    <Col xs lg='1' className='22 sidebar'>
                                        <p>Filter</p>
                                        <div>
                                        <AvailableItems/>  
                                        </div>
                                    </Col>
                                    <Col classname='22'><AvailableItems/></Col>
                                   

                                </Row>

                            </div>
                        </Col>
                    
                    </Row>
                </Container>
           
        )
    }
}

export default NavbarDashboard
