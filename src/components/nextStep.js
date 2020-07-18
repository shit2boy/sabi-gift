import React, { Component } from 'react'


export class nextStep extends Component {
    render() {
        return (
            <div>
               { imgCardlist.map(item =>
               <div class="card text-center">
               <div></div>
               <div class="card-body">
               <img class="p-2 img-fluid" src={item.imageUrl} alt='itemimage' />
               
               </div>
               <div class="card-footer">
               <h6 class="pointer">{item.index +1}</h6>
               <small class="text-center pointer">Add item to Gift registry <span className='text-right'>+</span></small>
               </div>
           </div>
               )
                }
            </div>
        )
    }
}

export default nextStep
