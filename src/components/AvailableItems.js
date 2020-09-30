import React, { Component } from "react";
import { storeProduct } from "../storeProduct";
// import { Button } from "react-bootstrap";
import "antd/dist/antd.css";
import { Radio } from "antd";
import Slider from "./Slider";
import { StateContext } from "../Context";

export class AvailableItems extends Component {
  static contextType = StateContext;
  state = {
    value: 1,
    itemsCategory: [],
  };

  onChange = (e) => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px",
    };
    const { value } = this.state;
    const { regCategory } = this.context;

    return (
      <>
        <div className=" container">
          <p className=" pt-4">Multi Range</p>
          <div className="row col-10">
            <Radio.Group>
              <Radio style={radioStyle} value={1}>
                ₦1000
              </Radio>
              <Radio style={radioStyle} value={2}>
                ₦10 - ₦10000
              </Radio>
              <Radio style={radioStyle} value={3}>
                ₦100 - ₦50000
              </Radio>
              <Radio style={radioStyle} value={4}>
                ₦500000 All
              </Radio>
              <Radio style={radioStyle} value={5}>
                All
              </Radio>
            </Radio.Group>
          </div>
          <div className="row col-10">
            <Slider />
          </div>
          <p className="pt-4">Category</p>
          <div className="row col-10">
            <Radio.Group onChange={this.onChange} value={value}>
              {regCategory.map((item) => (
                <Radio key={item.id} style={radioStyle} value={item.id}>
                  {item.name}
                </Radio>
              ))}
            </Radio.Group>
          </div>
          <p className="pt-4">Brand</p>
          <div className="row col-10">
            <Radio.Group onChange={this.onChange} value={value}>
              {storeProduct.map((item) => (
                <Radio key={item.id} style={radioStyle} value={item.id}>
                  {item.name}
                </Radio>
              ))}
            </Radio.Group>
          </div>
          <hr />
        </div>
      </>
    );
  }
}

export default AvailableItems;
