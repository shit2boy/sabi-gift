import React, { Component } from "react";
import SideBar from "../components/SideBar";
// import { Card } from "react-bootstrap";
import DashboardNav from "../components/DashboardNav";
// import kitchen from "../images/Sabi-storepage/kitchen.png";
import CheckList from "../components/AddcheckList";
import { BsPencil } from "react-icons/bs";
import { Link } from "react-router-dom";
import Product from "../components/Product";
// import AddCategory from '../components/AddCategory'
// import add from "../images/Sabi-storepage/Addicon.jpg";
import axios from "axios";
import util from "../util/util";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Button } from "antd";
import backgroundimg from "../images/Sabi-storepage/manageReg.png";

export class ManageRegistry extends Component {
  constructor() {
    super();
    this.state = {
      registryItem: [],
      spouseName: "",
      dayLeftToEvent: "",
      itemCategory: [],
      addSuccessfully: false,
      Registry: [],
      itemChecked: false,
      eventSlug: "",
      isLoggedIn: false,
      selectedFile: null,
      fileSelected: false,
      isPosterImg: false,
      backgroundImage: "",
    };
  }

  triggerInputFile = (e) => {
    this.setState({ selectedFile: e.target.files[0], fileSelected: true });
    console.log(this.state.selectedFile);
    this.handleFileUpload();
  };

  notify = () => toast.success("Upload success", { autoClose: 2000 });
  errorNotify = () => toast.error("Request not processed", { autoClose: 2000 });

  handleFileUpload = () => {
    const backgroundImg = new FormData();
    backgroundImg.append(
      "poster",
      this.state.selectedFile
      // this.state.selectedFile.name
    );
    let slug = window.localStorage.slug;
    axios
      .patch(`${util.API_BASE_URL}events/${slug}/`, backgroundImg, {
        headers: { Authorization: "Token " + localStorage.getItem("token_id") },
      })
      .then((res) => {
        if (res.status === 200) {
          this.setState({ fileSelected: false });
          let poster = res.data.poster;
          console.log(poster);
          this.notify();
        }
      })
      .catch((error) => {
        console.log(error);
        this.errorNotify();
        this.setState({ status: false });
      });
  };

  componentDidMount() {
    window.localStorage.setItem("isLoggedIn", true);
    axios
      .get(`${util.API_BASE_URL}accounts/profile/`, {
        headers: { Authorization: "Token " + localStorage.getItem("token_id") },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data !== undefined) {
          window.localStorage.setItem("userId", res.data.id);
          window.localStorage.setItem("name", res.data.first_name);
          window.localStorage.setItem("spouseName", res.data.spouse_name);
          window.localStorage.setItem("event_date", res.data.event_date);
          window.localStorage.setItem("username", res.data.username);
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
        window.localStorage.removeItem("spouseName");
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("event_type");
        window.localStorage.removeItem("event_date");
        window.location.href = "/";
      });

    axios
      .get(`${util.API_BASE_URL}categories/`, {
        headers: { Authorization: "Token " + localStorage.getItem("token_id") },
      })

      .then((response) => {
        // console.log(res.data);
        if (response.data !== undefined) {
          let data = response.data.results;

          this.setState({ itemCategory: data });
          //   console.log(this.state.itemCategory);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // axios
    //   .get(`${util.API_BASE_URL}registries/`, {
    //     headers: { Authorization: "Token " + localStorage.getItem("token_id") },
    //   })

    //   .then((res) => {
    // console.log(res.data);
    // if (res.data !== undefined) {
    //   let data = res.data;
    //   let category = [];

    //   for (let i = 0; i < data.length; i++) {
    //     data[i].picture = data[i].picture.replace("image/upload/", "");
    //     if (data[i].cat === "Cooking") {
    //       category.push(data[i].picture);
    //     }
    //   }

    //   this.setState({ registryItem: res.data });
    // console.log(this.state.registryItem);
    //   }
    // })
    // .catch((err) => {
    //   console.log(err);
    // });

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
          window.localStorage.setItem("slug", data.slug);
          let eventSlug;
          let eventIID;
          let eventGifts;
          for (let i = 0; i < data.length; i++) {
            eventSlug = data[data.length - 1].slug;
            eventIID = data[data.length - 1].id;
            data[i].poster = data[data.length - 1].poster.replace(
              "image/upload/",
              ""
            );
            // console.log(data[i].poster);
            this.setState({
              backgroundImage: data[i].poster,
              isPosterImg: true,
            });
            window.localStorage.setItem("slug", eventSlug);
            window.localStorage.setItem("eventIID", eventIID);
            eventGifts = data[i].items;
            // console.log(eventGifts);
          }
          this.setState({ registryItem: eventGifts });
          // console.log(this.state.registryItem);
          this.setState({ eventSlug: eventSlug });
        }
        // console.log(this.state.eventSlug);
      })
      .catch((err) => {
        // console.log(err);
        this.setState({ emptyRegistry: true });
      });
  }

