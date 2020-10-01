import React, { Component } from "react";
import { Card, Modal } from "react-bootstrap";
// import add from "../images/Sabi-storepage/Addicon.jpg";
import axios from "axios";
import util from "../util/util";
import { StateContext } from "../Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class AddCategory extends Component {
  static contextType = StateContext;
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      AddedCategory: "",
      itemByCategory: [],
      selectedCategory: [],
      itemCategories: this.props.categoryId,
      quantity: 1,
    };
  }

  notify = (res) => toast.success(res, { autoClose: 2000 });
  errorNotify = (res) => toast.error(res, { autoClose: 2000 });
  setModalHide = () => {
    this.setState({ modalShow: false });
    window.location.reload();
  };

  setModalShow = () => {
    this.setState({ modalShow: true });
  };

  addGiftToRegistry = (id) => {
    // console.log("clicked" + id);
    // let evtid = this.state.eventId;
    let eventId = window.localStorage.eventIID;
    let quantityNeeded = this.state.quantity;
    console.log(quantityNeeded);
    let addeditem = {
      gifts: [Number(id)],
      event: Number(eventId),
      quantity: quantityNeeded,
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
        }
      })
      .catch((err) => {
        console.log(err);
        // this.errorNotify();
      });
  };

  // addMoreCategoryToRegistry = (e) => {
  //   let selectedArr = this.state.selectedCategory;
  //   if (this.state.selectedCategory.indexOf(e.target.id) === -1) {
  //     selectedArr.push(e.target.id);
  //     this.setState({ selectedCategory: selectedArr });
  //   } else {
  //     selectedArr.splice(this.state.selectedCategory.indexOf(e.target.id), 1);
  //     this.setState({ selectedCategory: selectedArr });
  //   }
  //   console.log(this.state.selectedCategory);
  // };

  componentDidMount() {
    axios
      .get(`${util.API_BASE_URL}registries/`, {
        headers: { Authorization: "Token " + localStorage.getItem("token_id") },
      })

      .then((res) => {
        // console.log(res.data);
        if (res.data !== undefined) {
          let data = res.data;
          for (let i = 0; i < data.length; i++) {
            data[i].picture = data[i].picture.replace("image/upload/", "");
            this.setState({ itemByCategory: data });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="">
        <span onClick={() => this.setModalShow(true)} className="pointer">
          {this.props.button}
        </span>
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.modalShow}
          onHide={() => this.setModalHide(false)}
        >
          <Modal.Header closeButton>
            <p>Select registry category</p>
          </Modal.Header>
          <Modal.Body className=" ">
            <div className="container">
              <div className="row justify-content-center">
                {this.state.itemByCategory.map((item, index) => (
                  <div key={index} className="m-3 d-flex">
                    {this.props.category === item.cat && (
                      <Card
                        onClick={() => this.addGiftToRegistry(item.id)}
                        className="flex-fill"
                        id="myCards"
                        key={item.id}
                        style={{
                          width: "8rem",
                          cursor: "pointer",
                          border: "1px dotted",
                        }}
                      >
                        <Card.Body className="" id={index}>
                          <Card.Img
                            className="center rounded-circle"
                            alt="items"
                            width="50px"
                            src={item.picture}
                            id={index}
                          />
                          <small id={index} className="text-center">
                            {item.name}
                          </small>
                        </Card.Body>
                      </Card>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Modal.Body>
          <ToastContainer />
        </Modal>
      </div>
    );
  }
}
