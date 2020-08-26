import React, { Component } from "react";
import SideBar from "../components/SideBar";
import DashboardNav from "../components/DashboardNav";
import AvailableItems from "../components/AvailableItems";
import Product from "../components/Product";
import axios from "axios";
import util from "../util/util";

export class RegistryChecklist extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      allRegistry: [],
      emptyRegistry: false,
    };
  }
  componentDidMount() {
    // axios
    //   .get(`${util.API_BASE_URL}registries/`, {
    //     headers: { Authorization: "Token " + localStorage.getItem("token_id") },
    //   })

    //   .then((response) => {
    //     console.log(response.data);
    //     if (response.data !== undefined) {
    //       let data = response.data;
    //       for (let i = 0; i < data.length; i++) {
    //         data[i].picture = data[i].picture.replace("image/upload/", "");
    //       }
    //       this.setState({ allRegistry: data });
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    axios
      .get(`${util.API_BASE_URL}events/?user=23`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data !== undefined) {
          let data = res.data;
          let eventGifts;
          for (let i = 0; i < data.length; i++) {
            // console.log(data[i].gifts);
            eventGifts = data[i].gifts;
            for (let i = 0; i < eventGifts.length; i++) {
              eventGifts[i].picture = eventGifts[i].picture.replace(
                "image/upload/",
                ""
              );
            }
          }
          this.setState({ products: eventGifts });
        }
      })
      .catch((err) => {
        // console.log(err);
        this.setState({ emptyRegistry: true });
      });
  }

  render() {
    return (
      <div className="container-fluid">
        <DashboardNav />
        {/* <hr className='mt-0'/> */}
        <div className="row mt-3">
          <div className="col-1 d-none d-lg-block">
            <SideBar />
          </div>
          <div className="col ml-5">
            <h1> Registry Checklist</h1>
            <p>This is where you manage your registry items.</p>
            <div className="row mt-5">
              <div className=" col-3 d-none d-md-block d-lg-block availableItem">
                <AvailableItems />
              </div>
              <div className="col">
                <Product Products={this.state.products} showWishList={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegistryChecklist;
