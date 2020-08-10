import React, { Component } from 'react';
import {storeProduct} from '../storeProduct'
import {Button } from "react-bootstrap";
import 'antd/dist/antd.css';
import { Radio,Rate } from 'antd';
import Slider from './Slider'






export class AvailableItems extends Component {
    state = {
        value: 1,
      };
    
      onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
        });
      };
    
    render() {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
          };
          const { value } = this.state;

        return (
            <>
            <div className=' container'>
                  <p>Multi Range</p>
              <div className='row col-10'>
              <Radio.Group>
                <Radio style={radioStyle} value={1}>
                  ₦1000 
                </Radio>
                <Radio style={radioStyle} value={2}>
                   ₦10-₦10000 
                </Radio>
                <Radio style={radioStyle} value={3}>
                  ₦100-₦50000
                </Radio>
                <Radio style={radioStyle} value={4}>
                    ₦500000 All 
                </Radio>
                <Radio style={radioStyle} value={5}>
                    All 
                </Radio>
              </Radio.Group>
              </div>
              <div className='row col-10'>
                <Slider/>
              </div>
              <p>Category</p>
              <div className='row col-10'>
              <Radio.Group  onChange={this.onChange} value={value}>
                  { storeProduct.map(item =>
                    <Radio key={item.id}  style={radioStyle} value={item.id}>
                        {item.name}
                        {/* <div>{item.numberAvailable}</div> */}
                    </Radio>
                )}
              </Radio.Group>
              </div>
              <p>Brand</p>
              <div clasName='row col-10'>
              <Radio.Group  onChange={this.onChange} value={value}>
                  { storeProduct.map(item =>
                    <Radio  style={radioStyle} value={item.id}>
                        {item.name}
                       
                    </Radio>
                )}
              </Radio.Group>
              </div>
              <hr/>
              
              <p>Rating</p>
              <div className='row col-10'>
              <div className='row'>
                <Rate className='col' allowHalf defaultValue={4.5} />
                <span className='col-1'>8500</span>
              </div>
              <div className='row'>
                <Rate  className='col' allowHalf defaultValue={3.} />
                <span  className='col-1'> 3250 </span>
              </div>
              <div className='row'>
                <Rate  className='col' allowHalf defaultValue={2.5} />
                <span  className='col-1'>1120 </span>
              </div>
              <div className='row'>
                <Rate className='col' allowHalf defaultValue={2.} />
                <span className='col-1'>3320 </span>
              </div>
              <div className='row'>
                <Rate className='col' allowHalf defaultValue={3.5} />
                <span className='col-1'>5452</span>
              </div>
             </div>
            </div>
             <div className='text-center mt-2'>
                <Button className='P-2' type='button' style={{background: '#6F64F8',color:'#ffffff',borderRadius:'8px'}}>CLEAR ALL FILTERS</Button>
              </div>
            </>
        )
    }
}

export default AvailableItems;
