import React, { Component } from 'react'
import SideBar from '../components/SideBar';
import DashboardNav from '../components/DashboardNav'
import AvailableItems from '../components/AvailableItems';
import Product from '../components/Product';


export class RegistryChecklist extends Component {
    render() {
        return (
            <div className='container-fluid'>
                <DashboardNav/>
                <hr className='mt-0'/>
                <div className='row mt-3'>
                    <div className='col-1 sidebarMenu'>
                        <SideBar/>
                    </div>
                    <div className='col ml-5'>
                    <h1> Registry Checklist</h1>
                    <p>This is where you manage your registry items.</p>
                    <div className='row mt-5'>
                        <div className=' col-3 availableItem'>
                           <AvailableItems />
                        </div>
                        <div className='col'>
                            <Product showWishList={false}/>
                        </div>
                    </div>
                </div>
                    
                </div>

            </div>
                
           
        )
    }
}

export default RegistryChecklist
