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
          <Tooltip placement="left" title="notification" color="#5F619F">
            <BsBell />
          </Tooltip>
        </div>
        <div className=" ml-2 mb-4">
          <img src={Avatars} width="35px" alt="userImage" />
        </div>
        <div className="ml-2">
          <div className="py-4">
            <Tooltip placement="left" title="overview" color="#5F619F">
              <GrHome size="30px" />
            </Tooltip>
          </div>
          <div className="py-4">
            <Tooltip placement="left" title="manage registry" color="#5F619F">
              <BsAlarm size="30px" />
            </Tooltip>
          </div>
          <div className="py-4">
            <Tooltip placement="left" title="checklist" color="#5F619F">
              <GrFolder size="30px" />
            </Tooltip>
          </div>
          <div className="py-4">
            <Tooltip placement="left" title="Track Gift" color="#5F619F">
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
