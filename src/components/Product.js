import React, { Component } from 'react'
import { Input } from 'antd';
import { ProductItems } from "./imageData";
import { Card } from "react-bootstrap";


const { Search } = Input;

let productStyle= {
    width : '14rem',
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
                      <div className='col-10'><Search placeholder="Search here" onSearch={value => console.log(value)} enterButton /></div>
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
                        <Card.Body>
                            <Card.Img className="center" alt="items" src={item.imgUrl} />
                        </Card.Body>
                        <Card.Footer className=' m-0 d-flex justify-content-between'>
                            <button type='button' className='btn '>Wishlist</button>
                            <button type='button'className='btn btn-primary' >Add to cart</button>
                        </Card.Footer>
                        </Card>
                    ))}
                </div>

            </div>
        )
    }
}

export default Product
