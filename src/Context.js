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
  };

  // componentDidMount() {
  //   axios
  //     .get(`${util.API_BASE_URL}registries/`, {
  //       headers: { Authorization: "Token " + localStorage.getItem("token_id") },
  //     })

  //     .then((res) => {
  //       // console.log(res.data);
  //       if (res.data !== undefined) {
  //         let data = res.data;
  //         for (let i = 0; i < data.length; i++) {
  //           data[i].picture = data[i].picture.replace("image/upload/", "");
  //         }
  //         this.setState({ products: data });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  // handlerChange = (e)=> {
  //   let formField = this.state.formField;
  //   formField[e.target.name] = e.target.value;
  //   this.setState({
  //     formField,
  //   });
  // console.log(formField)
  // }

  // }

  // addToCart = (item) => {
  //   let itemsInCart = this.state.itemsInCart;
  //   itemsInCart.push(this.props.items[item.id]);
  //   shoppingProducts[item.id].inCart = true;
  //   shoppingProducts[item.id].quantityInCart = 1;
  //   this.setState({
  //     quantity: this.state.quantity + 1,
  //     amountToPay: this.state.amountToPay + this.props.items[item.id].price,
  //     itemsInCart: itemsInCart,
  //     items: shoppingProducts,
  //   });
  // };
  // removeFromCart = (item, indexInCart) => {
  //   let itemsInCart = this.state.itemsInCart;
  //   shoppingProducts[item.id].inCart = false;
  //   shoppingProducts[item.id].quantityInCart = 0;
  //   itemsInCart.splice(indexInCart, 1);
  //   this.setState({
  //     quantity: this.state.quantity - 1,
  //     amountToPay: this.state.amountToPay - this.props.items[item.id].price,
  //     itemsInCart: itemsInCart,
  //     items: shoppingProducts,
  //   });
  // };

  // addToCart = (id) => {
  //   let tempProducts = [...this.state.products];
  //   const index = tempProducts.indexOf(this.getItem(id));
  //   const product = tempProducts[index];
  //   product.inCart = true;
  //   product.count = 1;
  //   const price = product.price;
  //   product.total = price;
  //   this.setState(
  //     () => {
  //       return { products: tempProducts, cart: [...this.state.cart, product] };
  //     },
  //     () => {
  //       this.addTotals();
  //     }
  //   );
  // };
  handleQuantityChange = (e) => {
    this.setState({ quantity: e.target.value });
    // console.log(e.target.value);
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
          handleQuantityChange: this.handleQuantityChange,
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
