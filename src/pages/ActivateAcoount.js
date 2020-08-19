import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import util from "../util/util";
import Login from "../pages/Login";

export default class ActivateAcoount extends Component {
  constructor() {
    super();
    this.state = {
      user_id: "",
      timestamp: "",
      signature: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const { user_id, timestamp, signature } = this.state;
    axios
      .post(
        `${util.API_BASE_URL}accounts/verify-registration/`,
        { user_id, timestamp, signature },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        if (data.status === 200) {
          window.localStorage.setItem("token_id", data.data.token);
          window.localStorage.setItem("username", data.data.email);
          window.location.href = "/login";
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.status === 400) window.location.href = "/";
      });
  }

  componentDidMount() {
    const query = new URLSearchParams(window.location.search);
    const user_id = query.get("user_id");
    const timestamp = query.get("timestamp");
    const signature = query.get("signature");
    if (user_id) {
      this.setState({ user_id: user_id });
    }
    if (timestamp) {
      this.setState({ timestamp: timestamp });
    }
    if (signature) {
      this.setState({ signature: signature });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-lg-10 col-sm">
            <h4 className="p-2 text-center">
              Please verify your account to continue
            </h4>
            <Form noValidate onSubmit={this.onSubmit}>
              <Form.Group>
                <Form.Label>User Id</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={this.state.user_id}
                  readOnly
                  hidden
                  placeholder="Enter user Id"
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Timestamp</Form.Label>
                <Form.Control
                  type="text"
                  name="password"
                  hidden
                  value={this.state.timestamp}
                  readOnly
                  placeholder="Timestamp"
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Signature</Form.Label>
                <Form.Control
                  type="text"
                  name="signature"
                  readOnly
                  hidden
                  value={this.state.signature}
                  placeholder="Signature"
                />
              </Form.Group>
              <Login
                signup={
                  <Button
                    className="w-100 mt-5"
                    variant="success"
                    type="submit"
                    style={{ background: "#58B852", color: "#ffffff" }}
                  >
                    Log in
                  </Button>
                }
              />
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
