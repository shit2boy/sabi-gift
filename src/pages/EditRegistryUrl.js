import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import DashboardNav from "../components/DashboardNav";
import axios from "axios";
import util from "../util/util";

export class EditRegistryUrl extends Component {
  state = {
    registryUrl: "",
    successful: false,
  };

  changeHandler = (e) => {
    this.setState({ registryUrl: e.target.value, successful: true });
  };

  onSubmit = (e) => {
    e.preventDefault();
    let slug = window.localStorage.slug;
    const { registryUrl } = this.state;
    axios
      .patch(`${util.API_BASE_URL}/events/${slug}/`, registryUrl, {
        headers: { Authorization: "Token " + localStorage.getItem("token_id") },
      })
      .then((data) => {
        if (data.status === 200) {
          this.setState({ successful: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container">
        <DashboardNav />
        <div className="row justify-content-center mt-5">
          <div className="col-lg-10 col-sm">
            <h4 className="p-2 text-center">Edit your unique Url</h4>
            <Form noValidate onSubmit={this.onSubmit}>
              <Form.Group>
                <Form.Label>Your Registry URL</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  onChange={this.changeHandler}
                  defaultValue={window.localStorage.slug}
                  required
                />
              </Form.Group>
              <Button
                className="w-25 text-center mt-5"
                variant="success"
                type="submit"
                disabled={!this.state.successful}
                style={{ background: "#58B852", color: "#ffffff" }}
              >
                Update
              </Button>
            </Form>
            <h5> REGISTRY URL</h5>
            <p>www.sabigift.netlify.app/registry/{this.state.registryUrl}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default EditRegistryUrl;
