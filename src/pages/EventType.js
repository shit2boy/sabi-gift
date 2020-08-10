import React,{Component} from 'react'
import Hero from '../components/Hero';
import sabigift from "../images/landing/sabigift.png";
import Product from '../components/Product'
import AvailableItems from '../components/AvailableItems'



const date = new Date();
const formatDate = {day: 'numeric', year: 'numeric',  month: 'long' };
class EventType extends Component {
    state={
        date : date.toLocaleDateString(undefined, formatDate),
    }
   
    render(){
    return (
            <div classname='container-fluid'>
                <div class='mb-4'>
                    <a href='/Dashboard'> <img src={sabigift} alt='logo' width='75px'/> </a>
                </div>
                <div class='mb-5'>
                    <Hero hero='birthday'>
                        <div className='text-center'>
                            <h4> {window.localStorage.name}'s Birthday</h4>
                            <p>{this.state.date}</p>
                        </div>
                    </Hero>
                </div>
                <div className='container mt-5 '>
                    <div className='row'>
                        <div className='col-3 d-none d-lg-block availableItem'>
                           <AvailableItems/>
                        </div>
                        <div className=' col'>
                        <Product showWishList={true}/>
                        </div>
                    </div>
                </div>

            </div>
    )}
}
export default EventType
