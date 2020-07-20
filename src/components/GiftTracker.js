import React, { Component } from 'react'
import laptop from "../images/Sabi-storepage/laptop.png";
import Button from './Button'
import Avatars from '../images/Sabi-storepage/Avatars.png'

import { GrHome, GrFolder,GrBarChart } from "react-icons/gr";
import {BsFolder,BsAlarm,BsBell} from "react-icons/bs";
import { Tooltip } from 'antd';
import DashboardNav from './DashboardNav';




let styles = {
    boxShadow: '0px 2px 8px #00000022',
    borderRadius: '8px',
    opacity: 1
}
export class GiftTracker extends Component {
    render() {
        return (
            <div className='container-fluid'>
                <DashboardNav/>
                <hr className='mt-0 mb-0'/>
                <div className='row mt-4'>
                <div className="col-1 ml-4 justify-content-center sidebarMenu">
                    <div classname=''>
                        <div className='mt-3 text-center'>
                        <Tooltip placement="left" title='notification'>
                        <BsBell/>
                        </Tooltip>
                        </div>
                    <div className=' ml-2 mb-4'>
                        <img src={Avatars} width='35px' alt='userImage'/>
                    </div>
                    <div className='ml-2'>
                        <div className='py-4'>
                        <Tooltip placement="left" title='overview' color='geekblue'>
                        <GrHome size='30px'/>
                        </Tooltip>
                        </div>
                        <div className='py-4'>
                        <Tooltip placement="left" title='manage registry'><BsAlarm size='30px'/></Tooltip>
                        </div>
                        <div className='py-4'>
                        <Tooltip placement="left" title='checklist'><GrFolder size='30px'/></Tooltip>
                        </div>
                        <div className='py-4'>
                        <Tooltip placement="left" title='Track Gift'><GrBarChart size='30px'/></Tooltip>
                            
                        </div>
                        <div className='py-4'>
                            <BsFolder size='30px'/>
                        </div>
                    </div>
                </div>
           </div>
           <div className='col-10 mx-auto px-2'>
           <h2>Gift Tracker</h2>
               <p>We'll list all gifts the guests buy you on this page and your app. Here's a rundown on how to them get them home.</p>
               <div className='d-flex justify-content-between'  style={styles}>
                    <div className='d-flex align-items-center'>
                        <img src={laptop} width='100px' alt='giftFromGuest' className='m-4' />
                        <div className='ml-2'>
                            <h5>Apple watch Series 4 GPS</h5>
                            <p>Redesigned from scratch and completely revised.</p>
                            <span>#13,000</span>
                        </div>
                    </div>
                    <div className='py-4'>
                      <div><Button  name='SEND NOW'></Button></div> 
                      <div><Button style={{background:'white'}} name='Convert to credit'></Button></div> 
                    </div>
                </div> 
            
            </div>     

                </div>
               
        </div>
        )
    }
}

export default GiftTracker
