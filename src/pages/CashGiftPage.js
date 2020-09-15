import React, { Component } from "react";
import cashFund from "../images/Sabi-storepage/cashFund.jpg";
import {
  Modal,
  Form,
  FormControl,
  Button,
  InputGroup,
  ButtonGroup,
} from "react-bootstrap";
import util from "../util/util";
import axios from "axios";

class CashGift extends Component {
  state = {
    modalShow: false,
    quantity: 0,
    addedToRegistry: false,
    cashOpt: true,
  };

  setModalHide = () => {
    this.setState({ modalShow: false });
  };

  setModalShow = () => {
    this.setState({ modalShow: true });
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  addedToRegistry = () => {
    this.setState({
      quantity: this.state.quantity,
    });
    const { product, quantity } = this.state;

    axios
      .post(`${util.API_BASE_URL}registry/`, { product, quantity })
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          this.setState({ addedToRegistry: true });

          // console.log('successfully ');
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
                    <img
                      src={cashFund}
                      width="100px"
                      className="card-img center"
                      alt="cashFund"
                    />
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
                        type="text"
                        placeholder="Our NewlyWed fund"
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>LET GUESTS CONTRIBUTE:</Form.Label>
                      <ButtonGroup aria-label="Basic example">
                        <Button variant={this.state.cashOpt ? "success" : ""}>
                          Any Amount
                        </Button>
                        <Button variant={!this.state.cashOpt ? "success" : ""}>
                          Fixed Amounts
                        </Button>
                      </ButtonGroup>
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
                          min="150000"
                          onChange={this.handleChange}
                          aria-label="Input group "
                          aria-describedby="btnGroupAddon"
                        />
                      </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>NOTE FOR YOUR GUESTS (optional)</Form.Label>
                      <Form.Control
                        onChange={this.handleChange}
                        as="textarea"
                        rows="3"
                        placeholder="Tell your guest why you want this item..."
                      />
                    </Form.Group>
                  </div>
                  <div className="d-flex justify-content-lg-end">
                    <Button
                      className="mr-3 btn-outline-success"
                      variant="default"
                    >
                      cancel
                    </Button>
                    <Button
                      className="mr-3 btn-outline-default"
                      variant="success"
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
