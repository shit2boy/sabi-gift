import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import util from "../util/util";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      modalTitle: "",
    };
  }

  componentDidMount() {
    let reference = window.localStorage.getItem("reference");
    axios
      .post(`${util.API_BASE_URL}verify-order/`, reference, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log(data);
        this.setModalShow();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setModalHide = () => {
    this.setState({ modalShow: false, modalTitle: "" });
    window.location.href = "/";
  };

  setModalShow = () => {
    this.setState({ modalShow: true });
  };
  render() {
    return (
      <>
        <Modal
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.modalShow}
          onHide={() => this.setModalHide(false)}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className=" ">
            <div className=" d-flex justify-content-center align-items-center">
              <p>Thank You for your Order</p>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default Login;
