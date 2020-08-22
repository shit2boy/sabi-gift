import React, { Component } from "react";
import SideBar from "../components/SideBar";
import { Card } from "react-bootstrap";
import DashboardNav from "../components/DashboardNav";
import kitchen from "../images/Sabi-storepage/kitchen.png";
import CheckList from "../components/AddcheckList";
// import { manageRegistry } from "../components/imageData";
// import AddCategory from '../components/AddCategory'
// import add from "../images/Sabi-storepage/Addicon.jpg";
import axios from "axios";
import util from "../util/util";

export class ManageRegistry extends Component {
  state = {
    registryItem: [],
    spouseName: "",
    dayLeftToEvent: "",
    itemCategory: [],
    Registry: [],
    itemChecked: false,
  };

  componentDidMount() {
    axios
      .get(`${util.API_BASE_URL}accounts/profile/`, {
        headers: { Authorization: "Token " + localStorage.getItem("token_id") },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data !== undefined) {
          window.localStorage.setItem("name", res.data.first_name);
          window.localStorage.setItem("spouseName", res.data.spouse_name);
          window.localStorage.setItem("username", res.data.username);
          window.localStorage.setItem("event_date", res.data.event_date);
          window.localStorage.setItem("event_type", res.data.event_type);
        }
        this.setState({ spouseName: window.localStorage.spouseName });
        let event_date = window.localStorage.event_date;
        let dateDifference =
          new Date(event_date).getTime() - new Date().getTime(); //Future date - current date
        let daysTillEventday = Math.floor(
          dateDifference / (1000 * 60 * 60 * 24)
        );
        // console.log(daysTillEventday);
        this.setState({ dayLeftToEvent: daysTillEventday });
      })
      .catch((err) => {
        // console.log(err);
        window.localStorage.removeItem("name");
        window.localStorage.removeItem("image");
        window.localStorage.removeItem("username");
        window.location.href = "/";
      });

    axios
      .get(`${util.API_BASE_URL}categories/`, {
        headers: { Authorization: "Token " + localStorage.getItem("token_id") },
      })

