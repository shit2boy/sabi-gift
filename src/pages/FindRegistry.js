import React, { Component } from 'react'
import FindEvent from '../components/FindEvent'

export class FindRegistry extends Component {
    render() {
        return (
            <div>
                <h4 className='text-center'>Find an event Registry or Website</h4>
              <FindEvent/>  
            </div>
        )
    }
}

export default FindRegistry
