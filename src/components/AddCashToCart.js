import React, { Component } from "react";
import cashFund from "../images/Sabi-storepage/cashFund.jpg";
import { Modal, FormControl, Button, InputGroup, Form } from "react-bootstrap";
import util from "../util/util";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StateContext } from "../Context";

class AddCashToCart extends Component {
  static contextType = StateContext;
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      price: "",
      cashItemId: this.props.itemId,
      addedToCart: false,
      amountNeeded: this.props.price,
      cashCompleted: false,
      error: "",
    };
  }
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
  notify = () => toast.success("successfully created", { autoClose: 2000 });
  errorNotify = () =>
    toast.error("Inputed Amount exceed the amount needed", {
      position: "top-center",
      autoClose: 2000,
    });
  // addCashToCart = (item) => {
  //   let itemsInCart = this.context.itemsInCart;
  //   itemsInCart.push(this.props);
  //   this.setState({
  //     quantity: this.state.quantity + 1,
  //     // amountToPay: this.state.amountToPay + this.props.price,
  //     itemsInCart: itemsInCart,
  //   });
  //   console.log(this.state.quantity);
  //   console.log(this.context.itemsInCart);
  //   console.log(this.state.price);
  // };

  updateContextState = (key, val) => {
    this.setState({ [key]: val });
  };

  validateInputPrice = () => {
    let priceIsValid = true;
    let error;
    let amountNeeded = this.state.amountNeeded;
    let inputAmount = this.state.price;
    if (inputAmount > amountNeeded) {
      priceIsValid = false;
      this.errorNotify();
    }
    if (amountNeeded === 0) {
      priceIsValid = false;
      this.errorNotify();
      this.setState({ cashCompleted: true });
    }
    if (inputAmount === "") {
      priceIsValid = false;
      error = "*This field is required.";
    }
    this.setState({ error });
    return priceIsValid;
  };
  addCashToCart = async () => {
    if (this.validateInputPrice()) {
      window.localStorage.setItem("cashAmount", this.state.price);
      const cash_item = [
        {
          custom_item: this.state.cashItemId,
          item_price: this.state.price,
          evt: window.localStorage.getItem("event_id"),
        },
      ];

      await axios
        .post(`${util.API_BASE_URL}cart/create-cash-cart/`, cash_item)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            this.setState({ addedToCart: true });
            window.localStorage.setItem(
              "CashCart_IDs",
              JSON.stringify(res.data.CashCart_IDs)
            );
            this.notify();
            window.location.href = "/checkout";
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
        <span onClick={() => this.setModalShow(true)}>
          {" "}
          {this.props.button}
        </span>
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
                    <h3 className="text-center">{this.props.name}</h3>
                    <p>Amount needed : #{this.props.price}</p>
                    <hr />

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Total cash Amount:</Form.Label>
                      <span style={{ color: "#dd2b0e", fontSize: "0.875rem" }}>
                        <i>{this.state.error}</i>
                      </span>
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
                        />
                      </InputGroup>
                    </Form.Group>
                  </div>
                  <Button
                    className="mr-3 btn-outline-default"
                    variant="success"
                    onClick={this.addCashToCart}
                    disabled={
                      this.state.addedToCart || this.state.cashCompleted
                    }
                  >
                    Contribute
                  </Button>
                </div>
                {/* <ToastContainer /> */}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default AddCashToCart;
