import React, { Component } from "react";
// import { ProductItems } from "./components/imageData";
import axios from "axios";
import util from "./util/util";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    startDate: "",
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
    userRegistries: [],
    notification: [],
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
          this.setState({ userAllEvent: data });
          // console.log(this.state.userAllEvent);
          for (let i = 0; i < data.length; i++) {
            window.localStorage.setItem("slug", data[data.length - 1].slug);
            window.localStorage.setItem("eventIID", data[data.length - 1].id);
            window.localStorage.setItem(
              "event_date",
              data[data.length - 1].start_date
            );
            this.setState({ userRegistry: data[data.length - 1].items });
            this.setState({ titles: data[data.length - 1].title });
            this.setState({ startDate: data[data.length - 1].start_date });
            this.setState({ userEvent_link: data[data.length - 1].event_link });
            this.setState({ cashGift: data[data.length - 1].cash_item });
            this.setState({ loading: true });
            data[i].poster = data[data.length - 1].poster.replace(
              "image/upload/",
              ""
            );
            // console.log(data[i].poster);
            this.setState({
              backgroundImage: data[i].poster,
              isPosterImg: true,
            });
            // console.log(this.state.isPosterImg);
            // console.log(this.state.backgroundImage);

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
      .get(
        `${util.API_BASE_URL}user-cats/?user=${window.localStorage.userId}`,
        {
          headers: {
            Authorization: "Token " + localStorage.getItem("token_id"),
          },
        }
      )

      .then((response) => {
        // console.log(res.data);
        if (response.data !== undefined) {
          let data = response.data.success;

          this.setState({ regCategory: data });
          //   console.log(this.state.itemCategory);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    const res = await axios.get(
      `${util.API_BASE_URL}notifications/?event=${window.localStorage.eventIID}`,
      {
        headers: { Authorization: "Token " + localStorage.getItem("token_id") },
      }
    );
    if (Array.isArray(res.data.success)) {
      this.setState({ notification: res.data.success });
      // console.log(res.data.success);
    }
  }

  eventSelected = (reg) => {
    const { userAllEvent } = this.state;
    let regEvent = [];
    let poster;
    userAllEvent.map((event) => {
      if (reg === event) {
        // item.push(e.target.id);
        regEvent.push(event);
      }
      return regEvent;
    });
    this.setState({ userRegistries: regEvent });
    // data = this.state.userRegistries;
    // data = regEvent;
    for (let i = 0; i < regEvent.length; i++) {
      window.localStorage.setItem("slug", regEvent[i].slug);
      window.localStorage.setItem("eventIID", regEvent[i].id);
      window.localStorage.setItem("event_date", regEvent[i].start_date);
      this.setState({ userRegistry: regEvent[i].items });
      this.setState({ titles: regEvent[i].title });
      this.setState({ startDate: regEvent[i].start_date });
      this.setState({ userEvent_link: regEvent[i].event_link });
      this.setState({ cashGift: regEvent[i].cash_item });
      this.setState({ loading: true });
      this.setState({
        backgroundImage: regEvent[i].poster,
        // isPosterImg: true,
      });

      let event_date = regEvent[i].start_date;
      let dateDifference =
        new Date(event_date).getTime() - new Date().getTime(); //Future date - current date
      let dayLeftToEvent = Math.floor(dateDifference / (1000 * 60 * 60 * 24));
      // console.log(daysTillEventday);
      window.localStorage.setItem("dayLeftToEvent", dayLeftToEvent);
      // console.log(this.state.backgroundImage);
      if (this.state.backgroundImage !== null) {
        poster = this.state.backgroundImage.replace("image/upload/", "");
      }
      this.setState({
        backgroundImage: poster,
        // isPosterImg: true,
      });
      // console.log(this.state.backgroundImage);
    }

    // console.log(regEvent);
    // console.log(this.state.userRegistry);
  };

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

  //  notify = (response) => toast.success(response, { autoClose: 2000 });

  handleSelectOpt = (id) => {
    let selectedArrr = this.state.selected;
    const selectedCategory = new FormData();
    selectedCategory.append("cat_id", id);
    selectedCategory.append("user_id", window.localStorage.userId);
    if (this.state.selected.indexOf(id) === -1) {
      selectedArrr.push(id);
      axios
        .post(`${util.API_BASE_URL}user-cat/create/`, selectedCategory, {
          headers: {
            Authorization: "Token " + localStorage.getItem("token_id"),
          },
        })
        .then((response) => {
          if (response.data !== undefined) {
            console.log(response.data);
            this.notify(response.data.succes);
          }
        })
        .catch((err) => {
          console.log(err);
          // notify = (err) => toast.error(err, { autoClose: 2000 });
        });
      this.setState({ selected: selectedArrr });
    } else {
      selectedArrr.splice(this.state.selected.indexOf(id), 1);
      axios
        .post(`${util.API_BASE_URL}user-cat/delete/`, selectedCategory, {
          headers: {
            Authorization: "Token " + localStorage.getItem("token_id"),
          },
        })
        .then((response) => {
          if (response.data !== undefined) {
            console.log(response.data);
            this.notify(response.data.succes);
            console.log(id);
            // notify = (response) => toast.success(response, { autoClose: 2000 });
          }
        })
        .catch((err) => {
          console.log(err);
          // notify = (err) => toast.error(err, { autoClose: 2000 });
        });
      this.setState({ selected: selectedArrr });
    }
    // console.log(this.state.selected);
    this.setState({ clicked: true });
  };

  notify = (res) => toast.success(res, { autoClose: 2000 });

  getIndexOfProduct = (id) => {
    for (let i = 0; i < this.state.userRegistry.length; i++) {
      if (this.state.userRegistry[i].item["name"] === id) {
        return i;
      }
    }

    return -1;
  };

  addGiftToRegistryFromCategory = (id, item, name) => {
    // console.log("clicked" + id);
    // let evtid = this.state.eventId;
    let eventId = window.localStorage.eventIID;
    // console.log(quantityNeeded);
    let addeditem = {
      gifts: [Number(id)],
      event: Number(eventId),
      quantity: 1,
    };

    axios
      .post(`${util.API_BASE_URL}add-registry/`, addeditem, {
        headers: {
          Authorization: "Token " + localStorage.getItem("token_id"),
        },
      })

      .then((res) => {
        // console.log(res.data);
        if (res.status === 200) {
          this.notify(res.data.success);

          axios
            .get(`${util.API_BASE_URL}events/${window.localStorage.slug}`, {
              headers: {
                Authorization: "Token " + localStorage.getItem("token_id"),
              },
            })
            .then((res) => {
              console.log(res.data.items);
              if (res.data !== undefined) {
                this.setState({ userRegistry: res.data.items });
                // let returndata = res.data;
                // let data = returndata.sort((a, b) => a.id - b.id);
                // console.log(this.state.userAllEvent);
                // for (let i = 0; i < data.length; i++) {
                //   this.setState({ userRegistry: data[i].items });
                //   console.log(data[i].items);
                // }
              }
            });

          // let arrObj = {};
          // let itemSelected = this.state.userRegistry;
          // arrObj["item"] = item;
          // if (this.getIndexOfProduct(name) === -1) {
          //   itemSelected.push(arrObj);
          //   this.setState({ userRegistry: itemSelected });
          // }

          // console.log(this.state.userRegistry);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  removeNotification = (id) => {
    axios
      .delete(`${util.API_BASE_URL}notifications/?id=${id}`, {
        headers: {
          Authorization: "Token " + localStorage.getItem("token_id"),
        },
      })

      .then((response) => {
        // console.log(response.data);
        if (response.data !== undefined) {
          let { notification } = this.state;
          // console.log(id);

          notification.splice(this.getIndexOfMessage(id), 1);
          this.setState({ notification });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getIndexOfMessage = (id) => {
    for (let i = 0; i < this.state.notification.length; i++) {
      if (this.state.notification[i].id === id) {
        return i;
      }
    }

    return -1;
  };
  // getItemId = (id) => {
  //   const notification = this.state.notification.find((item) => item.id === id);
  //   return notification;
  // };

  render() {
    return (
      <StateContext.Provider
        value={{
          ...this.state,
          handleSelectOpt: this.handleSelectOpt,
          // totalCashContributed: this.totalCashContributed,
          handleQuantityChange: this.handleQuantityChange,
          eventSelected: this.eventSelected,
          addGiftToRegistryFromCategory: this.addGiftToRegistryFromCategory,
          sortByPrice: this.sortByPrice,
          resetSortToDefault: this.resetSortToDefault,
          sortByCategory: this.sortByCategory,
          // sortByCategry: this.sortByCategry,
          removeNotification: this.removeNotification,
          getIndexOfMessage: this.getIndexOfMessage,
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
