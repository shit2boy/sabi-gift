import React from 'react';
import { Nav, Navbar, } from 'react-bootstrap';
import logo from '../images/landing/sabigift.png';
import Login from '../pages/Login';



function NavigationBar() {
    return (
        <Navbar collapseOnSelect expand="lg" className='bg-white'>
  <Navbar.Brand href="/"><img src={logo}  alt='SabigiftLogo' width='65px'/></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mx-auto" id='navItems'>
      {/* <Nav.Link className="pv-2 ml-2 " href="/">HOME</Nav.Link> */}
      <Nav.Link className="pv-2 ml-2 " href="#">HOW IT WORKS</Nav.Link>
      <Nav.Link className="pv-2 ml-2 " href="/createRegistry">CREATE REGISTRY</Nav.Link>
      <Nav.Link className="pv-3 ml-2 " href="/createRegistry">FIND AN EVENT</Nav.Link>
    </Nav>
 </Navbar.Collapse>
 <Nav className='ml-auto'><Login/></Nav>
</Navbar>
    )
}

export default NavigationBar
