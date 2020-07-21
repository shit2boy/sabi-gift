import React from 'react'
import {Link} from 'react-router-dom'
import { FindEvent } from './Modal'
const Banner = () => {
    return (
        <div className='banner '>
            <h1 >Gift Registry</h1>
            <h1>made ease</h1>
            <div className='btnBannerContainer'>
                <Link href='/createRegistry' className='text-white p-2 bg-success bannerBtn'>Create a registry</Link>
                {/* <Link href='/Find' className='text-white bg-success p-2 bannerBtn'>Find an Event</Link> */}
                <FindEvent/>
            </div>
            
            
        </div>
    )
}

export default Banner