      .then((response) => {
        // console.log(res.data);
        if (response.data !== undefined) {
          let data = response.data;
          //   let category = [];

          //   for (let i = 0; i < data.length; i++) {
          //     data[i].picture = data[i].picture.replace("image/upload/", "");
          //     if (data[i].cat === "Cooking") {
          //       category.push(data[i].picture);
          //     }
          //   }

          this.setState({ itemCategory: data });
          //   console.log(this.state.itemCategory);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${util.API_BASE_URL}registries/`, {
        headers: { Authorization: "Token " + localStorage.getItem("token_id") },
      })

      .then((res) => {
        // console.log(res.data);
        if (res.data !== undefined) {
          let data = res.data;
          let category = [];

          for (let i = 0; i < data.length; i++) {
            data[i].picture = data[i].picture.replace("image/upload/", "");
            if (data[i].cat === "Cooking") {
              category.push(data[i].picture);
            }
          }

          this.setState({ registryItem: res.data });
          // console.log(this.state.registryItem);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  addToReg = (e) => {
    let item = [];
    if (this.state.Registry.indexOf(e.target.id) === -1) {
      item.push(e.target.id);
      this.setState({ Registry: item, itemChecked: true });
    }

    console.log(this.state.Registry);
  };

  render() {
    const hiddenStyle = {
      display: "none",
    };
    const showStyle = {
      opacity: 1,
    };
    return (
      <div className="container-fluid">
        <DashboardNav />
        <div className="row mt-5">
          <div className="col-1 d-none d-lg-block">
            <SideBar />
          </div>
          <div className="col ml-3">
            <div className="row ">
              <div className="col-12">
                <h1>
                  <strong>Manage Registry</strong>
                </h1>
                <p>This is where you manage your registry items.</p>
              </div>
            </div>
            <div className="row mt-5 ">
              <div
                className="col-12 text-center"
                style={{ height: "100px", border: "1px solid" }}
              >
                <h6 className="py-2">YOUR REGISTRY URL</h6>
                <p>
                  https://sabigift.netlify.app/registry/
                  {window.localStorage.name}2020
                </p>
              </div>

              <div
                className="manageReg text-center mt-4"
                style={{ borderRadius: "25px", height: "250px" }}
              >
                {this.state.spouseName && (
                  <h2 className="py-3 text-white">
                    {window.localStorage.name} &{" "}
                    {window.localStorage.spouseName}
                  </h2>
                )}
                {!this.state.spouseName && (
                  <h2 className="py-3 text-white">
                    {window.localStorage.name}{" "}
                  </h2>
                )}
                <h5 className="py-4 text-white">
                  {window.localStorage.event_date} ({this.state.dayLeftToEvent}{" "}
                  days Left)
                </h5>
              </div>
            </div>
            <div className=" row col" style={{ marginTop: "25px" }}>
              <h5>Your Registry Checklist</h5>
            </div>
            <div className="mt-4 row">
              <div className="col">
                <CheckList itemCategorires={this.state.itemCategory} />
              </div>
            </div>

            <h5 className="mt-4">Add items to your registry</h5>
            {this.state.itemCategory.map((category, index) => (
              <div key={index} className="row" style={{ marginTop: "40px" }}>
                <div className="col-sm-2">
                  <Card
                    id=""
                    style={{
                      width: "8rem",
                      borderRadius: "25px",
                      background: "#6668A3",
                      boxShadow: "0px 30px 60px #BA2F4F41",
                    }}
                  >
                    <Card.Body>
                      <Card.Img
                        className="center rounded-circle"
                        alt="items"
                        src={kitchen}
                        width="60px"
                      />
                    </Card.Body>
                    <Card.Text className="text-center">
                      <small className="p-1">{category.name} Essentials</small>
                      <strong className="d-block p-1">10</strong>
                    </Card.Text>
                  </Card>
                </div>
                <div
                  className="col mb-5"
                  style={{
                    border: "1px solid #CBCBCB",
                    borderRadius: "25px",
                    opacity: "1",
                  }}
                >
                  <div className="row">
                    {this.state.registryItem.map((item, index) => (
                      <div key={index} className="m-3">
                        {item.cat === category.name && (
                          <Card
                            id=""
                            key={index}
                            style={{
                              width: "8rem",
                              cursor: "pointer",
                              border: "1px dotted",
                            }}
                          >
                            <Card.Body className="">
                              <Card.Img
                                id={"ddd" + item.id}
                                onClick={this.addToReg}
                                style={
                                  this.state.Registry.indexOf("ddd" + item.id) >
                                  -1
                                    ? hiddenStyle
                                    : showStyle
                                }
                                className="center rounded-circle"
                                alt="items"
                                width="40px"
                                src={item.picture}
                              />

                              {/* <Card.Img className="center rounded-circle" alt="items" width='40px' src={item} /> */}
                            </Card.Body>
                          </Card>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* <div className="row" style={{ marginTop: "40px" }}>
              <div className="col-sm-2">
                <Card
                  id=""
                  style={{
                    width: "8rem",
                    borderRadius: "25px",
                    background: "#6668A3",
                    boxShadow: "0px 30px 60px #BA2F4F41",
                  }}
                >
                  <Card.Body>
                    <Card.Img
                      className="center rounded-circle"
                      alt="items"
                      src={kitchen}
                      width="60px"
                    />
                  </Card.Body>
                  <Card.Text className="text-center">
                    <small className="p-1">Dining Essentials</small>
                    <strong className="d-block p-1">10</strong>
                  </Card.Text>
                </Card>
              </div>
              <div
                className="col mb-5"
                style={{
                  border: "1px solid #CBCBCB",
                  borderRadius: "25px",
                  opacity: "1",
                }}
              >
                <div className="row">
                  {manageRegistry.map((item, index) => (
                    <div className="m-3">
                      <Card
                        id="myCards"
                        key={index}
                        style={{
                          width: "8rem",
                          cursor: "pointer",
                          border: "1px dashed",
                        }}
                      >
                        <Card.Body className="">
                          <Card.Img
                            className="center rounded-circle"
                            alt="items"
                            width="40px"
                            src={item.imageUrl}
                          />
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div> */}
            {/* <div className="row" style={{ marginTop: "40px" }}>
              <div className="col-sm-2">
                <Card
                  id=""
                  style={{
                    width: "8rem",
                    borderRadius: "25px",
                    background: "#6668A3",
                    boxShadow: "0px 30px 60px #BA2F4F41",
                  }}
                >
                  <Card.Body>
                    <Card.Img
                      className="center rounded-circle"
                      alt="items"
                      src={kitchen}
                      width="60px"
                    />
                  </Card.Body>
                  <Card.Text className="text-center">
                    <small className="p-1">kitchen Essentials</small>
                    <strong className="d-block p-1">10</strong>
                  </Card.Text>
                </Card>
              </div>
              <div
                className="col mb-5"
                style={{
                  border: "1px solid #CBCBCB",
                  borderRadius: "25px",
                  opacity: "1",
                }}
              >
                <div className="row">
                  {manageRegistry.map((item, index) => (
                    <div className="m-3">
                      <Card
                        id="myCards"
                        key={index}
                        style={{
                          width: "8rem",
                          cursor: "pointer",
                          border: "1px dashed",
                        }}
                      >
                        <Card.Body className="">
                          <Card.Img
                            className="center rounded-circle"
                            alt="items"
                            width="40px"
                            src={item.imageUrl}
                          />
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default ManageRegistry;
