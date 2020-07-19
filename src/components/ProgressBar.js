import React from 'react'
import ProgressBar from 'react-customizable-progressbar'

function RegistryBar() {
    return (
        <div>
          <ProgressBar
            radius={100}
            progress={50}
            rotate={90}
            strokeWidth={18}
            strokeColor="#a0d468"
            trackStrokeWidth={18}
            pointerRadius={9}
            pointerStrokeColor="#5c85cd"
            />  
        </div>
    )
}

export default RegistryBar
