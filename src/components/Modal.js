import React, { useState } from "react";
import { Modal, Form, Col } from "react-bootstrap";
import coupleimg from "../images/landing/coupleimg.png";
import { Link } from "react-router-dom";
import axios from "axios";
import util from "../util/util";

function ModalFindEvent(props) {
  const [validated, setValidated] = useState(false);
  const [searchedValue, setSearchedValue] = useState("");
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState([]);

  const onSearch = (event) => {
    const name = event.target.value;
    setSearchedValue(name);
    // console.log(searchedValue);
  };

  const handleSearch = () => {
    axios
      .get(`${util.API_BASE_URL}events/?search=${searchedValue}`)
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
        console.log("data  is", data);
        console.log(res.data.event_link);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const validateForm = () => {
    let searchField = searchedValue;
    let errors = "";
    let formIsValid = true;
    if (!searchField) {
      formIsValid = false;
      errors = "*Empty field.";
    }
    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      event.preventDefault();
      setValidated(true);
      handleSearch();
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="findevent">
          <h2>Find an event Registry or Website</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          validated={validated}
          // onSubmit={handleSubmit}
          onChange={onSearch}
        >
          <Form.Row>
            <Form.Group as={Col} controlId="Fname">
              <Form.Control
                name="search"
                required
                type="text"
                placeholder="Victor's Birthday"
              />
              <span style={{ color: "red" }}>{errors}</span>
              <Form.Control.Feedback type="invalid">
                Empty
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={2} controlId="btn">
              <button
                type="button"
                onClick={handleSubmit}
                className="btn p-2"
                style={{ backgroundColor: "#58B852", width: "90px" }}
              >
                Find
              </button>
            </Form.Group>
          </Form.Row>
        </Form>
        <div className="row">
          {data.map((event, index) => (
            <div
              key={index}
              className="card p-0 m-2 col-lg-3 col-sm text-center"
            >
              <div>
                <img
                  className=" img-fluid"
                  src={coupleimg}
                  // style={{ width: "200px" }}
                  alt="Card cap"
                />
              </div>

              <div className="card-footer" style={{ cursor: "pointer" }}>
                <Link
                  to={{ pathname: `registry/${window.localStorage.slug}` }}
                  target="blank"
                >
                  VIEW EVENT
                </Link>
                {/* <p>{event.event_type}</p> */}
              </div>
            </div>
          ))}
          {/* {data.length <= 0 && searchedValue.length !== 0 && (
            <p className="text-center">Oops..., no event found !</p>
          )} */}
        </div>
      </Modal.Body>
    </Modal>
  );
}

function FindEvent() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <button
        className="text-white text-decoration-none border-0 bg-success px-4 py-2 bannerBtn"
        style={{ outline: "0" }}
        onClick={() => setModalShow(true)}
      >
        Find an Event
      </button>

      <ModalFindEvent show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}
export { FindEvent };
