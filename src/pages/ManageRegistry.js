import React, { Component } from "react";
import SideBar from "../components/SideBar";
import { ProgressBar } from "react-bootstrap";
import DashboardNav from "../components/DashboardNav";
import CheckList from "../components/AddcheckList";
import { BsPencil } from "react-icons/bs";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import axios from "axios";
import util from "../util/util";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../components/spinner";
import { StateContext } from "../Context";

// import { Button } from "antd";
import backgroundimg from "../images/Sabi-storepage/manageReg.png";

export class ManageRegistry extends Component {
  static contextType = StateContext;
  constructor() {
    super();
    this.state = {
      spouseName: "",
      dayLeftToEvent: "",
      itemCategory: [],
      addSuccessfully: false,
      Registry: [],
      itemChecked: false,
      eventSlug: "",
      isLoggedIn: false,
      selectedFile: "",
      fileSelected: false,
      uploading: false,
      progress: null,

      loading: false,
    };
  }

  triggerInputFile = (e) => {
    this.setState({ selectedFile: e.target.files[0], fileSelected: true });
    console.log(this.state.selectedFile);
    this.handleFileUpload(e);
  };

  notify = (res) => toast.success(res, { autoClose: 2000 });
  errorNotify = (res) => toast.error(res, { autoClose: 2000 });

  handleFileUpload = (e) => {
    this.setState({ uploadLoading: true });
    let slug = window.localStorage.slug;
    // let imageFile = this.state.selectedFile[0];

    const backgroundImg = new FormData();
    backgroundImg.append("poster", e.target.files[0]);
    backgroundImg.append("event", slug);
    axios
      .post(`${util.API_BASE_URL}update-poster/`, backgroundImg, {
        onUploadProgress: (progressEvent) => {
          this.setState({
            progress: Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            ),
            uploading: true,
          });
        },
        headers: { Authorization: "Token " + localStorage.getItem("token_id") },
      })
      .then((res) => {
        if (res.status === 200) {
          this.setState({ fileSelected: false, uploading: false });
          // console.log(res.data);
          this.notify(res.data.success);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
        this.errorNotify(error.message.error);
        this.setState({
          status: false,
          fileSelected: false,
          uploadLoading: false,
        });
      });
  };

  componentDidMount = async () => {
    window.localStorage.setItem("isLoggedIn", true);
    await axios
      .get(`${util.API_BASE_URL}accounts/profile/`, {
        headers: { Authorization: "Token " + localStorage.getItem("token_id") },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data !== 200) {
          // if (!res.data.complete) window.location.href = "/updateprofile";
          // window.localStorage.setItem("userId", res.data.id);
          window.localStorage.setItem("name", res.data.first_name);
          // window.localStorage.setItem("spouseName", res.data.spouse_name);
          window.localStorage.setItem("event_date", res.data.event_date);
          window.localStorage.setItem("username", res.data.username);
        }
        this.setState({ spouseName: res.data.spouse_name });
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
        console.log(err);
        window.localStorage.removeItem("name");
        window.localStorage.removeItem("spouseName");
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("event_type");
        window.localStorage.removeItem("event_date");
        window.location.href = "/";
      });

    axios
      .get(
        `${util.API_BASE_URL}check-user-event/?user=${window.localStorage.userId}&have_event=have_event/`,
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
          // console.log(data);
          if (data !== "User have an Event.") {
            window.location.href = "/updateprofile";
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // await axios
    //   .get(`${util.API_BASE_URL}events/?user=${window.localStorage.userId}`, {
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //   })
    //   .then((res) => {
    //     // console.log(res.data);

    //     if (res.data !== undefined && res.data.length > 0) {
    //       let data = res.data;
    //       for (let i = 0; i < data.length; i++) {
    //         // console.log(data[data.length - 1].slug);
    //         window.localStorage.setItem("slug", data[data.length - 1].slug);
    //         window.localStorage.setItem("eventIID", data[data.length - 1].id);
    //         this.setState({ registryItem: data[data.length - 1].items });
    //         this.setState({ cashGift: data[data.length - 1].cash_item });
    //         this.setState({ loading: true });

    //         // console.log(this.state.registryItem);
    //         // console.log(this.state.cashGift);
    //         data[i].poster = data[data.length - 1].poster.replace(
    //           "image/upload/",
    //           ""
    //         );
    //         // console.log(data[i].poster);
    //         this.setState({
    //           backgroundImage: data[i].poster,
    //           isPosterImg: true,
    //         });
    //         if (this.state.cashGift.length > 0) {
    //           this.setState({ cashNeeded: true });
    //         }
    //       }
    //     } else {
    //       window.location.href = "/updateprofile";
    //     }
    //   })
    //   .catch((err) => {
    //     // console.log(err);
    //     this.setState({ emptyRegistry: true });
    //   });
  };

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
  //   }
  // }

  render() {
    const {
      userRegistry,
      cashNeeded,
      userEvent_link,
      cashGift,
      backgroundImage,
      isPosterImg,
      loading,
    } = this.context;
    if (userRegistry === []) window.location.href = "/updateprofile";
    // console.log(userRegistry);
    const newLocal = isPosterImg ? backgroundImage : `${backgroundimg}`;
    let imgUrl = newLocal;
    let manageReg = {
      backgroundImage: `url(${imgUrl})`,
      backgroundPosition: "center center",
      backgroundSize: "cover",
      backgroundRepeat: "noRepeat",
      width: "100%",
      position: "relative",
      /* height: 30%; */
      objectFit: "contain",
      borderRadius: "25px",
      height: "250px",
    };

    if (!loading) return <Spinner />;
    return (
      <div className="">
        <DashboardNav />
        <div className=" container-fluid row mt-5">
          <div className="col-1 d-none d-lg-block">
            <SideBar isManage="true" />
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
                  {/* https://sabigift.netlify.app/registry/
                  {window.localStorage.slug}{" "} */}
                  {userEvent_link}
                  <Link to="/editurl">
                    <BsPencil className="ml-2" color="black" size="25px" />
                  </Link>
                </p>
              </div>

              <div className=" text-center mt-4" style={manageReg}>
                {this.state.uploading && (
                  <ProgressBar
                    animated
                    striped
                    variant="success"
                    now={this.state.progress}
                  />
                )}
                <label className="btn bg-white">
                  {!this.state.uploading && <BsPencil />}

                  <input
                    type="file"
                    style={{ display: "none" }}
                    name="image"
                    accept="image/jpeg,image/png,image/gif,image/bmp"
                    onChange={(e) => this.triggerInputFile(e)}
                    // onClick={this.handleFileUpload}
                  />
                  {/* {this.state.fileSelected && !this.state.uploadLoading && (
                    <input type="button" value="upload" />
                  )} */}
                  {/* {this.state.uploadLoading && (
                    <input
                      className="spinner-grow spinner-grow-sm"
                      type="button"
                      value="Uploading"
                    />
                  )} */}
                </label>
                <div className="hero-text">
                  {this.state.spouseName && (
                    <h2 className="py-3 text-white">
                      {window.localStorage.name} & {this.state.spouseName}'s
                      wedding
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
                <CheckList />
              </div>
            </div>

            <h5 className="mt-5 mb-4">Add items to your registry</h5>
            <Product
              Products={userRegistry}
              showWishList={false}
              inRegistry={true}
              cashItem={cashGift}
              cashNeeded={cashNeeded}
            />

            <ToastContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default ManageRegistry;
