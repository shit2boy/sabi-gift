import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import util from "../util/util";
import Login from "./Login";
import { Link } from "react-router-dom";
import Home from "./Home";

class VerifyPartner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      modalTitle: "",
      key_code: "",
      expiredLink: false,
      notRegister: false,
      //   reference: "",
    };
  }

  componentDidMount() {
    const query = new URLSearchParams(window.location.search);
    const key_code = query.get("key_code");
    // const ref_code = query.get("reference");
    // if (key_code) {
    //   this.setState({ key_code: key_code });
    //   console.log(this.state.key_code);
    // }
    axios
      .post(
        `${util.API_BASE_URL}event/accept-invite/?key_code=${key_code}`,
        key_code,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response !== undefined) {
          // console.log(response.data.error);
          // console.log(response.data.not_authenticated);
          if (response.data.success === "Invite accepted successfully.") {
            this.setState({ expiredLink: true });
            // this.setState({ notRegister: false });
          }
        }
        this.setModalShow();
      })
      .catch((error) => {
        this.setState({ notRegister: true });
        console.error(error);
      });
  }

  setModalHide = () => {
    this.setState({ modalShow: false, modalTitle: "" });
    window.location.href = `/`;
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
              {!this.state.expiredLink ? (
                <p>Invitation Link expired</p>
              ) : (
                <p>
                  Thank You for Accepting the invitation to Co-manage this Event{" "}
                  <Login
                    signup={
                      <Link to="" className="text-center">
                        Log in to proceed
                      </Link>
                    }
                  />
                </p>
              )}
              {/* <Login signup={<p>Log in</p>} /> */}
            </div>
          </Modal.Body>
        </Modal>

        {this.state.notRegister && (
          //   <div className="d-flex mt-5" style={{ height: "300px" }}>
          //     <p className="  align-items-center">
          //       You dont have an account yet{" "}
          //       <Link to="/" className="text-center">
          //         {" "}
          //         Sign up{" "}
          //       </Link>
          //     </p>
          //   </div>
          <Home />
        )}
      </>
    );
  }
}

export default VerifyPartner;
