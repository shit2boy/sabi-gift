import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({image,title,content,footerTitle,footDescription}) => {
    return ( <div className='mt-4' id="myCard">
            <div className="card text-center">
                <div><img className="card-img-top rounded-circle center" src={image} style={{backgroundColor: '#58b852', width:'50px'}} alt="Card cap"/></div>
                <div className="card-body" style={{minHeight:'50px'}}>
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{content}</p>
                </div>
                <div className="card-footer">
                <h6 className="pointer"><Link className='text-link' to='/createRegistry'> {footerTitle}</Link></h6>
                <small className="text-center pointer">{footDescription}</small>
                </div>
            </div>
        </div>
      
    )
}

export default Card
