import React, { Component } from "react";
import { storeProduct } from "../storeProduct";
// import { Button } from "react-bootstrap";
import "antd/dist/antd.css";
import { Radio } from "antd";
// import Slider from "./Slider";
import { StateContext } from "../Context";
import util from "../util/util";
import axios from "axios";

export class AvailableItems extends Component {
  static contextType = StateContext;
  state = {
    value: 1,
    itemsCategory: [],
  };

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  async componentDidMount() {
    const response = await axios.get(`${util.API_BASE_URL}categories/`);
    console.log(response.data.results);
    this.setState({ itemsCategory: response.data.results });
  }

  render() {
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px",
    };
    const { value } = this.state;
    // const {
    // regCategory,
    // resetSortToDefault,
    // sortByPrice,
    // sortByCategory,
    // } = this.context;

    return (
      <>
        <div className=" container">
          <p className=" pt-4">Multi Range</p>
          <div className="row col-10">
            <Radio.Group>
              <Radio
                onClick={() => {
                  this.props.sort(1000, 9000);
                }}
                style={radioStyle}
                value={2}
              >
                ₦1000- ₦9000
              </Radio>
              <Radio
                onClick={() => {
                  this.props.sort(10000, 25000);
                }}
                style={radioStyle}
                value={3}
              >
                ₦10000 - ₦25000
              </Radio>
              <Radio
                onClick={() => {
                  this.props.sort(30000, 49000);
                }}
                style={radioStyle}
                value={4}
              >
                ₦30000 - ₦50000
              </Radio>
              <Radio onClick={this.props.default} style={radioStyle} value={5}>
                ₦500000 All
              </Radio>
              <Radio onClick={this.props.default} style={radioStyle} value={1}>
                All
              </Radio>
            </Radio.Group>
          </div>
          {/* <div className="row col-10">
            <Slider />
          </div> */}
          <p className="pt-4">Category</p>
          <div className="row col-10">
            <Radio.Group onChange={this.onChange} value={value}>
              {this.state.itemsCategory.map((item) => (
                <Radio
                  onClick={() => {
                    this.props.sortByCat(item.name);
                  }}
                  // onClick={(e) => {
                  //   this.props.sortByCat(item.id);
                  // }}
                  key={item.id}
                  style={radioStyle}
                  value={item.id}
                >
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
