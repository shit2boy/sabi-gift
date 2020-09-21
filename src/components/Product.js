import React, { Component } from "react";
import { Input } from "antd";
// import { GrFavorite } from "react-icons/gr";
import { BsFillGridFill, BsListUl } from "react-icons/bs";
import { Card, Form, Table } from "react-bootstrap";
// import {StateContext} from "../Context"
import axios from "axios";
import util from "../util/util";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import AddToCart from "./AddToCart";
import { StateContext } from "../Context";

const { Search } = Input;

export class Product extends Component {
  static contextType = StateContext;
  constructor() {
    super();
    this.state = {
      eventId: "",
      gift: "",
      addItems: false,
      Products: [],
      selectedIds: [],
      quantity: {},
      filterData: [],
      search: null,
      requestedQuantity: "",
      listDisplay: false,
      cashGift: [],
    };
  }

  handleQuantity = (e) => {
    let quantityNeeded = this.state.quantity;
    //  : ;
    quantityNeeded[e.target.name] = e.target.value;
    this.setState({ quantityNeeded: quantityNeeded });
    // console.log(quantityNeeded);
  };

  addToCart = (data) => {
    let itemsInCart = this.context.itemsInCart;
    itemsInCart.push(data);
    let selectedIds = this.state.selectedIds;
    selectedIds.push(data.item["id"]);
    this.setState({
      selectedIds: selectedIds,
      quantity: this.state.quantity + 1,
    });
  };

  onSearch = (event) => {
    let keyword = event.target.value;
    this.setState({ search: keyword });
  };

  UNSAFE_componentWillReceiveProps(props) {
    // console.log(props.Products);
    this.setState({ Products: props.Products });
    this.setState({ cashGift: props.cashGift });
  }

  getIndexOfProduct = (id) => {
    for (let i = 0; i < this.state.Products.length; i++) {
      if (this.state.Products[i].id === id) {
        return i;
      }
    }

    return -1;
  };

