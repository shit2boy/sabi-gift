import React, { Component } from "react";
import kitchen from "../images/Sabi-storepage/kitchen.png";
import { Card } from "react-bootstrap";
import AddCategory from "./AddCategory";
import axios from "axios";
import util from "../util/util";

class CheckList extends Component {
  constructor() {
    super();
    this.state = {
      isChecked: false,
      itemCategories: [],
      categoryId: "",
      registryItem: [],
    };
  }

  componentDidMount() {
    axios
      .get(`${util.API_BASE_URL}categories/`, {
        headers: { Authorization: "Token " + localStorage.getItem("token_id") },
      })

      .then((res) => {
        // console.log(res.data);
        if (res.data !== undefined) {
          let data = res.data.results;
          let categoryId;
          for (let i = 0; i < data.length; i++) {
            categoryId = data[i].id;
            this.setState({ categoryId: categoryId });
          }
          // console.log(this.state.categoryId);
          this.setState({ itemCategories: data });
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

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          {this.state.itemCategories.map((item) => (
            <Card
              key={item.id}
              id="myCards"
              className="col-sm m-3"
              style={{ width: "8rem", cursor: "pointer" }}
            >
              <Card.Body>
                <AddCategory
                  registryItem={this.state.registryItem}
                  button={
                    <div className="center">
                      <img
                        className=" rounded-circle img-fluid"
                        width="100%"
                        alt="items"
                        src={kitchen}
                      />
                    </div>
                  }
                />
              </Card.Body>
              <Card.Text className="text-center">
                <small className="">{item.name}</small>
                <strong className="p-1 d-block">
                  {/* <AddCategory button="+" /> */}+
                </strong>
              </Card.Text>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}

export default CheckList;
