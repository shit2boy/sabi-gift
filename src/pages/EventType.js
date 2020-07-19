import React from 'react'
import Hero from '../components/Hero'
import Product from '../components/Product'
import AvailableItems from '../components/AvailableItems'

function EventType() {
    return (
        <div>
            <div classname='container-fluid'>
                <div class='row mb-5'>
                    <Hero hero='birthday'>
                        <div className='text-center'>
                            <h4>Victor Ad's Birthday</h4>
                            <p>February 10, 2020</p>
                        </div>
                    </Hero>
                </div>
                <div className=' mt-5 '>
                    <div className='row'>
                        <div className=' mx-auto col-3 availableItem'>
                           <AvailableItems/>
                        </div>
                        <div className=' mx-auto col-8'>
                            <Product/>
                        </div>
                    </div>
                </div>

                
                <div>

                </div>
            </div>
        </div>
    )
}

export default EventType
