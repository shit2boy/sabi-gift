import React, { Component } from "react";
import DashboardNav from "../components/DashboardNav";
import SideBar from "../components/SideBar";
import axios from "axios";
import util from "../util/util";
import { StateContext } from "../Context";

class Notification extends Component {
  static contextType = StateContext;
  constructor() {
    super();
    this.state = {
      //   notification: [],
      marked: false,
    };
  }
  markAsRead = (id) => {
    axios
      .get(`${util.API_BASE_URL}notifications/?id=${id}`, {
        headers: {
          Authorization: "Token " + localStorage.getItem("token_id"),
        },
      })

      .then((response) => {
        // console.log(response.data);
        if (response.data !== undefined) {
          this.setState({ marked: !this.state.marked });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  async componentDidMount() {
    // this.setState({ loading: true });
  }
  render() {
    const { notification, removeNotification } = this.context;
    const unreadStyle = {
      background: "#ddd",
    };
    const readStyle = {
      background: "#ffffff",
    };
    return (
      <div>
        <DashboardNav />

        <div className="mt-4 d-none d-flex">
          <div className="col-1">
            <SideBar />
          </div>
          {/* <div> */}
          <table className=" table table-hover">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Gifter</th>
                <th scope="col">Items</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody>
              {notification.map((message, index) => (
                <tr
                  className="pointer"
                  style={
                    message.read || notification.indexOf("k" + message.id) > -1
                      ? readStyle
                      : unreadStyle
                  }
                  key={index}
                >
                  <th scope="row">&#8680;</th>
                  <td>{message.sender}</td>
                  <td>{message.message}</td>
                  <td>{message.date}</td>
                  <td
                    onClick={() => {
                      this.markAsRead(message.id);
                    }}
                  >
                    {message.read ? "Read" : "Mark as read"}
                  </td>
                  <td
                    onClick={() => {
                      removeNotification(message.id);
                    }}
                  >
                    Delete
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* </div> */}
        </div>
      </div>
    );
  }
}

export default Notification;
