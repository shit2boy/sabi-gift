import React, { Component } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import util from "../util/util";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class SendInvite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      email: "",
      error: "",
    };
  }

  setModalHide = () => {
    this.setState({ modalShow: false });
  };

  setModalShow = () => {
    this.setState({ modalShow: true });
  };

  errorNotify = () =>
    toast.error("Error processing your request!", { autoClose: 2000 });
  notify = () =>
    toast.success("Invite sent successfully!", { autoClose: 2000 });

  changeHandler = (e) => {
    this.setState({ email: e.target.value, successful: true });
    // console.log(this.state.email);
  };

  validateForm = () => {
    let email = this.state.email;
    let errors = "";
    let emailIsValid = true;
    if (!email) {
      emailIsValid = false;
      errors = "*Please enter your email-ID.";
    }

    if (typeof email !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(email)) {
        emailIsValid = false;
        errors = "*Please enter valid email-ID.";
      }
    }

    this.setState({ error: errors });
    return emailIsValid;
  };

  onAddPartner = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      let event_slug = window.localStorage.slug;
      const addPartner = {
        email: this.state.email,
        event: event_slug,
        inviter: window.localStorage.userId,
      };
      axios
        .post(`${util.API_BASE_URL}event/invite-co-celebrant/`, addPartner, {
          headers: {
            Authorization: "Token " + localStorage.getItem("token_id"),
          },
        })
        .then((data) => {
          if (data.status === 200 || data.status === 201) {
            this.setState({ successful: true });
            this.notify();
          }
        })
        .catch((error) => {
          console.log(error);
          this.errorNotify();
          this.setState({ status: false });
        });
    }
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      let event_slug = window.localStorage.slug;
      const SendInviteDetails = {
        email: this.state.email,
        event: event_slug,
        inviter: window.localStorage.userId,
      };
      axios
        .post(`${util.API_BASE_URL}event/invite-user/`, SendInviteDetails, {
          headers: {
            Authorization: "Token " + localStorage.getItem("token_id"),
          },
        })
        .then((data) => {
          if (data.status === 200 || data.status === 201) {
            this.setState({ successful: true });
            this.notify();
          }
        })
        .catch((error) => {
          console.log(error);
          this.errorNotify();
          this.setState({ status: false });
        });
    }
  };

  render() {
    return (
      <div className="">
        <span onClick={() => this.setModalShow(true)} className="pointer">
          {this.props.button}
        </span>
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.modalShow}
          onHide={() => this.setModalHide(false)}
        >
          <Modal.Header className="text-center" closeButton>
            <span className="pl-4">{this.props.title}</span>
          </Modal.Header>
          <Modal.Body className=" ">
            <div className="container">
              <div className="row justify-content-center">
                <div className="m-3">
                  <Form
                    noValidate
                    onSubmit={
                      this.props.isSabiPartner
                        ? this.onAddPartner
                        : this.onSubmit
                    }
                  >
                    <Form.Group>
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        onChange={this.changeHandler}
                        placeholder={this.props.placeholder}
                        required
                      />
                      <span style={{ color: "#dd2b0e", fontSize: "0.875rem" }}>
                        {this.state.error}
                      </span>
                    </Form.Group>
                    {!this.props.isSabiPartner && (
                      <Button
                        className="mt-3 w-100"
                        variant="success"
                        type="submit"
                        style={{ background: "#58B852", color: "#ffffff" }}
                      >
                        Send Invite
                      </Button>
                    )}
                    {this.props.isSabiPartner && (
                      <Button
                        className="w-100 mt-3"
                        variant="success"
                        type="submit"
                        style={{ background: "#58B852", color: "#ffffff" }}
                      >
                        Invite Co-celebrant
                      </Button>
                    )}
                  </Form>
                  <ToastContainer position="top-center" />
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
