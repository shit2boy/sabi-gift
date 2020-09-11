import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import DashboardNav from "../components/DashboardNav";
import axios from "axios";
import util from "../util/util";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export class EditRegistryUrl extends Component {
  state = {
    registryUrl: "",
    successful: false,
    status: true,
  };

  errorNotify = () =>
    toast.error("Error processing your request!", { autoClose: 2000 });
  notify = () =>
    toast.success("RegistryUrl updated successfully!", { autoClose: 2000 });

  changeHandler = (e) => {
    this.setState({ registryUrl: e.target.value, successful: true });
  };

  onSubmit = (e) => {
    e.preventDefault();
    let event_id = window.localStorage.eventIID;
    const registryUrl = { slug: this.state.registryUrl, event_id: event_id };
    axios
      .post(`${util.API_BASE_URL}change-slug/`, registryUrl, {
        headers: { Authorization: "Token " + localStorage.getItem("token_id") },
      })
      .then((data) => {
        if (data.status === 200) {
          this.setState({ successful: true });
          this.notify();
        }
      })
      .catch((error) => {
        console.log(error);
        this.errorNotify();
        this.setState({ status: false });
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
                className=" mt-5"
                variant="success"
                type="submit"
                disabled={!this.state.successful}
                style={{ background: "#58B852", color: "#ffffff" }}
              >
                Update
              </Button>
            </Form>
            <ToastContainer position="top-center" />
            <div className="mt-4">
              <h5> REGISTRY URL</h5>
              <p>www.sabigift.netlify.app/registry/{this.state.registryUrl}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditRegistryUrl;
