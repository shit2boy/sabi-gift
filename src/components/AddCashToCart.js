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
      cashItemId: this.props.itemId,
      addedToCart: false,
      amountNeeded: this.props.price,
      cashCompleted: false,
      selectedIds: [],
      error: "",
    };
  }
  setModalHide = () => {
    this.setState({ modalShow: false });
  };

  setModalShow = () => {
    this.setState({ modalShow: true });
  };
  // handleChange = (e) => {
  //   this.setState({ [e.target.name]: e.target.value });
  //   // console.log(e.target.value);
  // };
  notify = () => toast.success("Added to cart. Thanks! ", { autoClose: 2000 });
  AmountExceededNotify = () =>
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
    let amountNeeded = Number(this.props.price);
    let inputAmount = Number(
      this.context.cashDonated["cash" + this.props.itemId]
    );
    if (inputAmount > amountNeeded) {
      priceIsValid = false;
      this.AmountExceededNotify();
    }

    if (!inputAmount || inputAmount <= 0) {
      priceIsValid = false;
      error = "*This field is required.";
    }
    this.setState({ error });
    return priceIsValid;
  };

  addToCart = (data, price) => {
    if (this.validateInputPrice()) {
      // let itemsInCart = [];
      // let cashInCart = this.context.cashInCart;
      // cashInCart.push(data);
      let InCart = this.context.inCart;
      data["amountToContribute"] = price;
      InCart["cash"].push(data);
      window.localStorage.setItem("InCart", JSON.stringify(InCart));
      let selectedIds = this.state.selectedIds;
      selectedIds.push(this.props.itemId);
      this.setState({
        selectedIds: selectedIds,
      });
      this.context.handleQuantityChange();
      this.notify();
      this.setModalHide();
    }
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
        });
    }
  };

  render() {
    const { handleCashDonated } = this.context;
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
                      src={
                        this.props.image === "" || this.props.image === null
                          ? cashFund
                          : this.props.image.replace("image/upload/", "")
                      }
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
                          name={"cash" + this.props.itemId}
                          min="150000"
                          onChange={handleCashDonated}
                          aria-label="Input group "
                        />
                      </InputGroup>
                    </Form.Group>
                  </div>
                  <Button
                    className="mr-3 btn-outline-default"
                    variant="success"
                    // onClick={this.addCashToCart}
                    id={this.props.itemId}
                    onClick={() => {
                      this.addToCart(
                        this.props.data,
                        this.context.cashDonated["cash" + this.props.itemId]
                      );
                    }}
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
