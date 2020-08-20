import React, { Component } from "react";
// import { ProductItems } from "./components/imageData";

const StateContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    Cart: [],
    // eventType: "",
    registryCategory: [],
    selected: [],
  };
  // handlerChange = (e)=> {
  //   let formField = this.state.formField;
  //   formField[e.target.name] = e.target.value;
  //   this.setState({
  //     formField,
  //   });
  // console.log(formField)
  // }

  // }
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

  //   componentDidMount() {
  //     this.setProducts();
  //   }
  // setProducts = () =>{
  //   let tempProducts=[];
  //   ProductItems.forEach(item =>{
  //     const singleItem = {...item};
  //     tempProducts = [...tempProducts,singleItem]
  //   })
  //   this.setState(()=>{
  //     return {products:tempProducts}})

  // }

  render() {
    return (
      <StateContext.Provider
        value={{
          ...this.state,
          handleSelectOpt: this.handleSelectOpt,
          handleEventType: this.handleEventType,
          // addToCart : this.addToCart,
          // wishist : this.wishlist,
          // handleItemDetails : this.handleItemDetails,
        }}
      >
        {this.props.children}
      </StateContext.Provider>
    );
  }
}
const ProductConsumer = StateContext.Consumer;
export { ProductProvider, ProductConsumer, StateContext };
