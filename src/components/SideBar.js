import React, { Component } from "react";
import {Link} from 'react-router-dom'
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
            <Tooltip placement="left" title="overview" color="#5F619F">
             <Link className='active' to='/dashboard'> <GrHome size="25px" /></Link>
            </Tooltip>
          </div>
          <div className="py-4">
           <Tooltip placement="left" title="manage registry" color="#5F619F">
              <Link className='text-link active' to='manageRegistry'><BsAlarm size="25px" /></Link>
            </Tooltip>
          </div>
          <div className="py-4">
            <Tooltip placement="left" title="checklist" color="#5F619F">
              <Link className='active' to='/checklist'><GrFolder size="25px" /></Link>
            </Tooltip>
          </div>
          <div className="py-4">
            <Tooltip placement="left" title="Track Gift" color="#5F619F">
              <Link className='active' to='/gifttracker'><GrBarChart size="25px" /></Link>
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
