import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { BsBell } from "react-icons/bs";
import Add from "../images/Sabi-storepage/Add.svg";
import addItem from "../images/Sabi-storepage/addItem.svg";
import invite from "../images/Sabi-storepage/invite.svg";
import manage from "../images/Sabi-storepage/manage.svg";
import setup from "../images/Sabi-storepage/setup.svg";
import { Link } from "react-router-dom";
import SendInvite from "./SendInvite";

export class NextSteps extends Component {
  render() {
    return (
      <div className="row justify-content-around ">
        <Card
          id="myCards"
          className="shadow mb-3 grow"
          style={{ width: "12rem" }}
        >
          <BsBell className="ml-2 mt-1" />
          <Card.Body className="stepsCard"></Card.Body>
          <Card.Footer className="cardFooter">
            <strong className="ml-1">1</strong>
            {window.localStorage.event_type && (
              <img className="ml-1 d-block pointer" src={addItem} alt="step1" />
            )}{" "}
            {!window.localStorage.event_type && (
              <p className="ml-1 d-block">Done</p>
            )}{" "}
            <span className="text-right">+</span>
          </Card.Footer>
          {/* <h4 className="card-img-overlay text-center o9 bg-transparent">
              Done
            </h4> */}
        </Card>

        <Card
          id="myCards"
          className="shadow mb-3 grow"
          style={{ width: "12rem" }}
        >
          <BsBell className="ml-2 mt-1" />

          <Card.Body className="stepsCard2"></Card.Body>
          <Card.Footer className="cardFooter">
            <strong className="ml-1">2</strong>
            <img className="ml-1 d-block pointer" src={Add} alt="step2" />{" "}
            <span className="text-right">+</span>
          </Card.Footer>
        </Card>
        <Card
          id="myCards"
          className="shadow mb-3 grow"
          style={{ width: "12rem" }}
        >
          <BsBell className="ml-2 mt-1" />

          <Card.Body className="stepsCard3"></Card.Body>
          <Card.Footer className="cardFooter">
            <strong className="ml-1">3 </strong>
            <SendInvite
              button={
                <img
                  className="ml-1 d-block pointer"
                  src={invite}
                  alt="step3"
                />
              }
            />
            <span className="text-right">+</span>
          </Card.Footer>
        </Card>
        <Card
          id="myCards"
          className="shadow mb-3 grow"
          style={{ width: "12rem" }}
        >
          <BsBell className="ml-2 mt-1" />

          <Card.Body className="stepsCard4"></Card.Body>
          <Card.Footer className="cardFooter">
            <Link className="text-link" to="/createregistry">
              <strong className="ml-1">4</strong>
              <img
                className="ml-1 d-block pointer"
                src={manage}
                alt="step4"
              />{" "}
              <span className="text-right">+</span>
            </Link>
          </Card.Footer>
        </Card>
        <Card
          id="myCards"
          className="shadow mb-3 grow"
          style={{ width: "12rem" }}
        >
          <BsBell className="ml-2 mt-1" />

          <Card.Body className="stepsCard5"></Card.Body>
          <Card.Footer className="cardFooter">
            <strong className="ml-1">5 </strong>
            <img
              className="ml-1 d-block pointer"
              src={setup}
              alt="step5"
            />{" "}
            <span className="text-right">+</span>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}

export default NextSteps;
