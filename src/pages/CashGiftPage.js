import React, { Component } from "react";
import cashFund from "../images/Sabi-storepage/cashFund.jpg";
import {
  Modal,
  Form,
  FormControl,
  Button,
  InputGroup,
  // ButtonGroup,
} from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsPencil } from "react-icons/bs";
import util from "../util/util";
import axios from "axios";

class CashGift extends Component {
  state = {
    modalShow: false,
    quantity: 0,
    addedToRegistry: false,
    cashOpt: true,
    fundName: "",
    price: "",
    description: "",
    error: "",
    selectedFile: "",
    fileSelected: false,
    uploading: false,
  };

  setModalHide = () => {
    this.setState({ modalShow: false });
  };

  setModalShow = () => {
    this.setState({ modalShow: true });
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    // console.log(e.target.value);
  };

  triggerInputFile = (e) => {
    this.setState({ selectedFile: e.target.files[0], fileSelected: true });
    // console.log(this.state.selectedFile);
    this.setState({ uploading: true });
    // this.handleFileUpload(e);
  };
  // handleFileUpload = (e) => {
  // this.setState({ uploading: true });
  // const backgroundImg = new FormData();
  // backgroundImg.append("image", e.target.files[0]);
  // axios
  //   .patch(`${util.API_BASE_URL}add-item/`, backgroundImg, {
  //     headers: { Authorization: "Token " + localStorage.getItem("token_id") },
  //   })
  //   .then((res) => {
  //     if (res.status === 200) {
  //       this.setState({ fileSelected: false });
  //       // console.log(res.data);
  //       this.notify(res.data.success);
  //     }
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     this.errorNotify(error.message.error);
  //     this.setState({
  //       uploading: false,
  //     });
  //   });
  // };

  validateInput = () => {
    let inputIsValid = true;
    let error;
    if (!this.state.fundName) {
      inputIsValid = false;
      error = "*This field is required.";
    }
    if (!this.state.price) {
      inputIsValid = false;
      error = "*This field is required.";
    }
    if (!this.state.description) {
      inputIsValid = false;
      error = "*This field is required.";
    }
    this.setState({ error });
    return inputIsValid;
  };

  notify = () =>
    toast.success("Gift created successfully", {
      position: "top-center",
      autoClose: 2000,
    });
  errorNotify = () =>
    toast.error("Request not successful", {
      position: "top-center",
      autoClose: 2000,
    });
  addToRegistry = async (e) => {
    if (this.validateInput()) {
      const cashGiftDetails = new FormData();
      cashGiftDetails.append("name", this.state.fundName);
      cashGiftDetails.append("description", this.state.description);
      cashGiftDetails.append("price", this.state.price);
      cashGiftDetails.append("owner", window.localStorage.userId);
      cashGiftDetails.append("event", window.localStorage.slug);
      cashGiftDetails.append("image", this.state.selectedFile);

      axios
        .post(`${util.API_BASE_URL}add-item/`, cashGiftDetails)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            // console.log(res);
            // this.setState({ addedToRegistry: true });
            this.notify();
            // console.log('successfully ');
            this.setState({ fundName: "", price: "", description: "" });
          }
        })
        .catch((error) => {
          console.log(error);
          this.errorNotify();
        });
    }
  };

  render() {
    return (
      <>
        <span onClick={() => this.setModalShow(true)}>{this.props.button}</span>
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.modalShow}
          onHide={() => this.setModalHide(false)}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className=" ">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col">
                  <div className="shadow">
                    <label>
                      <BsPencil />
                      <img
                        src={
                          this.state.uploading
                            ? URL.createObjectURL(this.state.selectedFile)
                            : cashFund
                        }
                        width="100px"
                        className="card-img center"
                        alt="cashFund"
                      />
                      {/* {this.state.uploading && <img
                        src={
                          this.state.uploading
                            ? URL.createObjectURL(this.state.selectedFile)
                            : cashFund
                        }
                        width="100px"
                        className="card-img center"
                        alt="cashFund"
                      />} */}

                      <input
                        type="file"
                        style={{ display: "none" }}
                        name="image"
                        accept="image/jpeg,image/png,image/gif,image/bmp"
                        onChange={(e) => this.triggerInputFile(e)}
                      />
                    </label>
                  </div>
                </div>
                <div className=" col-lg pa2">
                  <div className="">
                    <h3>Add cash fund</h3>
                    <Form.Group controlId="mail">
                      <Form.Label>
                        ITEM NAME<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        onChange={this.handleChange}
                        name="fundName"
                        value={this.state.fundName}
                        type="text"
                        placeholder="Our NewlyWed fund"
                      />
                      <span style={{ color: "#dd2b0e", fontSize: "0.875rem" }}>
                        <i>{this.state.error}</i>
                      </span>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      {/* <Form.Label>LET GUESTS CONTRIBUTE:</Form.Label> */}
                      {/* <ButtonGroup aria-label="Basic example">
                        <Button variant={this.state.cashOpt ? "success" : ""}>
                          Any Amount
                        </Button>
                        <Button variant={!this.state.cashOpt ? "success" : ""}>
                          Fixed Amounts
                        </Button>
                      </ButtonGroup> */}
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Total cash Amount:</Form.Label>
                      <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text id="btnGroupAddon">
                            #
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                          type="number"
                          placeholder="150000"
                          name="price"
                          value={this.state.price}
                          min="150000"
                          onChange={this.handleChange}
                          aria-label="Input group "
                          aria-describedby="btnGroupAddon"
                        />
                        <span
                          style={{ color: "#dd2b0e", fontSize: "0.875rem" }}
                        >
                          <i>{this.state.error}</i>
                        </span>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>NOTE FOR YOUR GUESTS</Form.Label>
                      <Form.Control
                        onChange={this.handleChange}
                        as="textarea"
                        name="description"
                        value={this.state.description}
                        rows="3"
                        placeholder="Tell your guest why you want this item..."
                      />
                      <span style={{ color: "#dd2b0e", fontSize: "0.875rem" }}>
                        <i>{this.state.error}</i>
                      </span>
                    </Form.Group>
                  </div>
                  <div className="d-flex justify-content-lg-end">
                    <Button
                      className="mr-3 btn-outline-success"
                      variant="default"
                      onClick={this.setModalHide}
                    >
                      cancel
                    </Button>
                    <Button
                      className="mr-3 btn-outline-default"
                      variant="success"
                      onClick={(e) => {
                        this.addToRegistry(e);
                      }}
                      disabled={this.state.addedToRegistry}
                    >
                      Add to Registry
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default CashGift;
