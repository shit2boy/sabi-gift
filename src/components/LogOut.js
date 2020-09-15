import React, { Component } from "react";
import axios from "axios";
import util from "../util/util";

export class LogOut extends Component {
  constructor(props) {
    super(props);
    this.onLogOut = this.onLogOut.bind(this);
  }

  onLogOut() {
    axios
      .post(
        `${util.API_BASE_URL}accounts/logout/`,
        { revoke_token: "true" },
        {
          headers: {
            Authorization: "Token " + localStorage.getItem("token_id"),
          },
        }
      )
      .then((data) => {
        if (data.status === 200) {
          // console.log(data);
          window.localStorage.removeItem("userId");
          window.localStorage.removeItem("name");
          window.localStorage.removeItem("spouseName");
          window.localStorage.removeItem("event_date");
          window.localStorage.removeItem("event_type");
          window.localStorage.removeItem("token_id");
          window.localStorage.removeItem("username");
          window.localStorage.removeItem("slug");
          window.localStorage.removeItem("event_id");
          window.localStorage.removeItem("eventIID");
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <>
        <span onClick={this.onLogOut} style={{ cursor: "pointer" }}>
          {this.props.logout}
        </span>
      </>
    );
  }
}

export default LogOut;
