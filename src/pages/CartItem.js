import React, { Component } from "react";
import { Table } from "react-bootstrap";
import sabigift from "../images/landing/sabigift.png";
import smartwatch from "../images/Sabi-storepage/smartwatch.jpg";

import { GrCart } from "react-icons/gr";
import { Link } from "react-router-dom";

export default class CartItem extends Component {
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
              0
            </span>
            <Link to="/cart">
              <GrCart size="45px" color="red" title="45" />
            </Link>
          </div>
        </div>
        <hr />
        <div className="row mt-5 justify-content-center">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Items</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Sub-total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  {" "}
                  <img
                    src={smartwatch}
                    width="80px"
                    alt="giftFromGuest"
                    className="m-4"
                  />
                </td>
                <td>Apple watch Series 4 GPS</td>
                <td className="text-center">
                  {/* <input type="number" /> */}
                  <span className="border p-3 pointer">-</span>
                  <span className="border p-3">1</span>
                  <span className="border p-3 pointer">+</span>
                </td>
                <td>#13,000</td>
                <td>#10000</td>
              </tr>
              <tr>
                <td>1</td>
                <td>
                  {" "}
                  <img
                    src={smartwatch}
                    width="80px"
                    alt="giftFromGuest"
                    className="m-4"
                  />
                </td>
                <td>Apple watch Series 4 GPS</td>
                <td className="text-center">
                  {/* <input type="number" /> */}
                  <span className="border p-3 pointer">-</span>
                  <span className="border p-3">1</span>
                  <span className="border p-3 pointer">+</span>
                </td>
                <td>#13,000</td>
                <td>#10000</td>
              </tr>
            </tbody>
          </Table>
          <div className=" mt-4 text-center ">
            <Link className="text-link" to="/checkout">
              <span
                className="p-3 bg-success text-white pointer"
                style={{ border: "1px solid" }}
              >
                Proceed to check out
              </span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
