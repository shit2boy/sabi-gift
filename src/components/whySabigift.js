import React from 'react'
import {Link} from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';
import coupleImage from '../images/landing/bg-1.png'



const WhySabigift = () => {

    AOS.init({
        duration: 2000,
        
    })

    return (
        <div className='container-fluid mt-4 '>
           <div className='row no-gutters'>
               <div className='col-sm coupleImg' data-aos="fade-left">
                   <div> <img  className='img-fluid' src={coupleImage} alt='coupleImage'/></div>
                    
               </div>
               <div className='col-sm' style={{backgroundColor:'#D2F5D9'}} data-aos="fade-right">
                   <div className=' why'>
                    <h3 style={{marginBottom:'30px'}}>Why we built SabiGifts</h3>
                    
                        <p>No store had everything couples wanted. And no place recognized what engaged couple crave in a registry while planning their weddings </p>
                        <p className=' mt-5'>So we talked to tons of couples and built what they wanted: One store with gifts, gift cards, and cash funds. Smart ways to personalize their registry to delight guests. Flexible (and free) shipping and so much more. 
                            We made registering easy for couples and their guests, so all of you can enjoy this special time.
                        </p>
                        <div style={{ marginTop :'60px'}} >
                        <Link  to='/createRegistry' style={{backgroundColor:'#545871',borderRadius:'1.25rem'}} className='p-2 text-link text-white '>Create a registry</Link>
                        </div>                    
                   </div>
               </div>
            </div> 
        </div>
    )
}

export default WhySabigift
