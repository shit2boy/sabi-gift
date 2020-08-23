import React, { Component } from "react";
import SideBar from "../components/SideBar";
import DashboardNav from "../components/DashboardNav";
import AvailableItems from "../components/AvailableItems";
import Product from "../components/Product";
import { StateContext } from "../Context";
import axios from "axios";
import util from "../util/util";

export class RegistryChecklist extends Component {
  static contextType = StateContext;

  componentDidMount() {
    axios
      .get(`${util.API_BASE_URL}events/`, {
        headers: { Authorization: "Token " + localStorage.getItem("token_id") },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data !== undefined) {
          let data = res.data;
          let eventtype;
          for (let i = 0; i < data.length; i++) {
            if (data[i].name === "Wedding") {
              eventtype = data[i].id;
            }
          }
          this.setState({ eventType: eventtype });
        }
        console.log(this.state.eventType);
      })
      .catch((err) => {
        // console.log(err);
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
                <Product
                  Products={this.context.Products}
                  showWishList={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegistryChecklist;
