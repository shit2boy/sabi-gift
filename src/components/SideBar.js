import React, { Component } from "react";
import { Link } from "react-router-dom";
// import image from "../images/Sabi-storepage/image.png";
import home from "../images/sabi-icons/home.svg";
import tracker from "../images/sabi-icons/track.png";
// import indicator from "../images/sabi-icons/indicator.svg";
import manage from "../images/sabi-icons/manag.png";
import checklist from "../images/sabi-icons/check.png";
import notification from "../images/sabi-icons/notification.svg";
import { StateContext } from "../Context";

import { Tooltip } from "antd";

export class SideBar extends Component {
  static contextType = StateContext;
  render() {
    const { isChecklist, isManage, isOverview, isTracker } = this.props;
    // const notify = this.context.notification;
    return (
      <div className="sidebarMenu">
        <div className="mt-3 text-center" style={{ position: "relative" }}>
          <Tooltip
            className="mt-5 mb-2"
            placement="left"
            title="notification"
            color="#5F619F"
          >
            <Link to="/notification">
              <span
                className=" badge badge-danger"
                style={{ position: "absolute" }}
              >
                .{/* <img src={indicator} width="5px" alt="icon" /> */}
              </span>
              <img src={notification} width="30px" alt="icon" />
            </Link>
          </Tooltip>
        </div>
        {/* <div className="text-center mb-4">
          <img src={image} width="35px" alt="userImage" />
        </div> */}
        <div className="text-center">
          <div className="py-4 o">
            <Tooltip
              // visible={isOverview ? true : false}
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
              // visible={isManage ? true : false}
              placement="left"
              title="manage registry"
              color="#5F619F"
            >
              <Link className="text-link active" to="/manageRegistry">
                <img
                  src={manage}
                  width="35px"
                  alt="icon"
                  style={isManage ? null : { opacity: "0.4" }}
                />
              </Link>
            </Tooltip>
          </div>
          <div className="py-4">
            <Tooltip
              // visible={isChecklist ? true : false}
              placement="left"
              title="checklist"
              color="#5F619F"
            >
              <Link className="active" to="/checklist">
                <img
                  src={checklist}
                  width="35px"
                  alt="icon"
                  style={isChecklist ? null : { opacity: "0.4" }}
                />
              </Link>
            </Tooltip>
          </div>
          <div className="py-4">
            <Tooltip
              // visible={isTracker ? true : false}
              placement="left"
              title="Track Gift"
              color="#5F619F"
            >
              <Link className="active" to="/gifttracker">
                <img
                  src={tracker}
                  width="35px"
                  alt="icon"
                  style={isTracker ? null : { opacity: "0.4" }}
                />
              </Link>
            </Tooltip>
          </div>
          {/* <div className="py-4">
            <img src={file} width="35px" alt="icon" />
          </div> */}
        </div>
      </div>
    );
  }
}

export default SideBar;
