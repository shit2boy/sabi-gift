import React from 'react'
import {Link} from 'react-router-dom'
import { FindEvent } from './Modal'
const Banner = () => {
    return (
        <div className='banner '>
            <h1 className='mt-0' >Gift Registry<br/>made ease</h1>
            <div className='d-flex justify-content-between mt-4'>
                <Link to='/createRegistry' className='text-white text-decoration-none py-2 px-4 bg-success bannerBtn'>Create a registry</Link>
                {/* <Link href='/Find' className='text-white bg-success p-2 bannerBtn'>Find an Event</Link> */}
                <FindEvent/>
            </div>
            
            
        </div>
    )
}

export default Banner
