import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import AvailableItems from "./AvailableItems";
import DashboardNav from "./DashboardNav";
import { GiReceiveMoney } from "react-icons/gi";
import { BsGift } from "react-icons/bs";
import Product from "./Product";
import RegistryBar from "./ProgressBar";
import NextSteps from "./NextSteps";
import SideBar from "./SideBar";
import CheckList from "./AddcheckList";
import axios from "axios";
import util from "../util/util";

export class Dashboard extends Component {
  componentDidMount() {
    axios
      .get(`${util.API_BASE_URL}accounts/profile/`, {
        headers: { Authorization: "Token " + localStorage.getItem("token_id") },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data !== undefined) {
          window.localStorage.setItem("name", res.data.first_name);
          window.localStorage.setItem("image", res.data.photo);
          window.localStorage.setItem("username", res.data.username);
        }
      })
      .catch((err) => {
        // console.log(err);
        window.localStorage.removeItem("name");
        window.localStorage.removeItem("image");
        window.localStorage.removeItem("username");
        window.location.href = "/";
      });
  }

  render() {
    return (
      <div className="container-fluid">
        <DashboardNav />
        <hr className="mt-0 mb-0" />
        <Row className="mt-4">
          <Col
            xs={1}
            md={1}
            lg={1}
            className="ml-4 justify-content-center sidebarMenu"
          >
            <SideBar />
          </Col>
          <Col className=" content">
            <div className="row justify-content-around">
              <div
                className="py-5 text-left backgrndImg"
                style={{ width: "500px", height: "150px" }}
              >
                <p className="text-right text-white">
                  Welcome {window.localStorage.name},
                </p>
                <p className="text-right">
                  <strong>1 JANUARY, 2002</strong>
                </p>
              </div>
              <div className="d-flex justify-content-between">
                <div className="px-4" style={{ width: "350px" }}>
                  <div className="d-flex justify-content-between align-items-center cashGift mb-3">
                    <div className="p-3">
                      <span className="d-block">
                        <strong>Cash Gift</strong>
                      </span>
                      <small>Value of Cash gifts</small>
                    </div>
                    <div className="d-flex align-items-center p-3">
                      <GiReceiveMoney size="30px" color="#E6E6E6" />
                      <div className="ml-3 align-items-center">
                        <span className="badge badge-pill badge-success">
                          cash
                        </span>
                        <p>200,000</p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center giftReceived">
                    <div className="p-3">
                      <span className="d-block">
                        <strong>Gift Received</strong>
                      </span>
                      <small>Number of received</small>
                    </div>
                    <div className="d-flex align-items-center p-3">
                      <BsGift size="30px" color="#E6E6E6" />
                      <div className="ml-3 align-items-center">
                        <span className="badge badge-pill badge-primary">
                          Gifts
                        </span>
                        <p>400,000</p>
                      </div>
                    </div>
                  </div>
                </div>
                <RegistryBar number={5} />
              </div>
            </div>
            <div className="2  ">
              <h5 className="mt-4 py-4 ">Next steps to take</h5>

              <NextSteps />
            </div>
            <div className="mt-5 py-5">
              <h5 className="mb-5">Your Registry Checklist</h5>
              <div className="row justify-content-around">
                <CheckList />
              </div>
            </div>
            <div className="mt-5 py-5 ">
              <h5 className="mb-5 ">Add items to your Registry</h5>
              <Row>
                <Col xs md={3} lg={3} className="availableItem">
                  <p>Filter</p>
                  <div className="row">
                    <div className="mx-auto">
                      <AvailableItems />
                    </div>
                  </div>
                </Col>
                <Col xs md={9} lg={9}>
                  <Product showWishList={false} />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
