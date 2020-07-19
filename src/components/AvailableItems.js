import React, { Component } from 'react';
import {storeProduct} from '../storeProduct'
import 'antd/dist/antd.css';
import { Radio } from 'antd';
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
            <div className=''>
              <p>Multi Range</p>
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
                <Slider/>
              <p>Category</p>
              <Radio.Group  onChange={this.onChange} value={value}>
                  { storeProduct.map(item =>
                    <Radio  style={radioStyle} value={item.id}>
                        {item.name}
                        {/* <div>{item.numberAvailable}</div> */}
                    </Radio>
                )}
              </Radio.Group>
              <p>Brand</p>
              <Radio.Group  onChange={this.onChange} value={value}>
                  { storeProduct.map(item =>
                    <Radio  style={radioStyle} value={item.id}>
                        {item.name}
                        {/* <div>{item.numberAvailable}</div> */}
                    </Radio>
                )}
              </Radio.Group>

            </div>
        )
    }
}

export default AvailableItems;
