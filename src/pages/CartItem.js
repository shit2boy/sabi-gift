import React, { Component } from "react";
import { Table } from "react-bootstrap";
import sabigift from "../images/landing/sabigift.png";
import util from "../util/util";
import axios from "axios";
import { GrCart } from "react-icons/gr";
import { Link } from "react-router-dom";
import { StateContext } from "../Context";

export default class CartItem extends Component {
  static contextType = StateContext;
  constructor() {
    super();
    this.state = {
      count: 0,
      productIdInCart: [],
      Itemsquantity: [],
      quantityObject: {},
      amount: "",
      itemsInCart: [],
      totalSum: 0,
    };
    this.handleSumbitCart = this.handleSumbitCart.bind(this);
  }

  amountToPyay = () => {
    let sum = 0;
    let productIdInCart = [];
    let cart = {};
    for (let i = 0; i < this.state.itemsInCart.length; i++) {
      let cart = this.state.itemsInCart[i];
      this.setState({ productIdInCart: productIdInCart });
      console.log(this.state.productIdInCart);
      let quantity =
        this.state.quantityObject["quantity" + cart.id] === undefined
          ? 1
          : parseInt(this.state.quantityObject["quantity" + cart.id]);
      let price = parseFloat(cart.price);
      sum = sum + price * quantity;
      cart = {
        item: cart.id,
        quantity: quantity,
        evt: Number(window.localStorage.event_id),
      };

      productIdInCart.push(cart);
      this.setState({ productIdInCart: productIdInCart });
      console.log(this.state.productIdInCart);
    }
    this.setState({ totalSum: sum });
    window.localStorage.setItem("sum", sum);
  };

  handleQuantityChange = (e) => {
    let quantityObject = this.state.quantityObject;
    quantityObject[e.target.name] = isNaN(e.target.value) ? 1 : e.target.value;
    this.setState({ quantityObject: quantityObject });
    this.amountToPyay();
    // console.log(e.target.value);
  };

  removeFromCart = (value) => {
    let products = this.context.itemsInCart;
    // products.indexOf(value);
    products.splice(products.indexOf(value), 1);
    this.setState({ itemsInCart: products });
    this.amountToPyay();
  };

  componentDidMount() {
    // console.log(props.Products);
    this.setState({ itemsInCart: this.context.itemsInCart });
    setTimeout(() => this.amountToPyay(), 300);
  }
  handleSumbitCart() {
    let cart = this.state.productIdInCart;
    axios
      .post(`${util.API_BASE_URL}cart/create-cart/`, cart, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) console.log(response);

        window.location.href = "/checkout";
      })
      .catch((error) => {
        console.dir(error);
      });
    // window.location.href = "/manageregistry";
  }

  render() {
    return (
      <div className="container">
        <div className="mb-4 d-flex justify-content-between">
          <a href="/registry">
            {" "}
            <img src={sabigift} alt="logo" width="75px" />{" "}
          </a>
          <div style={{ position: "relative" }}>
            {" "}
            <span
              className=" badge badge-danger"
              style={{ color: "white", font: "16px", position: "absolute" }}
            >
              {this.state.quantity}
            </span>
            <Link to="/cart">
              <GrCart size="45px" color="red" title="45" />
            </Link>
          </div>
        </div>
        <hr />
        <div className="row mt-5 justify-content-center">
          <Table bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Items</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Sub-total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {this.state.itemsInCart.map((inCart, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>
                    {" "}
                    <img
                      src={inCart.picture}
                      width="80px"
                      alt="giftFromGuest"
                      className="m-4"
                    />
                  </td>
                  <td>{inCart.description}</td>
                  <td className="text-center">
                    <input
                      type="number"
                      name={"quantity" + inCart.id}
                      min="1"
                      max="10"
                      value={
                        this.state.quantityObject["quantity" + inCart.id] ===
                          undefined ||
                        isNaN(this.state.quantityObject["quantity" + inCart.id])
                          ? 1
                          : this.state.quantityObject["quantity" + inCart.id]
                      }
                      onChange={this.handleQuantityChange}
                    />
                  </td>
                  <td>#{inCart.price}</td>
                  <td>
                    {this.state.quantityObject["quantity" + inCart.id] ===
                    undefined
                      ? inCart.price
                      : this.state.quantityObject["quantity" + inCart.id] *
                        inCart.price}
                  </td>
                  <td
                    onClick={() => {
                      this.removeFromCart(inCart);
                    }}
                  >
                    delete
                  </td>
                </tr>
              ))}
              <tr>
                <td>Total</td>
                <td>{this.state.totalSum}</td>
              </tr>
            </tbody>
          </Table>

          <div className=" mt-4 text-center ">
            {/* <Link className="text-link" to="/checkout"> */}
            <span
              onClick={this.handleSumbitCart}
              className="p-3 bg-success text-white pointer"
              style={{ border: "1px solid" }}
            >
              Proceed to check out
            </span>
            {/* </Link> */}
          </div>
        </div>
      </div>
    );
  }
}
