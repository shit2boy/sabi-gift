import React, { Component } from "react";
import { Link } from "react-router-dom";
import Avatars from "../images/Sabi-storepage/Avatars.png";
import home from "../images/sabi-icons/home.svg";
import tracker from "../images/sabi-icons/tracker.svg";
import file from "../images/sabi-icons/file.svg";
import manage from "../images/sabi-icons/manage.svg";
import checklist from "../images/sabi-icons/checklist.svg";
import notification from "../images/sabi-icons/notification.svg";

// import { GrHome, GrFolder, GrBarChart } from "react-icons/gr";
// import { BsFolder, BsAlarm, BsBell } from "react-icons/bs";
import { Tooltip } from "antd";

export class SideBar extends Component {
  render() {
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
            <Tooltip placement="left" title="overview" color="#5F619F">
              <Link className="active" to="/dashboard">
                {" "}
                <img src={home} width="35px" alt="icon" />
              </Link>
            </Tooltip>
          </div>
          <div className="py-4">
            <Tooltip placement="left" title="manage registry" color="#5F619F">
              <Link className="text-link active" to="manageRegistry">
                <img src={manage} width="35px" alt="icon" />
              </Link>
            </Tooltip>
          </div>
          <div className="py-4">
            <Tooltip placement="left" title="checklist" color="#5F619F">
              <Link className="active" to="/checklist">
                <img src={checklist} width="35px" alt="icon" />
              </Link>
            </Tooltip>
          </div>
          <div className="py-4">
            <Tooltip placement="left" title="Track Gift" color="#5F619F">
              <Link className="active" to="/gifttracker">
                <img src={tracker} width="35px" alt="icon" />
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
