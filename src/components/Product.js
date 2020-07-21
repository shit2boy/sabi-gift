import React, { Component } from 'react'
import { Input } from 'antd';
import { ProductItems } from "./imageData";
import { Card } from "react-bootstrap";


const { Search } = Input;

let productStyle= {
    width : '20rem',
    // minHeight: '10rem',
boxShadow: '0px 2px 8px #00000022',
borderRadius: '8px',
opacity: '1',
overflow: 'hidden',
}


export class Product extends Component {
   state={
       Product : [],
   }
    render() {
        return (
            <div className=''>
                 <div className='d-flex'>
                      <div className='col-9'><Search placeholder="Search here" onSearch={value => console.log(value)} enterButton /></div>
                      <div className=''>
                        <select value='Default'>
                            <option>item</option>
                            <option>item</option>
                            <option>item</option>
                        </select>
                        </div>
                        <div>
                            <span>tray</span>
                            <span>list</span>
                        </div>
                      
                    </div>
                    <div className='row'>
                    {ProductItems.map((item) => (
                        <Card id='productCards' className='m-3 col-sm-3' style={ productStyle}>
                        <Card.Img className="center" alt="items" src={item.imgUrl} />
                        <span className='d-block ml-auto'>{item.price}</span>
                        <Card.Body>
                            <small className='d-block'>{item.info}</small>
                            <small>{item.comment}</small>
                        </Card.Body>
                        <div className='footer my-1 d-flex justify-content-between'>
                            <button type='button' className='btn '>Wishlist</button>
                            <button type='button'className='btn btn-primary' >Add to cart</button>
                        </div>
                        </Card>
                    ))}
                </div>

            </div>
        )
    }
}

export default Product
