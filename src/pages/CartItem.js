import React, { Component } from "react";
import { Table } from "react-bootstrap";
import sabigift from "../images/landing/sabigift.png";
import cashFund from "../images/Sabi-storepage/cashFund.jpg";
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
      Itemsquantity: 0,
      quantityObject: {},
      amount: "",
      itemsInCart: [],
      cashInCart: [],
      totalSum: 0,
      cashIdInCart: [],
    };
    this.handleSumbitCart = this.handleSumbitCart.bind(this);
  }

  amountToPyay = () => {
    let sum = 0;
    let productIdInCart = [];
    // let cart = {};
    for (let i = 0; i < this.state.itemsInCart.length; i++) {
      this.setState({ Itemsquantity: this.state.itemsInCart.length });
      let cart = this.state.itemsInCart[i];
      this.setState({ productIdInCart: productIdInCart });
      // console.log(this.state.productIdInCart);
      let quantity =
        this.state.quantityObject["quantity" + cart.item["id"]] === undefined
          ? 1
          : parseInt(this.state.quantityObject["quantity" + cart.item["id"]]);
      let price = parseFloat(cart.item["price"]);
      sum = sum + price * quantity;
      cart = {
        item: cart.item["id"],
        quantity: quantity,
        custom_item: "",
        item_price: "",
        evt: Number(window.localStorage.event_id),
      };

      productIdInCart.push(cart);
      this.setState({ productIdInCart: productIdInCart });
      console.log(this.state.productIdInCart);
    }
    let sumTotal = sum + this.context.totalcash;
    this.setState({ totalSum: sum });
    window.localStorage.setItem("sum", sumTotal);
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
  deleteFromCashCart = (value) => {
    let products = this.context.cashInCart;
    // products.indexOf(value);
    products.splice(products.indexOf(value), 1);
    this.setState({ cashInCart: products });
    // this.amountToPyay();
  };

  componentDidMount() {
    // console.log(props.Products);
    this.setState({
      itemsInCart: this.context.itemsInCart,
      cashInCart: this.context.cashInCart,
    });
    setTimeout(() => this.amountToPyay(), 300);
    setTimeout(() => this.context.totalCashContributed(), 300);
  }
  handleSumbitCart() {
    let cart = [];
    let cartItem = this.state.productIdInCart;
    let cartCash = this.context.cashIdInCart;
    cart = cartItem.concat(cartCash);
    // console.log(cartItem);

    axios
      .post(`${util.API_BASE_URL}cart/create-carts/`, cart, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          window.localStorage.setItem(
            "cartList",
            JSON.stringify(response.data.Cart_IDs)
          );
          console.log(response);
          window.location.href = "/checkout";
        }
      })
      .catch((error) => {
        console.dir(error);
      });
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
            <Link to="/cart">
              <span
                className=" badge badge-danger"
                style={{ color: "white", font: "16px", position: "absolute" }}
              >
                {this.state.Itemsquantity + this.context.allcashGift}
              </span>
              <GrCart size="40px" />
            </Link>
          </div>
        </div>
        <hr />
        <div className="row mt-5 justify-content-center">
          <Table hover>
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
                  <td>{index + 1}</td>
                  <td>
                    {" "}
                    <img
                      src={inCart.item["picture"]}
                      width="80px"
                      alt="giftFromGuest"
                      className="m-4"
                    />
                  </td>
                  <td>{inCart.item["description"]}</td>
                  <td className="text-center">
                    <input
                      type="number"
                      name={"quantity" + inCart.item["id"]}
                      min="1"
                      max={inCart.item.qty[0]}
                      value={
                        this.state.quantityObject[
                          "quantity" + inCart.item["id"]
                        ] === undefined ||
                        isNaN(
                          this.state.quantityObject[
                            "quantity" + inCart.item["id"]
                          ]
                        )
                          ? 1
                          : this.state.quantityObject[
                              "quantity" + inCart.item["id"]
                            ]
                      }
                      onChange={this.handleQuantityChange}
                    />
                  </td>
                  <td>#{inCart.item["price"]}</td>
                  <td>
                    #
                    {this.state.quantityObject[
                      "quantity" + inCart.item["id"]
                    ] === undefined
                      ? inCart.item["price"]
                      : this.state.quantityObject[
                          "quantity" + inCart.item["id"]
                        ] * inCart.item["price"]}
                  </td>
                  <td
                    className="pointer"
                    onClick={() => {
                      this.removeFromCart(inCart);
                    }}
                  >
                    delete Item
                  </td>
                </tr>
              ))}
              {this.state.cashInCart.map((inCart, index) => (
                <tr key={index}>
                  <td></td>
                  <td>
                    {" "}
                    <img
                      src={cashFund}
                      width="80px"
                      alt="cashFromGuest"
                      className="m-4"
                    />
                  </td>
                  <td>{inCart.description}</td>
                  <td className="text-center">
                    {/* <input
                      type="number"
                      name={"quantity" + inCart.id}
                      min="1"
                      max={inCart.price}
                      value={
                        this.state.quantityObject["quantity" + inCart.id] ===
                          undefined ||
                        isNaN(this.state.quantityObject["quantity" + inCart.id])
                          ? 1
                          : this.state.quantityObject["quantity" + inCart.id]
                      }
                      onChange={this.handleQuantityChange}
                    /> */}
                  </td>
                  <td>#{this.context.cashDonated["cash" + inCart.id]}</td>
                  <td>#{this.context.cashDonated["cash" + inCart.id]}</td>
                  <td
                    className="pointer"
                    onClick={() => {
                      this.deleteFromCashCart(inCart);
                    }}
                  >
                    delete Item
                  </td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Total</td>
                <td>#{this.state.totalSum + this.context.totalcash}</td>
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
