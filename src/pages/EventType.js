import React from 'react'
import Hero from '../components/Hero';
import sabigift from "../images/landing/sabigift.png";
import Product from '../components/Product'
import AvailableItems from '../components/AvailableItems'

function EventType() {
    return (
        <div>
            <div classname='container-fluid'>
                <div class='mb-4'>
                    <a href='/Dashboard'> <img src={sabigift} alt='logo' width='75px'/> </a>
                </div>
                <div class='mb-5'>
                    <Hero hero='birthday'>
                        <div className='text-center'>
                            <h4>Victor Ad's Birthday</h4>
                            <p>February 10, 2020</p>
                        </div>
                    </Hero>
                </div>
                <div className='container mt-5 '>
                    <div className='row'>
                        <div className='col-3 d-none d-lg-flex availableItem'>
                           <AvailableItems/>
                        </div>
                        <div className='mx-auto col-8'>
                        <Product showWishList={true}/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default EventType
