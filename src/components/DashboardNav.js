import React, { Component } from 'react'
import { Nav,Navbar, NavDropdown } from 'react-bootstrap';
import sabigift from '../images/landing/sabigift.png'
import image from '../images/Sabi-storepage/image.png'
import settingIcon from '../images/Sabi-storepage/settingIcon.svg'
import previewIcon from '../images/Sabi-storepage/previewIcon.svg'



let style={
}

export class DashboardNav extends Component {
    render() {
        return (
                <Navbar collapseOnSelect expand="lg" bg="white" style={style} >
                        <Navbar.Brand href="/Dashboard"><img src={sabigift} alt='logo' width='70px' /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                            <Nav.Link href="/Dashboard">Dashboard</Nav.Link>
                            <Nav.Link href="#">Manage Regisrty</Nav.Link>
                            <Nav.Link href="/checklist">Checklist</Nav.Link>
                            <Nav.Link href="/giftTracker">Gift Tracker</Nav.Link>
                           
                            </Nav>
                            <Nav>
                            <Nav.Link href="#">
                                <span className='row'>Jimi & Johanna's registry</span>
                                <span className='mr-2'><img src={settingIcon} alt='icon'></img><small>setting</small></span>
                                <span><img src={previewIcon} alt='icon'></img><small>Preview</small></span>
                            </Nav.Link>
                            <Nav.Link eventKey={2} href="#memes">
                            <Navbar.Brand href="/Dashboard"><img className='rounded-circle shadow' width='70px' src={image} alt='logo' /></Navbar.Brand>
                            </Nav.Link>
                            <NavDropdown title="" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#">Edit Profile</NavDropdown.Item>
                                <NavDropdown.Item href="#">Contact Support</NavDropdown.Item>
                                <NavDropdown.Item href="#">Knowledge Base</NavDropdown.Item>
                                
                            </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
        )
    }
}

export default DashboardNav
