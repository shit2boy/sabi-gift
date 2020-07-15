import React from 'react'

const Card = ({image,title,content}) => {
    return ( <div>
            <div class="card text-center">
                <img class="card-img-top rounded center" src={image}style={{alignSelf:'center', width:'50px'}} alt="Card cap"/>
                <div class="card-body" style={{minHeight:'50px'}}>
                <h5 class="card-title">{title}</h5>
                <p class="card-text">{content}</p>
                </div>
                <div class="card-footer">
                <p class="pointer">Get Started</p>
                <p class="text-center pointer">Sign Up Free</p>
                </div>
            </div>
        </div>
      
    )
}

export default Card
