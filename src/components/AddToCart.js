import React, { Component } from "react";
// import smartwatch from '../images/Sabi-storepage/smartwatch.jpg'
import { GrFavorite } from "react-icons/gr";
import { Modal } from "react-bootstrap";
import util from "../util/util";
import axios from "axios";
import { Rate } from "antd";

class AddToCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      product: this.props.productId,
      quantity: [],
      addedToCart: false,
    };
    this.addToCart = this.addToCart.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  setModalHide = () => {
    this.setState({ modalShow: false });
  };

  setModalShow = () => {
    this.setState({ modalShow: true });
  };
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  addToCart() {
    this.setState({
      quantity: this.state.quantity,
    });
    const { product, quantity } = this.state;

    axios
      .post(
        `${util.API_BASE_URL}carts/`,
        { product, quantity }
        // {
        //   headers: {
        //     Authorization: "Token " + localStorage.getItem("token_id"),
        //   },
        // }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          this.setState({ addedToCart: true });

          // console.log('successfully ');
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(product);
      });
  }

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
                  <div className="mt-4 shadow">
                    <img
                      src={this.props.image}
                      width="100px"
                      className="card-img center"
                      alt="apple-watch"
                    />
                  </div>
                </div>
                <div className="col justify-content-center">
                  <div className="mt-4">
                    <Rate allowHalf defaultValue={4.5} />{" "}
                    <span>1 customer review</span>
                    {/* <h3>Water resistant black coloured Apple watch</h3> */}
                    <h3>{this.props.info}</h3>
                    {this.props.inStock && (
                      <span className="d-block" style={{ color: "#59CF1F" }}>
                        In Stock
                      </span>
                    )}
                    {!this.props.inStock && (
                      <span className="d-block text-muted">Out of Stock</span>
                    )}
                    <div
                      className="d-flex justify-content-between align-items-center mt-4 p-2"
                      style={{
                        border: "2px solid #E2E2E2",
                        borderRadius: "15px",
                        opacity: "1",
                      }}
                    >
                      {/* <p>₦130,099</p> */}
                      <p>#{this.props.price}</p>
                      <div>
                        <select
                          onChange={this.handleChange}
                          className="p-2 mr-1"
                          name="quantity"
                        >
                          <option>0</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                        </select>
                        {!this.state.addedToCart && (
                          <input
                            className="p-2 btn-primary"
                            type="button"
                            onClick={this.addToCart}
                            value="Add to Cart"
                            style={{
                              background: "#6F64F8",
                              borderRadius: "15px",
                              opacity: "1",
                              border: "none",
                            }}
                          />
                        )}
                        {this.state.addedToCart && (
                          <input
                            className="p-2 btn-primary"
                            disabled
                            type="button"
                            onClick={this.addToCart}
                            value="Add to Cart"
                            style={{
                              background: "#dddddd",
                              borderRadius: "15px",
                              opacity: "1",
                              border: "none",
                            }}
                          />
                        )}
                      </div>
                      <GrFavorite size="35" />
                    </div>
                    <div className="mt-5">
                      <p>
                        Delivery:{" "}
                        <span className="ml-1">
                          Lorem ipsum dolor sit amet, consectetuer adipiscing
                          elit. Aenean commodo ligula eget dolor. Aenean massa.
                          Cum soci...
                        </span>
                      </p>
                    </div>
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

export default AddToCart;
