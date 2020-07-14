import React from 'react'
import { Nav } from 'react-bootstrap';
const Banner = () => {
    return (
        <div className='banner'>
            <h1 >Gift Registry</h1>
            <h1>made ease</h1>
            <div className='btnBanner'>
            <Nav.Link href='/rooms' className='text-white bg-success bannerBtn'>Create a registry</Nav.Link>
            <Nav.Link href='/rooms' className='text-white bg-success bannerBtn'>Find an Event</Nav.Link>
            </div>
            
            
        </div>
    )
}

export default Banner
