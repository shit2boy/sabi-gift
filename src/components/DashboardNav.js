import React, { Component } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import sabigift from "../images/landing/sabigift.png";
import image from "../images/Sabi-storepage/image.png";
import settingIcon from "../images/Sabi-storepage/settingIcon.svg";
import previewIcon from "../images/Sabi-storepage/previewIcon.svg";
import LogOut from "./LogOut";
import axios from "axios";
import util from "../util/util";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let style = {
  borderBottom: "1px solid #dddddd",
};

export class DashboardNav extends Component {
  constructor() {
    super();
    this.state = {
      selectedFile: null,
      fileSelected: false,
      uploading: false,
    };
  }

  triggerInputFile = (e) => {
    this.setState({ selectedFile: e.target.files[0], fileSelected: true });
    // console.log(this.state.selectedFile);
    this.handleFileUpload(e);
  };

  notify = (res) => toast.success(res, { autoClose: 2000 });
  errorNotify = (res) => toast.error(res, { autoClose: 2000 });

  handleFileUpload = (e) => {
    this.setState({ uploading: true });
    const backgroundImg = new FormData();
    backgroundImg.append("photo", e.target.files[0]);
    axios
      .patch(`${util.API_BASE_URL}accounts/profile/`, backgroundImg, {
        headers: { Authorization: "Token " + localStorage.getItem("token_id") },
      })
      .then((res) => {
        if (res.status === 200) {
          this.setState({ fileSelected: false });
          // console.log(res.data);
          this.notify(res.data.success);
        }
      })
      .catch((error) => {
        console.log(error);
        this.errorNotify(error.message.error);
        this.setState({
          uploading: false,
        });
      });
  };
  render() {
    // let profileImage= this.state.imageProfile ? `${image}`
    return (
      <Navbar collapseOnSelect expand="lg" bg="white" style={style}>
        <Navbar.Brand href="/manageregistry">
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
              {/* <span className="mr-2"> */}
              <Link className="text-link mr-2" to="/editprofile">
                <img src={settingIcon} alt="icon" />
                <small>setting</small>
              </Link>
              {/* </span> */}
              <Link
                className="text-link"
                to={{ pathname: `registry/${window.localStorage.slug}` }}
              >
                <span>
                  <img src={previewIcon} alt="icon" />
                  <small>Preview</small>
                </span>
              </Link>
            </Nav.Link>
            <NavDropdown id="collasible-nav-dropdown">
              {/* <NavDropdown.Item href="#">Edit Profile</NavDropdown.Item> */}

              <NavDropdown.Item href="#">Contact Support</NavDropdown.Item>
              <NavDropdown.Item href="#">Knowledge Base</NavDropdown.Item>
              <NavDropdown.Item href="">
                <LogOut logout="Log out" />
              </NavDropdown.Item>
            </NavDropdown>

            <label>
              <img
                className="rounded-circle"
                width="70px"
                src={
                  this.state.uploading
                    ? URL.createObjectURL(this.state.selectedFile)
                    : image
                }
                alt="userAvatar"
              />
              <input
                type="file"
                style={{ display: "none" }}
                name="image"
                accept="image/jpeg,image/png,image/gif,image/bmp"
                onChange={(e) => this.triggerInputFile(e)}
              />
            </label>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default DashboardNav;
