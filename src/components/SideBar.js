import React, { Component } from "react";

import Avatars from "../images/Sabi-storepage/Avatars.png";

import { GrHome, GrFolder, GrBarChart } from "react-icons/gr";
import { BsFolder, BsAlarm, BsBell } from "react-icons/bs";
import { Tooltip } from "antd";

export class SideBar extends Component {
  render() {
    return (
      <div className='sidebarMenu'>
        <div className="mt-3 text-center">
          <Tooltip placement="left" title="notification" color="#5F619F">
            <BsBell />
          </Tooltip>
        </div>
        <div className="text-center mb-4">
          <img src={Avatars} width="35px" alt="userImage" />
        </div>
        <div className="text-center">
          <div className="py-4 o">
            <Tooltip placement="left" to='/' title="overview" color="#5F619F">
              <GrHome size="25px" />
            </Tooltip>
          </div>
          <div className="py-4">
            <Tooltip placement="left" title="manage registry" color="#5F619F">
              <BsAlarm size="25px" />
            </Tooltip>
          </div>
          <div className="py-4">
            <Tooltip placement="left" title="checklist" color="#5F619F">
              <GrFolder size="25px" />
            </Tooltip>
          </div>
          <div className="py-4">
            <Tooltip placement="left" title="Track Gift" color="#5F619F">
              <GrBarChart size="25px" />
            </Tooltip>
          </div>
          <div className="py-4">
            <BsFolder size="25px" />
          </div>
        </div>
      </div>
    );
  }
}

export default SideBar;
