import React, { Component } from 'react'
import { Steps } from "antd";

import { Link } from "react-router-dom";
import sabigift from "../images/landing/sabigift.png";

const { Step } = Steps;

export default class Aboout extends Component {
    render() {
        return (
            <div className='container-fluid'>
                <div>
                <div className='row' >
                    <div className='col-4 bg-info' style={{height:'inherit'}}>
                    <div className="mt-5">
                        <div >
                        <Link to="/">
                            <img
                            className="homeicon rounded-circle"
                            src={sabigift}
                            alt="SabiGift-Logo"
                            />
                        </Link>
                        </div>
                        <Steps className="px-5" direction="vertical">
                        <Step title="Your Profile" />
                        <Step title="Event basics" />
                        <Step title="Select Gifts" />
                        <Step title="Confirm" />
                        </Steps>
                    </div>

                    </div>
                    <div className='col bg-success'>
                        <div className='row'>
                            <div className=''>
                                        
                            </div>
                        </div>

                    </div>
                </div>
                </div>
                
            </div>
        )
    }
}
