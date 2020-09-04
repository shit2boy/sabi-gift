import React, { Component } from "react";
import { Input } from "antd";
// import { GrFavorite } from "react-icons/gr";
import { BsFillGridFill, BsListUl } from "react-icons/bs";
import { Card } from "react-bootstrap";
// import {StateContext} from "../Context"
import axios from "axios";
import util from "../util/util";
// import AddToCart from "./AddToCart";
import { StateContext } from "../Context";

// import { propTypes } from 'prop-types';

const { Search } = Input;

// let productStyle= {
// width : '8rem',
// minHeight: '10rem',
// paddingLeft : '0px',
// paddingRight : '0px',
// boxShadow: '0px 1px 8px #00000022',
// borderRadius: '8px',
// opacity: '1',
// overflow: 'hidden',
// }

export class Product extends Component {
  static contextType = StateContext;
  state = {
    eventId: "",
    gift: "",
    addItems: false,
    Products: [],
    selectedIds: [],
    count: 0,
  };

  addToCart = (item) => {
    let itemsInCart = this.context.itemsInCart;
    itemsInCart.push(item);
    let selectedIds = this.state.selectedIds;
    selectedIds.push(item.id);
    this.setState({ selectedIds: selectedIds });
    console.log(this.context.quantity);
  };

  UNSAFE_componentWillReceiveProps(props) {
    // console.log(props.Products);
    this.setState({ Products: props.Products });
  }

  componentDidMount() {
    axios

      .get(`${util.API_BASE_URL}events/?user=${window.localStorage.userId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data !== undefined) {
          let data = res.data;
          let eventId;
          for (let i = 0; i < data.length; i++) {
            // console.log(data[i].cash_gifts);
            // console.log(data[i].gifts_received);
            eventId = data[i].id;
          }

          this.setState({
            eventId: eventId,
          });
          console.log(eventId);
          window.localStorage.setItem("eventId", eventId);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getIndexOfProduct = (id) => {
    for (let i = 0; i < this.state.Products.length; i++) {
      if (this.state.Products[i].id === id) {
        return i;
      }
    }

    return -1;
  };

  removeGiftFromRegistry = (id) => {
    // console.log("clicked" + id);
    let evtid = this.state.eventId;
    this.setState({ gift: id });
    console.log(this.state.gift);
    const giftId = new FormData();
    giftId.append("gifts", this.state.gift);
    axios
      .patch(`${util.API_BASE_URL}remove-registries/${evtid}/`, giftId, {
        headers: {
          Authorization: "Token " + localStorage.getItem("token_id"),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201)
          console.log(response);
        let products = this.state.Products;
        products.splice(this.getIndexOfProduct(id), 1);
        this.setState({ Products: products });
      })
      .catch((error) => {
        console.dir(error);
      });
  };
  render() {
    return (
      <div className="container-fluid">
        <div className="row mb-1">
          <div className="col-8">
            <small>7,618 results found in 5ms</small>
          </div>
          <div className="col-2 d-none d-lg-block">
            <select className="p-1">
              <option>Default</option>
              <option>item</option>
              <option>item</option>
            </select>
            <span>
              <BsFillGridFill />
            </span>
            <span className="">
              <BsListUl />
            </span>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-sm-10">
            <Search
              placeholder="Search here"
              onSearch={(value) => console.log(value)}
            />
          </div>
        </div>
        <div className="row">
          {this.state.Products.map((item) => (
            <Card key={item.id} className="productCards grow  col-sm-3 m-3">
              <div>
                <img
                  className="card-img center"
                  alt="items"
                  src={item.picture}
                  id={item.id}
                />
              </div>
              <p className="card-img-overlay text-danger text-left mt-0 ml-0"></p>
              <span className="d-block ml-auto">#{item.price}</span>
              <Card.Body style={{ minHeight: "50px", padding: "5px" }}>
                <strong
                  className="d-block"
                  style={{ textOverflow: "ellipsis" }}
                >
                  {item.name}
                </strong>
                <small>{item.description}</small>
              </Card.Body>
              <div></div>
              {this.props.showWishList && (
                <div className="col p-0 mb-0">
                  {/* <span type='button' className='col-6 p-2'style={{background:'#ededed',color :'#2c2c2c'}}><GrFavorite/> Wishlist</span> */}
                  <button
                    type="button"
                    id={item.id}
                    onClick={() => {
                      this.addToCart(item);
                    }}
                    className="col text-center p-2 border-0"
                    style={{
                      background: "#6F64F8",
                      color: "#FFFFFF",
                      borderBottomRightRadius: "8px",
                    }}
                    disabled={this.state.selectedIds.indexOf(item.id) > -1}
                  >
                    {this.state.selectedIds.indexOf(item.id) > -1
                      ? "Item in a cart"
                      : "Add to cart"}
                  </button>

                  {/* <AddToCart
                    productId={item.id}
                    image={item.picture}
                    info={item.description}
                    price={item.price}
                    inStock={item.in_stock}
                    button={
                      <span
                        type="button"
                        className="col text-center p-2"
                        style={{
                          background: "#6F64F8",
                          color: "#FFFFFF",
                          borderBottomRightRadius: "8px",
                        }}
                      >
                        Add to cart
                      </span>
                    }
                  /> */}
                </div>
              )}

              {!this.props.showWishList && (
                <div
                  onClick={() => this.removeGiftFromRegistry(item.id)}
                  className=" col p-0 mb-0"
                >
                  <small
                    id={item.id}
                    type="button"
                    className="col p-2 text-center"
                    style={{ background: "#ededed", color: "#2c2c2c" }}
                  >
                    Remove item
                  </small>
                  {/* <AddToCart productId={item.id} image={item.picture} info={item.description} price={item.price} inStock={item.in_stock} button={<span type='button'className='p-1 col-6 text-center'style={{background:'#6F64F8',color : '#FFFFFF', borderBottomRightRadius:'8px'}}>Add to cart</span>}/> */}
                </div>
              )}
            </Card>
          ))}
        </div>
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
