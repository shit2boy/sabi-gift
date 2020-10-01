import React, { Component } from "react";
import { Link } from "react-router-dom";
import Avatars from "../images/Sabi-storepage/Avatars.png";
import home from "../images/sabi-icons/home.svg";
import tracker from "../images/sabi-icons/tracker.svg";
import file from "../images/sabi-icons/file.svg";
import manage from "../images/sabi-icons/manage.svg";
import checklist from "../images/sabi-icons/checklist.svg";
import notification from "../images/sabi-icons/notification.svg";
import { StateContext } from "../Context";

// import { GrHome, GrFolder, GrBarChart } from "react-icons/gr";
// import { BsFolder, BsAlarm, BsBell } from "react-icons/bs";
import { Tooltip } from "antd";

export class SideBar extends Component {
  static contextType = StateContext;
  // state = {
  //   active: false,
  // };
  // activeOnclick = () => {
  //   const { active } = this.state;
  //   this.setState({ active: !active });
  //   console.log("see me");
  // };
  render() {
    const { isChecklist, isManage, isOverview, isTracker } = this.props;
    const active = {
      border: "1px solid grey",
    };
    return (
      <div className="sidebarMenu">
        <div className="mt-3 text-center">
          <Tooltip
            className="mt-5 mb-2"
            placement="left"
            title="notification"
            color="#5F619F"
          >
            <img src={notification} width="25px" alt="icon" />
          </Tooltip>
        </div>
        <div className="text-center mb-4">
          <img src={Avatars} width="35px" alt="userImage" />
        </div>
        <div className="text-center">
          <div className="py-4 o">
            <Tooltip
              visible={isOverview ? true : false}
              placement="left"
              title="overview"
              color="#5F619F"
            >
              <Link to="/dashboard">
                {" "}
                <img
                  src={home}
                  width="35px"
                  alt="icon"
                  style={isOverview ? null : { opacity: "0.4" }}
                />
              </Link>
            </Tooltip>
          </div>
          <div className="py-4">
            <Tooltip
              visible={isManage ? true : false}
              placement="left"
              title="manage registry"
              color="#5F619F"
            >
              <Link className="text-link active" to="/manageRegistry">
                <img
                  src={manage}
                  width="35px"
                  alt="icon"
                  style={isManage ? active : null}
                />
              </Link>
            </Tooltip>
          </div>
          <div className="py-4">
            <Tooltip
              visible={isChecklist ? true : false}
              placement="left"
              title="checklist"
              color="#5F619F"
            >
              <Link className="active" to="/checklist">
                <img
                  src={checklist}
                  width="35px"
                  alt="icon"
                  style={isChecklist ? active : null}
                />
              </Link>
            </Tooltip>
          </div>
          <div className="py-4">
            <Tooltip
              visible={isTracker ? true : false}
              placement="left"
              title="Track Gift"
              color="#5F619F"
            >
              <Link className="active" to="/gifttracker">
                <img
                  src={tracker}
                  width="35px"
                  alt="icon"
                  style={isTracker ? active : null}
                />
              </Link>
            </Tooltip>
          </div>
          <div className="py-4">
            <img src={file} width="35px" alt="icon" />
          </div>
        </div>
      </div>
    );
  }
}

export default SideBar;
