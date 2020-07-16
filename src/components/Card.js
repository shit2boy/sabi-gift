import React from 'react'

const Card = ({image,title,content}) => {
    return ( <div className='mt-4' id="myCard">
            <div class="card text-center">
                <div><img class="card-img-top rounded-circle center" src={image} style={{backgroundColor: '#58b852', width:'50px'}} alt="Card cap"/></div>
                <div class="card-body" style={{minHeight:'50px'}}>
                <h5 class="card-title">{title}</h5>
                <p class="card-text">{content}</p>
                </div>
                <div class="card-footer">
                <h6 class="pointer">Get Started</h6>
                <small class="text-center pointer">Sign Up Free</small>
                </div>
            </div>
        </div>
      
    )
}

export default Card