  notify = () => toast.success("Added to registry!", { autoClose: 2000 });
  addGiftToRegistry = (id) => {
    // console.log("clicked" + id);
    // let evtid = this.state.eventId;
    let eventId = window.localStorage.eventIID;
    let quantityNeeded = this.state.quantity;
    this.setState({ quantity: quantityNeeded });
    console.log(quantityNeeded);
    this.setState({ gift: id });
    let addeditem = {
      gifts: [Number(this.state.gift)],
      event: Number(eventId),
      quantity: Number(quantityNeeded["quantity"]),
    };

    axios
      .post(`${util.API_BASE_URL}add-registry/`, addeditem, {
        headers: {
          Authorization: "Token " + localStorage.getItem("token_id"),
        },
      })

      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          this.setState({ addSuccessfully: true });
          let products = this.state.Products;
          products.splice(this.getIndexOfProduct(id), 1);
          this.setState({ Products: products });
          this.notify();
        }
      })
      .catch((err) => {
        console.log(err);
        this.errorNotify();
      });
  };

  errorNotify = () =>
    toast.error("Error! request not processed", { autoClose: 2000 });
  successNotify = () =>
    toast.success("Removed from registry", { autoClose: 2000 });
  removeItemFromRegistry = (id) => {
    // console.log("clicked" + id);
    // let evtid = this.state.eventId;
    let eventId = window.localStorage.eventIID;
    this.setState({ gift: id });
    let addeditem = {
      gifts: Number(this.state.gift),
      event: Number(eventId),
    };

    axios
      .post(`${util.API_BASE_URL}remove-registry/`, addeditem, {
        headers: {
          Authorization: "Token " + localStorage.getItem("token_id"),
        },
      })

      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          this.setState({ addSuccessfully: true });
          let products = this.state.Products;
          products.splice(this.getIndexOfProduct(id), 1);
          this.setState({ Products: products });
          this.successNotify();
        }
      })
      .catch((err) => {
        console.log(err);
        this.errorNotify();
      });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-8">
            <small>7,618 results found in 5ms</small>
          </div>
          <div className="col d-none d-lg-block">
            <select className="p-1">
              <option>Default</option>
              <option>item</option>
              <option>item</option>
            </select>
            <span className="p-2 pointer">
              <BsFillGridFill
                color={!this.state.listDisplay ? "#6F64F8" : ""}
                onClick={() => {
                  this.setState({ listDisplay: false });
                }}
                size="25px"
              />
            </span>
            <span className="pointer p-2">
              <BsListUl
                color={this.state.listDisplay ? "#6F64F8" : ""}
                onClick={() => {
                  this.setState({ listDisplay: true });
                }}
                size="25px"
              />
            </span>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-sm-10 shadow">
            <Search
              placeholder="Search here"
              onChange={(e) => this.onSearch(e)}
            />
          </div>
        </div>
        {!this.state.listDisplay && (
          <div className="row">
            {this.state.Products.filter((data) => {
              if (this.state.search == null) {
                return data.item;
              } else if (
                data.item["name"]
                  .toLowerCase()
                  .includes(this.state.search.toLowerCase()) ||
                data.item["description"]
                  .toLowerCase()
                  .includes(this.state.search.toLowerCase())
              ) {
                return data.item;
              }
              return null;
            }).map((data, index) => {
              return (
                <Card key={index} className="productCards col-sm-3 m-3">
                  <div>
                    <img
                      className="card-img center grow"
                      alt="items"
                      src={data.item["picture"]}
                      id={data.item["id"]}
                    />
                  </div>
                  <p className="card-img-overlay text-danger text-left mt-0 ml-0"></p>
                  <span className="d-block ml-auto">#{data.item["price"]}</span>
                  <Card.Body style={{ minHeight: "50px", padding: "5px" }}>
                    <strong
                      className="d-block"
                      style={{ textOverflow: "ellipsis" }}
                    >
                      {data.item["name"]}
                    </strong>
                    <small>{data.item["description"]}</small>
                  </Card.Body>

                  <div>
                    <small className="ml-1">
                      Requested : {data.item.qty[0]}
                    </small>
                  </div>

                  {this.props.showWishList && (
                    <div className="col p-0 mb-0">
                      <button
                        type="button"
                        id={data.item["id"]}
                        onClick={() => {
                          this.addToCart(data);
                        }}
                        className="col text-center p-2 border-0"
                        style={{
                          background: "#6F64F8",
                          color: "#FFFFFF",
                          borderBottomRightRadius: "8px",
                        }}
                        disabled={
                          this.state.selectedIds.indexOf(data.item["id"]) > -1
                        }
                      >
                        {this.state.selectedIds.indexOf(data.item["id"]) > -1
                          ? "Item in a cart"
                          : "Add to cart"}
                      </button>
                    </div>
                  )}

                  {!this.props.showWishList && !this.props.inRegistry && (
                    <div className=" col p-0 mb-0">
                      <Form.Row>
                        <Form.Control
                          type="number"
                          className="col-3 ml-2 p-1"
                          id={data.item["id"]}
                          name="quantity"
                          min="1"
                          onChange={this.handleQuantity}
                        />

                        <Form.Control
                          onClick={() =>
                            this.addGiftToRegistry(data.item["id"])
                          }
                          id={data.item["id"]}
                          type="button"
                          className="col-8 p-1 mr-0 text-center"
                          style={{ background: "#6F64F8", color: "#FFFFFF" }}
                          value="Add to Registry"
                        />
                      </Form.Row>
                      <div>
                        <small>Requested : {data.item.qty[0]}</small>
                      </div>
                    </div>
                  )}
                  {this.props.inRegistry && (
                    <div className=" col p-0 mb-0">
                      <small
                        onClick={() =>
                          this.removeItemFromRegistry(data.item["id"])
                        }
                        id={data.item["id"]}
                        type="button"
                        className="col p-2 text-center"
                        style={{
                          background: "#6F64F8",
                          color: "#FFFFFF",
                          borderBottomRightRadius: "8px",
                        }}
                      >
                        Remove from registry
                      </small>
                      {/* <AddToCart productId={item.id} image={item.picture} info={item.description} price={item.price} inStock={item.in_stock} button={<span type='button'className='p-1 col-6 text-center'style={{background:'#6F64F8',color : '#FFFFFF', borderBottomRightRadius:'8px'}}>Add to cart</span>}/> */}
                    </div>
                  )}
                </Card>
              );
            })}
            {/* {this.state.cashGift.map((fundItem, index) => (
              <Card key={index} className="productCards col-sm-3 m-3">
                <div>
                  <img
                    className="card-img center grow"
                    alt="items"
                    src={fundItem.image}
                    id={fundItem.id}
                  />
                </div>
                <p className="card-img-overlay text-danger text-left mt-0 ml-0"></p>
                <span className="d-block ml-auto">#{fundItem.price}</span>
                <Card.Body style={{ minHeight: "50px", padding: "5px" }}>
                  <strong
                    className="d-block"
                    style={{ textOverflow: "ellipsis" }}
                  >
                    {fundItem.name}
                  </strong>
                  <small>{fundItem.description}</small>
                </Card.Body>

                <div>
                  <small className="ml-1">
                    contributed : {fundItem.contributed}
                  </small>
                </div>

                {this.props.showWishList && (
                  <div className="col p-0 mb-0">
                    <button
                      type="button"
                      id={fundItem.id}
                      onClick={() => {
                        this.addToCart(fundItem);
                      }}
                      className="col text-center p-2 border-0"
                      style={{
                        background: "#6F64F8",
                        color: "#FFFFFF",
                        borderBottomRightRadius: "8px",
                      }}
                      disabled={
                        this.state.selectedIds.indexOf(fundItem.id) > -1
                      }
                    >
                      {this.state.selectedIds.indexOf(fundItem.id) > -1
                        ? "Item in a cart"
                        : "Add to cart"}
                    </button>
                  </div>
                )}

                {!this.props.showWishList && !this.props.inRegistry && (
                  <div className=" col p-0 mb-0">
                    <Form.Row>
                      <Form.Control
                        type="number"
                        className="col-3 ml-2 p-1"
                        id={fundItem.id}
                        name="quantity"
                        min="1"
                        onChange={this.handleQuantity}
                      />

                      <Form.Control
                        onClick={() => this.addGiftToRegistry(fundItem.id)}
                        id={fundItem.id}
                        type="button"
                        className="col-8 p-1 mr-0 text-center"
                        style={{ background: "#6F64F8", color: "#FFFFFF" }}
                        value="Add to Registry"
                      />
                    </Form.Row>
                    <div>
                      <small>contributed : {fundItem.id}</small>
                    </div>
                  </div>
                )}
                {this.props.inRegistry && (
                  <div className=" col p-0 mb-0">
                    <small
                      onClick={() => this.removeItemFromRegistry(fundItem.id)}
                      id={fundItem.id}
                      type="button"
                      className="col p-2 text-center"
                      style={{
                        background: "#6F64F8",
                        color: "#FFFFFF",
                        borderBottomRightRadius: "8px",
                      }}
                    >
                      Remove from registry
                    </small>
                  </div>
                )}
              </Card>
            ))} */}

            <ToastContainer />
          </div>
        )}
        {this.state.listDisplay && (
          <div className="row justify-center">
            <Table hover>
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>Price</th>
                  <th>Requested</th>
                  <th></th>
                </tr>
              </thead>
              {this.state.Products.filter((data) => {
                if (this.state.search == null) {
                  return data.item;
                } else if (
                  data.item["name"]
                    .toLowerCase()
                    .includes(this.state.search.toLowerCase()) ||
                  data.item["description"]
                    .toLowerCase()
                    .includes(this.state.search.toLowerCase())
                ) {
                  return data.item;
                }
                return null;
              }).map((data, index) => {
                return (
                  <tbody>
                    <tr>
                      <td></td>
                      <td>
                        <img
                          className=" img-fluid center grow"
                          src={data.item["picture"]}
                          width="90px"
                          alt="itemImage"
                        />
                      </td>
                      <td>{data.item["name"]}</td>
                      <td>{data.item["price"]}</td>
                      <td>{data.item.qty[0]}</td>
                      <td></td>
                      <td>
                        {" "}
                        {this.props.showWishList && (
                          <div className="col p-0 mb-0">
                            <button
                              type="button"
                              id={data.item["id"]}
                              onClick={() => {
                                this.addToCart(data);
                              }}
                              className="col text-center p-2 border-0"
                              style={{
                                background: "#6F64F8",
                                color: "#FFFFFF",
                                borderBottomRightRadius: "8px",
                              }}
                              disabled={
                                this.state.selectedIds.indexOf(
                                  data.item["id"]
                                ) > -1
                              }
                            >
                              {this.state.selectedIds.indexOf(data.item["id"]) >
                              -1
                                ? "Item in a cart"
                                : "Add to cart"}
                            </button>
                          </div>
                        )}
                        {!this.props.showWishList && !this.props.inRegistry && (
                          <div className=" col p-0 mb-0">
                            <Form.Row>
                              <Form.Control
                                type="number"
                                className="col-3 ml-2 p-1"
                                id={data.item["id"]}
                                name="quantity"
                                min="1"
                                onChange={this.handleQuantity}
                              />

                              <Form.Control
                                onClick={() =>
                                  this.addGiftToRegistry(data.item["id"])
                                }
                                id={data.item["id"]}
                                type="button"
                                className="col-8 p-1 mr-0 text-center"
                                style={{
                                  background: "#6F64F8",
                                  color: "#FFFFFF",
                                }}
                                value="Add to Registry"
                              />
                            </Form.Row>
                            <div>
                              <small>Requested : {data.item.qty[0]}</small>
                            </div>
                          </div>
                        )}
                        {this.props.inRegistry && (
                          <div className=" col p-0 mb-0">
                            <small
                              onClick={() =>
                                this.removeItemFromRegistry(data.item["id"])
                              }
                              id={data.item["id"]}
                              type="button"
                              className="col p-2 text-center"
                              style={{
                                background: "#6F64F8",
                                color: "#FFFFFF",
                                borderBottomRightRadius: "8px",
                              }}
                            >
                              Remove from registry
                            </small>
                            {/* <AddToCart productId={item.id} image={item.picture} info={item.description} price={item.price} inStock={item.in_stock} button={<span type='button'className='p-1 col-6 text-center'style={{background:'#6F64F8',color : '#FFFFFF', borderBottomRightRadius:'8px'}}>Add to cart</span>}/> */}
                          </div>
                        )}
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </Table>

            <ToastContainer />
          </div>
        )}
      </div>
    );
  }
}

export default Product;

// Product.protoTypes = {
//     product:propTypes.Object({
//         id:propTypes.number,
//         picture:propTypes.string,
//         price:propTypes.string,info: propTypes.string,

//     }).isRequired
// }