  // addToReg = (e) => {
  //   let item = [];
  //   if (this.state.Registry.indexOf(e.target.id) === -1) {
  //     item.push(e.target.id);
  //     this.setState({ Registry: item, itemChecked: true });
  //     for (let i = 0; i < item.length; i++) {
  //       item[i] = item[i].replace("ddd", "");
  //     }
  //   }
  //   let items = item.map(Number);
  //   let addeditem = {
  //     gifts: items,
  //   };

  // axios
  //   .patch(
  //     `${util.API_BASE_URL}add-registries/${window.localStorage.eventIID}/`,
  //     addeditem,
  //     {
  //       headers: {
  //         Authorization: "Token " + localStorage.getItem("token_id"),
  //       },
  //     }
  //   )

  //   .then((res) => {
  //     console.log(res.data);
  //     if (res.status === 200) {
  //       this.setState({ addSuccessfully: true });
  //       this.notify();
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // };

  render() {
    let imgUrl = this.state.isPosterImg
      ? this.state.backgroundImage
      : `${backgroundimg}`;
    let manageReg = {
      backgroundImage: `url(${imgUrl})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "noRepeat",
      width: "100%",
      position: "relative",
      /* height: 30%; */
      objectFit: "contain",
      borderRadius: "25px",
      height: "250px",
    };

    return (
      <div className="container-fluid">
        <DashboardNav />
        <div className="row mt-5">
          <div className="col-1 d-none d-lg-block">
            <SideBar />
          </div>
          <div className="col ml-3 mb-3">
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
                className="col-12 text-center shadow"
                style={{
                  height: "100px",
                  // border: "1px solid",
                  background: "#FFFFFF",
                }}
              >
                <h6 className="py-2">YOUR REGISTRY URL</h6>
                <p>
                  https://sabigift.netlify.app/registry/
                  {window.localStorage.slug}{" "}
                  <Link to="/editurl">
                    <BsPencil className="ml-2" color="black" size="25px" />
                  </Link>
                </p>
              </div>

              <div className=" text-center mt-4" style={manageReg}>
                <label className="btn bg-white">
                  <BsPencil />
                  <input
                    type="file"
                    style={{ display: "none" }}
                    name="image"
                    accept="image"
                    onChange={this.triggerInputFile}
                  />
                  {/* {this.state.fileSelected && (
                    <input
                      onClick={this.handleFileUpload}
                      type="button"
                      value="upload"
                    />
                  )} */}
                </label>
                <div className="hero-text">
                  {this.state.spouseName && (
                    <h2 className="py-3 text-white">
                      {window.localStorage.name} &{" "}
                      {window.localStorage.spouseName}'s wedding
                    </h2>
                  )}
                  {!this.state.spouseName && (
                    <h2 className="py-3 text-white">
                      {window.localStorage.name}'s birthday
                    </h2>
                  )}
                  <h5 className="py-4 text-white">
                    {window.localStorage.event_date} (
                    {this.state.dayLeftToEvent} days Left)
                  </h5>
                </div>
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
            <Product
              Products={this.state.registryItem}
              showWishList={false}
              inRegistry={true}
            />
            <ToastContainer />
            {/* {this.state.itemCategory.map((category, index) => (
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
                        width="100%"
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
                      <div key={index} className="m-3 d-flex">
                        {item.cat === category.name && (
                          <Card
                            className=" flex-fill"
                            id=""
                            key={index}
                            style={{
                              width: "8rem",
                              cursor: "pointer", 
                              // border: "1px dotted",
                          //   }}
                          // >
                          //   <Card.Body className="grow hide-child">
                          //     <Card.Img
                          //       id={"ddd" + item.id}
                          //       onClick={this.addToReg}
                          //       className="center"
                          //       alt="items"
                          //       width="100%"
                          //       src={item.picture}
                          //     />
                          //     <small className="child">{item.name}</small>
                              {/* <Card.Img className="center rounded-circle" alt="items" width='40px' src={item} /> */}
            {/* </Card.Body>
                            <ToastContainer />
                          </Card>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))} */}
          </div>
        </div>
      </div>
    );
  }
}

export default ManageRegistry;
