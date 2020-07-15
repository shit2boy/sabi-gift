import React from 'react';
import { Nav, Navbar, } from 'react-bootstrap';
import logo from '../images/landing/sabigift.png';
import account from '../images/landing/account.svg'



function NavigationBar() {
    return (
        <Navbar collapseOnSelect expand="lg" className='bg-white'>
  <Navbar.Brand href="/"><img src={logo}  alt='SabigiftLogo' width='65px'/></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mx-auto" id='navItems'>
      <Nav.Link className="pv-2 ml-2 " href="/">HOME</Nav.Link>
      <Nav.Link className="pv-2 ml-2 " href="#">HOW IT WORKS</Nav.Link>
      <Nav.Link className="pv-2 ml-2 " href="/createRegistry">CREATE REGISTRY</Nav.Link>
      <Nav.Link className="pv-3 ml-2 " href="/Find">FIND AN EVENT</Nav.Link>
    </Nav>
 </Navbar.Collapse>
 <Nav className='ml-auto'><Nav.Link href="#"><img src={account} width='50px' alt='userImage'/></Nav.Link></Nav>
</Navbar>
    )
}

export default NavigationBar



// <div class="navbar-wrapper">
// <div class="container">
//     <div class="navbar navbar-static-top" role="navigation">
//     <div class="container full-width">
//     <div class="navbar-header">
//           <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
//             <span class="sr-only">Toggle navigation</span>
//             <span class="icon-bar"></span>
//             <span class="icon-bar"></span>
//             <span class="icon-bar"></span>
//           </button>
//         <a class="navbar-brand" href="#"></a>
//      </div>
//      <div class="navbar-collapse collapse">
//         <ul class="nav navbar-nav navbar-right">
//             <li class="active"><a href="#home_page">HOME</a></li>
//             <li><a href="#about_page">HOW IT WORKS</a></li>
//             <li><a href="#portfolio_page">CREATE REGISTRY</a></li>
//             <li><a href="#contact_page">FIND AN EVENT</a></li>
//         </ul>
//      </div>
//      </div>
//      </div>
// </div>
// </div>
