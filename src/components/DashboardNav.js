import React, { Component } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import sabigift from "../images/landing/sabigift.png";
import image from "../images/Sabi-storepage/image.png";
import settingIcon from "../images/Sabi-storepage/settingIcon.svg";
import previewIcon from "../images/Sabi-storepage/previewIcon.svg";
import LogOut from "./LogOut";

let style = {
  borderBottom: "1px solid #dddddd",
};

export class DashboardNav extends Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="white" style={style}>
        <Navbar.Brand href="/Dashboard">
          <img src={sabigift} alt="logo" width="70px" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/Dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/manageregistry">Manage Regisrty</Nav.Link>
            <Nav.Link href="/checklist">Checklist</Nav.Link>
            <Nav.Link href="/giftTracker">Gift Tracker</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#">
              <span className="row">
                {" "}
                {window.localStorage.name}'s registry
              </span>
              <span className="mr-2">
                <Link className="text-link" to="/checkout">
                  <img src={settingIcon} alt="icon"></img>
                  <small>setting</small>
                </Link>
              </span>
              <Link className="text-link" to="/registry">
                <span>
                  <img src={previewIcon} alt="icon"></img>
                  <small>Preview</small>
                </span>
              </Link>
            </Nav.Link>
            {/* <Navbar><img className='rounded-circle shadow' width='70px' src={image} alt='userAvatar' /></Navbar> */}
            <NavDropdown
              title={
                <img
                  className="rounded-circle shadow"
                  width="70px"
                  src={image}
                  alt="userAvatar"
                />
              }
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item href="#">Edit Profile</NavDropdown.Item>
              <NavDropdown.Item href="#">Contact Support</NavDropdown.Item>
              <NavDropdown.Item href="#">Knowledge Base</NavDropdown.Item>
              <NavDropdown.Item href="">
                {" "}
                <LogOut logout="Log out" />
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default DashboardNav;
