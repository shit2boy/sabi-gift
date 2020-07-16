import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Radio } from 'antd';






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
            <Radio.Group onChange={this.onChange} value={value}>
        <Radio style={radioStyle} value={1}>
         Television
        </Radio>
        <Radio style={radioStyle} value={2}>
         Laptop
        </Radio>
        <Radio style={radioStyle} value={3}>phohe</Radio>
        <Radio style={radioStyle} value={4}>
         Camera 
        </Radio>
        <Radio style={radioStyle} value={4}>
         Camera 
        </Radio>
        <Radio style={radioStyle} value={4}>
         Camera 
        </Radio>
        <Radio style={radioStyle} value={4}>
         Camera 
        </Radio>
        <Radio style={radioStyle} value={4}>
         Camera 
        </Radio>
        <Radio style={radioStyle} value={4}>
         Camera 
        </Radio>
      </Radio.Group>
        )
    }
}

export default AvailableItems;
