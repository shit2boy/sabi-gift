import React, { Component } from 'react'
import laptop from "../images/Sabi-storepage/laptop.png";
import Button from './Button'




let styles = {
    boxShadow: '0px 2px 8px #00000022',
    borderRadius: '8px',
    opacity: 1
}
export class GiftTracker extends Component {
    render() {
        return (
            <div className='container-fluid'>
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
        )
    }
}

export default GiftTracker
