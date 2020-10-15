import React, { Component } from "react";
// import { ProductItems } from "./components/imageData";
import axios from "axios";
import util from "./util/util";

const StateContext = React.createContext();

class ProductProvider extends Component {
  state = {
    profileImage: null,
    products: [],
    quantity: 0,
    quantityObject: {},
    amountToPay: 0,
    itemsInCart: [],
    cashInCart: [],
    cashDonated: {},
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
    title: "",
    titles: "",
    spouse_name: "",
    event_date: "",
    userEvent_link: "",
    backgroundImage: "",
    isPosterImg: false,
    cashNeeded: false,
    selectedIds: [],
    inCart: { product: [], cash: [] },
    formValue: "",
    answers: ["", "", ""],
    currentIndex: 0,
  };

  // updateContextState = (key, val) => {
  //   this.setState({ [key]: val });
  // };

  mapValueForLoggedUser = (e) => {
    e.preventDefault();
    // console.log(this.state.formValue);
    // console.log(this.state.currentIndex);
    let value = this.state.formValue;
    let currentIndex = this.state.currentIndex;

    // if (this.state.currentIndex > 3 ) {
    //   this.setState({ currentIndex: currentIndex + 1 });
    //   return;
    // }

    let answers = this.state.answers;
    answers[currentIndex] = value;
    this.setState({ answers: answers });
    // console.dir(this.state);
    // console.log(answers);
    // console.log(this.state.formValue);
    this.setState({ currentIndex: currentIndex + 1 });
    this.setState({ formValue: this.state.answers[currentIndex + 1] });
  };

  handleCashDonated = (e) => {
    let cashDonated = this.state.cashDonated;
    cashDonated[e.target.name] = isNaN(e.target.value) ? 1 : e.target.value;
    this.setState({ cashDonated: cashDonated });
    // this.totalCashContributed();
    // console.log(cashDonated);
  };

  // handleQuantityChange = (e) => {
  //   let quantityObject = this.state.quantityObject;
  //   quantityObject[e.target.name] = isNaN(e.target.value) ? 1 : e.target.value;
  //   this.setState({ quantityObject: quantityObject });
  //   this.amountToPyay();
  //   // console.log(e.target.value);
  // };

  // totalCashContributed = () => {
  //   let sum = 0;
  //   let cashIdInCart = [];
  //   let price;
  //   // let cart = {};
  //   for (let i = 0; i < this.state.inCart["cash"].length; i++) {
  //     this.setState({ allcashGift: this.state.inCart["cash"].length });
  //     let cart = this.state.inCart["cash"][i];

  //     // this.setState({ cashIdInCart: cashIdInCart });
  //     // console.log(this.state.productIdInCart);
  //     // let quantity =
  //     //   this.state.quantityObject["quantity" + cart.item["id"]] === undefined
  //     //     ? 1
  //     //     : parseInt(this.state.quantityObject["quantity" + cart.item["id"]]);
  //     price = parseFloat(cart.amountToContribute);
  //     sum = sum + price;
  //     cart = {
  //       custom_item: cart.id,
  //       item: "",
  //       quantity: "",
  //       item_price: price,
  //       evt: Number(window.localStorage.event_id),
  //     };
  //     cashIdInCart.push(cart);
  //     this.setState({ cashIdInCart: cashIdInCart });
  //     // console.log(this.state.cashIdInCart);
  //     // console.log(cart);
  //   }
  //   this.setState({ cashSum: sum });
  //   console.log(this.state.cashSum);
  //   window.localStorage.setItem("cashSum", this.state.cashSum);
  // };

  async componentDidMount() {
    await axios
      .get(`${util.API_BASE_URL}accounts/profile/`, {
        headers: { Authorization: "Token " + localStorage.getItem("token_id") },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data !== 200) {
          this.setState({ profileImage: res.data.photo });
          // console.log(this.state.profileImage);
          this.setState({ title: res.data.title });
          this.setState({ spouse_name: res.data.spouse_name });
          this.setState({ event_date: res.data.event_date });
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
          let returndata = res.data;
          let data = returndata.sort((a, b) => a.id - b.id);
          // console.log(data);
          this.setState({ userAllEvent: data });
          for (let i = 0; i < data.length; i++) {
            window.localStorage.setItem("slug", data[data.length - 1].slug);
            window.localStorage.setItem("eventIID", data[data.length - 1].id);
            this.setState({ userRegistry: data[data.length - 1].items });
            this.setState({ titles: data[data.length - 1].title });
            this.setState({ userEvent_link: data[data.length - 1].event_link });
            this.setState({ cashGift: data[data.length - 1].cash_item });
            this.setState({ loading: true });

            // console.log(this.state.userEvent_link);
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

  sortByCategory = (event) => {
    const newList = this.state.products.filter((data) => {
      if (event === data.item["cat"]) {
        return data;
      }
      return data;
    });
    this.setState({ products: newList });
    // console.log(newList);
    // return event === item.item["cat"];
  };
  // sortByCategory = async (catId) => {
  //   // this.setState({ loading: false });
  //   await axios
  //     .get(`${util.API_BASE_URL}registries/?flt_cat=${catId}`, {
  //       headers: {
  //         Authorization: "Token " + localStorage.getItem("token_id"),
  //       },
  //     })

  //     .then((response) => {
  //       // console.log(response.data);
  //       if (response.data !== undefined) {
  //         let data = response.data;
  //         for (let i = 0; i < data.length; i++) {
  //           data[i].picture = data[i].picture.replace("image/upload/", "");
  //         }
  //         this.setState({ storeproduct: data, loading: true });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
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
    // console.log(this.state.selected);
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
          // totalCashContributed: this.totalCashContributed,
          handleQuantityChange: this.handleQuantityChange,
          sortByPrice: this.sortByPrice,
          resetSortToDefault: this.resetSortToDefault,
          sortByCategory: this.sortByCategory,
          // sortByCategry: this.sortByCategry,
          handleCashDonated: this.handleCashDonated,
          mapValueForLoggedUser: this.mapValueForLoggedUser,
        }}
      >
        {this.props.children}
      </StateContext.Provider>
    );
  }
}
const ProductConsumer = StateContext.Consumer;
export { ProductProvider, ProductConsumer, StateContext };
