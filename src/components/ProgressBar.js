import React from 'react'
import ProgressBar from 'react-customizable-progressbar'

function RegistryBar() {
    return (
        <div>
          <ProgressBar
            radius={65}
            progress={50}
            rotate={90}
            strokeWidth={15}
            strokeColor="#a0d468"
            trackStrokeWidth={15}
            pointerRadius={5}
            pointerStrokeColor="#5c85cd"
            />  
        </div>
    )
}

export default RegistryBar
