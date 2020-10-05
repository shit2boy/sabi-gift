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
      trxref: "",
      reference: "",
    };
  }

  componentDidMount() {
    const query = new URLSearchParams(window.location.search);
    const trxref = query.get("trxref");
    const ref_code = query.get("reference");
    if (trxref) {
      this.setState({ trxref: trxref });
    }
    if (ref_code) {
      this.setState({ reference: ref_code });
    }
    const refCode = {
      ref_code: ref_code,
    };
    axios
      .post(`${util.API_BASE_URL}verify-order/`, refCode, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        // console.log(data);
        this.setModalShow();
        window.localStorage.removeItem("InCart");
        window.localStorage.removeItem("totalSum");
        window.localStorage.removeItem("cartList");
        window.localStorage.removeItem("customer_id");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setModalHide = () => {
    this.setState({ modalShow: false, modalTitle: "" });
    window.location.href = `/registry/${window.localStorage.slug}`;
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
