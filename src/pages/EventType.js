import React, { Component } from "react";
import backgroundimg from "../images/Sabi-storepage/manageReg.png";
import sabigift from "../images/landing/sabigift.png";
import { StateContext } from "../Context";
import Product from "../components/Product";
import AvailableItems from "../components/AvailableItems";
import util from "../util/util";
import axios from "axios";
import { GrCart } from "react-icons/gr";
import { Link } from "react-router-dom";
import Spinner from "../components/spinner";

const date = new Date();
const formatDate = { day: "numeric", year: "numeric", month: "long" };

class EventType extends Component {
  static contextType = StateContext;

  state = {
    date: date.toLocaleDateString(undefined, formatDate),
    event_type: "",
    event_date: null,
    products: [],
    user: null,
    event_owner: "",
    spouseName: "",
    slug: "",
    dayLeftToEvent: "",
    isPosterImg: false,
    cashGift: [],
    cashNeeded: false,
    title: "",
    poster: null,
    quantity: null,
    loading: false,
    resetFilter: null,
  };

  async componentDidMount() {
    // if (!window.localStorage.token_id) {
    //   window.localStorage.clear();
    // }

    const { handle } = this.props.match.params;
    // console.log(handle);

    await axios
      .get(`${util.API_BASE_URL}events/${handle}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data !== undefined) {
          let data = res.data;
          window.localStorage.setItem("slug", data.slug);
          window.localStorage.setItem("event_owner", data.event_owner);
          window.localStorage.setItem("userId", data.event_owner_id);
          window.localStorage.setItem("event_id", data.id);
          this.setState({
            spouseName: data.spouse_name,
            event_type: data.event_type,
            event_date: data.start_date,
            slug: data.slug,
            title: data.title,
            products: res.data.items,
            resetFilter: res.data.items,
            cashGift: res.data.cash_item,
            loading: true,
          });
          // console.log(data.poster);;
          if (this.state.cashGift.length !== 0) {
            this.setState({ cashNeeded: true });
          }
          data.poster = data.poster.replace("image/upload/", "");
          this.setState({ poster: data.poster, isPosterImg: true });
          window.localStorage.setItem("name", res.data.first_name);

          let event_date = this.state.event_date;
          let dateDifference =
            new Date(event_date).getTime() - new Date().getTime(); //Future date - current date
          let daysTillEventday = Math.floor(
            dateDifference / (1000 * 60 * 60 * 24)
          );
          this.setState({ dayLeftToEvent: daysTillEventday });
        }
      })
      .catch((err) => {
        console.log(err);
        window.localStorage.removeItem("name");
      });
  }

  resetSortToDefault = (e) => {
    e.preventDefault();
    this.setState({ products: this.state.resetFilter });
    // console.log("reset", this.state.products);
  };

  sortByCategory = (cat) => {
    const { products } = this.state;
    // let sortedProduct;
    products.filter((data) => {
      if (cat === data.item["cat"]) {
        console.log(data);
        this.setState({ products: data });
        console.log(this.state.products);
        // return data;
      }
      return this.state.products;
    });
    // this.setState({ products: newList });
    // console.log(newList);
    // return event === item.item["cat"];
  };

  // sortByPrice=(cat)=>{
  //   const items = this.state.products
  //       .filter((data) => {
  //         if (cat === null) {
  //           return data;
  //         } else if (
  //           data.name.toLowerCase().includes(this.state.search.toLowerCase()) ||
  //           data.description
  //             .toLowerCase()
  //             .includes(this.state.search.toLowerCase())
  //         ) {
  //           return data;
  //         }
  //         return null;
  //       })
  // }

  render() {
    let imgUrl = this.newMethod();
    const poster = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: "1",
      backgroundImage: `url(${imgUrl})`,
      backgroundPosition: "center center",
      backgroundSize: "cover",
      backgroundRepeat: "noRepeat",
      width: "100%",
      position: "relative",
      objectFit: "contain",
      borderRadius: "65px",
      height: "400px",
    };
    const {
      loading,
      // resetSortToDefault,
      // sortByCategory,
      // sortByPrice,
    } = this.state;
    if (!loading) return <Spinner />;
    return (
      <div className="container-fluid">
        <div className="mb-4 d-flex justify-content-between">
          <a href="/home">
            {" "}
            <img src={sabigift} alt="logo" width="75px" />{" "}
          </a>
          <div style={{ position: "relative" }}>
            {" "}
            <Link to="/cart">
              <span
                className="badge-danger"
                style={{ color: "white", font: "16px", position: "absolute" }}
              >
                {this.context.quantity}
              </span>
              <GrCart size="40px" />
            </Link>
          </div>
        </div>
        <div className="mb-5" style={poster}>
          <div>
            <div className="text-center">
              {/* {this.state.spouseName && (
                <h4 className="text-white text-capitalize ">
                  {window.localStorage.event_owner} & {this.state.spouseName}
                </h4>
              )} */}
              <h4 className="text-white text-capitalize">{this.state.title}</h4>
              <p className="text-white">
                {this.state.event_date} ({this.state.dayLeftToEvent} days Left)
              </p>
            </div>
          </div>
        </div>
        <div className=" container-fluid mt-5 ">
          <div className="row ml-auto">
            <div className="col-3 d-none d-lg-block availableItem">
              <AvailableItems
                sort={this.sortByPrice}
                default={this.resetSortToDefault}
                sortByCat={this.sortByCategory}
              />
            </div>
            <div className=" col">
              <Product
                Products={this.state.products}
                showWishList={true}
                cashItem={this.state.cashGift}
                cashNeeded={this.state.cashNeeded}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  newMethod() {
    return this.state.isPosterImg && this.state.poster !== ""
      ? this.state.poster
      : `${backgroundimg}`;
  }
}
export default EventType;
