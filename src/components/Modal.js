import React, { useState } from "react";
import { Modal, Form, Col } from "react-bootstrap";
import coupleimg from "../images/landing/coupleimg.png";
import axios from "axios";
import util from "../util/util";

function ModalFindEvent(props) {
  const [validated, setValidated] = useState(false);
  const [searchedValue, setSearchedValue] = useState("");
  const [data, setData] = useState([]);

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
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);
    handleSearch();
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
            <div className="card p-0 col-sm m-2 col-3 text-center">
              <div>
                <img
                  className=" img-fluid"
                  src={coupleimg}
                  // style={{ width: "200px" }}
                  alt="Card cap"
                />
              </div>

              <div className="card-footer" style={{ cursor: "pointer" }}>
                <p>VIEW EVENT</p>
                {/* <p>{event.event_type}</p> */}
              </div>
            </div>
          ))}
          {data.length <= 0 && searchedValue.length !== 0 && (
            <p className="text-center">Oops..., no event found !</p>
          )}
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
        className="text-white border-0 bg-success px-4 py-2 bannerBtn"
        onClick={() => setModalShow(true)}
      >
        Find an Event
      </button>

      <ModalFindEvent show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}
export { FindEvent };
