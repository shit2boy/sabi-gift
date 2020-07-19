import React, { Component } from 'react'
import { Nav,Navbar, NavDropdown } from 'react-bootstrap';
import sabigift from '../images/landing/sabigift.png'
import image from '../images/Sabi-storepage/image.png'



let style={
    borderButtom: '1px solid #ffffff'
}

export class DashboardNav extends Component {
    render() {
        return (
                <Navbar collapseOnSelect expand="lg" bg="white" style={style} >
                        <Navbar.Brand href="/"><img src={sabigift} alt='logo' width='70px' /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                            <Nav.Link href="#">Dashboard</Nav.Link>
                            <Nav.Link href="#">Manage Regisrty</Nav.Link>
                            <Nav.Link href="#">Checklist</Nav.Link>
                            <Nav.Link href="/giftTracker">Gift Tracker</Nav.Link>
                           
                            </Nav>
                            <Nav>
                            <Nav.Link href="#deets">
                                <span className='row'>Jimi & Johanna's registry</span>
                                <small>setting</small>
                                <small>Preview</small>
                            </Nav.Link>
                            <Nav.Link eventKey={2} href="#memes">
                            <Navbar.Brand href="/"><img className='rounded-circle shadow' width='70px' src={image} alt='logo' /></Navbar.Brand>
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
        )
    }
}

export default DashboardNav
