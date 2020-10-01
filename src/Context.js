import React, { Component } from "react";
// import { ProductItems } from "./components/imageData";
import axios from "axios";
import util from "./util/util";

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
    loading: false,
    regCategory: [],
    storeproduct: [],
    defaultbtn: null,
    userAllEvent: [],
    userRegistry: [],
    cashGift: [],
    backgroundImage: "",
    isPosterImg: false,
    cashNeeded: false,
    active: false,
  };

  // updateContextState = (key, val) => {
  //   this.setState({ [key]: val });
  // };

  activeOnclick = () => {
    const { active } = this.state;
    this.setState({ active: !active });
    console.log("see me");
  };

  async componentDidMount() {
    await axios
      .get(`${util.API_BASE_URL}accounts/profile/`, {
        headers: { Authorization: "Token " + localStorage.getItem("token_id") },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data !== 200) {
          window.localStorage.setItem("userId", res.data.id);
        }
      })
      .catch((err) => {
        console.log(err);
        window.localStorage.removeItem("userId");
      });

    await axios
      .get(`${util.API_BASE_URL}events/?user=${window.localStorage.userId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res.data);

        if (res.data !== undefined && res.data.length > 0) {
          let data = res.data;
          this.setState({ userAllEvent: data });
          for (let i = 0; i < data.length; i++) {
            // console.log(data[data.length - 1].slug);
            window.localStorage.setItem("slug", data[data.length - 1].slug);
            window.localStorage.setItem("eventIID", data[data.length - 1].id);
            this.setState({ userRegistry: data[data.length - 1].items });
            this.setState({ cashGift: data[data.length - 1].cash_item });
            this.setState({ loading: true });

            // console.log(this.state.registryItem);
            // console.log(this.state.cashGift);
            data[i].poster = data[data.length - 1].poster.replace(
              "image/upload/",
              ""
            );
            // console.log(data[i].poster);
            this.setState({
              backgroundImage: data[i].poster,
              isPosterImg: true,
            });
            if (this.state.cashGift.length > 0) {
              this.setState({ cashNeeded: true });
            }
          }
          // } else {
          //   window.location.href = "/updateprofile";
          // }
        }
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .get(`${util.API_BASE_URL}registries/`, {
        headers: { Authorization: "Token " + localStorage.getItem("token_id") },
      })

      .then((response) => {
        // console.log(response.data);
        if (response.data !== undefined) {
          let data = response.data;
          for (let i = 0; i < data.length; i++) {
            data[i].picture = data[i].picture.replace("image/upload/", "");
          }
          this.setState({ storeproduct: data, loading: true });
          this.setState({ defaultbtn: data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    await axios
      .get(`${util.API_BASE_URL}categories/`, {
        headers: { Authorization: "Token " + localStorage.getItem("token_id") },
      })

      .then((response) => {
        // console.log(res.data);
        if (response.data !== undefined) {
          let data = response.data.results;

          this.setState({ regCategory: data });
          //   console.log(this.state.itemCategory);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  resetSortToDefault = (e) => {
    e.preventDefault();
    this.setState({ storeproduct: this.state.defaultbtn });
  };

  sortByPrice = async (min, max) => {
    await axios
      .get(
        `${util.API_BASE_URL}registries/?min_price=${min}&max_price=${max}`,
        {
          headers: {
            Authorization: "Token " + localStorage.getItem("token_id"),
          },
        }
      )

      .then((response) => {
        // console.log(response.data);
        if (response.data !== undefined) {
          let data = response.data;
          for (let i = 0; i < data.length; i++) {
            data[i].picture = data[i].picture.replace("image/upload/", "");
          }
          this.setState({ storeproduct: data, loading: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  sortByCategory = async (catId) => {
    // this.setState({ loading: false });
    await axios
      .get(`${util.API_BASE_URL}registries/?flt_cat=${catId}`, {
        headers: {
          Authorization: "Token " + localStorage.getItem("token_id"),
        },
      })

      .then((response) => {
        // console.log(response.data);
        if (response.data !== undefined) {
          let data = response.data;
          for (let i = 0; i < data.length; i++) {
            data[i].picture = data[i].picture.replace("image/upload/", "");
          }
          this.setState({ storeproduct: data, loading: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // sortByCategry = (cat) => {
  //   let product = this.state.storeproduct;

  //   product.map((data) => {
  //     if (cat === data.cat) {
  //       this.setState({ storeproduct: data });
  //       console.log(typeof data);
  //     }
  //   });
  // };

  handleQuantityChange = (e) => {
    this.setState({
      quantity: this.state.quantity + 1,
    });
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
          sortByPrice: this.sortByPrice,
          resetSortToDefault: this.resetSortToDefault,
          sortByCategory: this.sortByCategory,
          // sortByCategry: this.sortByCategry,
          activeOnclick: this.activeOnclick,
        }}
      >
        {this.props.children}
      </StateContext.Provider>
    );
  }
}
const ProductConsumer = StateContext.Consumer;
export { ProductProvider, ProductConsumer, StateContext };
