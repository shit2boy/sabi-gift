import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import CashIcon from "../images/Sabi-storepage/cashFundIcon.svg";
import DashboardNav from "./DashboardNav";
import { BsGift } from "react-icons/bs";
import RegistryBar from "./ProgressBar";
import NextSteps from "./NextSteps";
import SideBar from "./SideBar";
import axios from "axios";
import util from "../util/util";
import { StateContext } from "../Context";
// import CashGift from "../pages/CashGiftPage";

const date = new Date();
const formatDate = { day: "numeric", year: "numeric", month: "long" };

// console.log(date.toLocaleDateString(undefined, options));
export class Dashboard extends Component {
  static contextType = StateContext;

  state = {
    date: date.toLocaleDateString(undefined, formatDate),
    isLogged: false,
    cashRecieved: "",
    giftRecieved: "",
  };

  componentDidMount() {
    if (!window.localStorage.token_id) {
      window.location.href = "/";
    }

    axios

      .get(`${util.API_BASE_URL}events/?user=${window.localStorage.userId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data !== undefined) {
          let data = res.data;
          let cashGift;
          let gifts_received;
          for (let i = 0; i < data.length; i++) {
            // console.log(data[i].cash_gifts);
            // console.log(data[i].gifts_received);
            cashGift = data[i].cash_gifts;
            gifts_received = data[i].gifts_received;
          }

          this.setState({
            cashRecieved: cashGift,
            giftRecieved: gifts_received,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="container-fluid">
        <DashboardNav />
        {/* <hr className="mt-0 mb-0" /> */}
        <Row className="mt-4 mb-3">
          <Col xs={1} md={1} lg={1} className=" d-none d-lg-block ">
            <SideBar />
          </Col>
          <Col className=" content">
            <div className="row justify-content-center">
              <div
                className="col-sm-5 text-left backgrndImg"
                style={{
                  width: "400px",
                  height: "125px",
                  borderRadius: "10px",
                }}
              >
                <p className="text-right text-white">
                  Welcome {window.localStorage.name},
                </p>
                <p className="text-right">
                  <strong>{this.state.date}</strong>
                </p>
              </div>
              <div className="col-sm-4 offset-1 ">
                <div className="">
                  <div className="d-flex justify-content-between align-items-center cashGift mb-3">
                    <div className="p-3">
                      <span className="d-block">
                        <strong>Cash Gift</strong>
                      </span>
                      <small>Value of Cash gifts</small>
                    </div>
                    <div className="d-flex align-items-center p-3">
                      <img src={CashIcon} width="35px" alt="icon" />
                      <div className="ml-3 align-items-center">
                        <span className="badge badge-pill badge-success">
                          cash
                        </span>
                        <p>{this.state.cashRecieved}</p>
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
                        <p>{this.state.giftRecieved}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <RegistryBar number={5} />
            </div>
            <div className="mb-3">
              <h5 className="mt-4 py-4 ">Next steps to take</h5>

              <NextSteps />
            </div>
            {/* <div className="mt-lg-5">
              <CashGift
                button={
                  <Button className="btn-outline-success" variant="default">
                    Add Cash Fund
                  </Button>
                }
              />
            </div> */}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
