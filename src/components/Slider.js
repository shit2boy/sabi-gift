import React from 'react'
import { Slider } from 'antd';

function onChange(value) {
  console.log('onChange: ', value);
}

function onAfterChange(value) {
  console.log('onAfterChange: ', value);
}


function SlideRange() {
    return (
        <div>
           <Slider
                range
                step={10}
                defaultValue={[20, 50]}
                onChange={onChange}
                onAfterChange={onAfterChange}
            /> 
        </div>
    )
}

export default SlideRange
