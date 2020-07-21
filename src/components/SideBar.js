import React, { Component } from "react";

import Avatars from "../images/Sabi-storepage/Avatars.png";

import { GrHome, GrFolder, GrBarChart } from "react-icons/gr";
import { BsFolder, BsAlarm, BsBell } from "react-icons/bs";
import { Tooltip } from "antd";

export class SideBar extends Component {
  render() {
    return (
      <div>
        <div className="mt-3 text-center">
          <Tooltip placement="left" title="notification">
            <BsBell />
          </Tooltip>
        </div>
        <div className=" ml-2 mb-4">
          <img src={Avatars} width="35px" alt="userImage" />
        </div>
        <div className="ml-2">
          <div className="py-4">
            <Tooltip placement="left" title="overview" color="geekblue">
              <GrHome size="30px" />
            </Tooltip>
          </div>
          <div className="py-4">
            <Tooltip placement="left" title="manage registry">
              <BsAlarm size="30px" />
            </Tooltip>
          </div>
          <div className="py-4">
            <Tooltip placement="left" title="checklist">
              <GrFolder size="30px" />
            </Tooltip>
          </div>
          <div className="py-4">
            <Tooltip placement="left" title="Track Gift">
              <GrBarChart size="30px" />
            </Tooltip>
          </div>
          <div className="py-4">
            <BsFolder size="30px" />
          </div>
        </div>
      </div>
    );
  }
}

export default SideBar;
