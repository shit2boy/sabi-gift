import React, { Component } from "react";
// import { ProductItems } from "./components/imageData";
// import axios from "axios";
// import util from "./util/util";

const StateContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    quantity: 0,
    amountToPay: 0,
    itemsInCart: [],
    clicked: false,
    registryCategory: [],
    selected: [],
    cart_Ids: [],
    cashAmount: null,
  };

  // updateContextState = (key, val) => {
  //   this.setState({ [key]: val });
  // };

  handleQuantityChange = (e) => {
    this.setState({ quantity: e.target.value });
    console.log(e.target.value);
  };

  handleSelectOpt = (e) => {
    let selectedArrr = this.state.selected;
    if (this.state.selected.indexOf(e.target.id) === -1) {
      selectedArrr.push(e.target.id);
      this.setState({ selected: selectedArrr });
    } else {
      selectedArrr.splice(this.state.selected.indexOf(e.target.id), 1);
      this.setState({ selected: selectedArrr });
    }
    console.log(this.state.selected);
    this.setState({ clicked: true });
  };
  // handleEventType = (e) => {
  //   this.setState({ eventType: e.target.id });
  //   // let type = this.state.eventType
  //   console.log(this.state.eventType);
  // };

  getItemId = (id) => {
    const product = this.state.products.find((item) => item.id === id);
    return product;
  };

  render() {
    return (
      <StateContext.Provider
        value={{
          ...this.state,
          handleSelectOpt: this.handleSelectOpt,
          // handleEventType: this.handleEventType,
          handleQuantityChange: this.handleQuantityChange,
          updateContextState: this.updateContextState,
        }}
      >
        {this.props.children}
      </StateContext.Provider>
    );
  }
}
const ProductConsumer = StateContext.Consumer;
export { ProductProvider, ProductConsumer, StateContext };
