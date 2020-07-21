import React, { Component } from 'react'
import { Input } from 'antd';
import { ProductItems } from "./imageData";
import { GrFavorite } from "react-icons/gr";
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
                        <div id='productCards' className='card m-2 col-sm-3' style={ productStyle}>
                        <Card.Img className="center" alt="items" src={item.imgUrl} />
                        <span className='d-block ml-auto'>{item.price}</span>
                        <Card.Body>
                            <small className='d-block'>{item.info}</small>
                            <small>{item.comment}</small>
                        </Card.Body>
                        <div className='d-flex'>
                            <p type='button' className='mb-0 p-2'style={{background:'#ededed',width:'95px',color :'#2c2c2c'}}><GrFavorite/> Wishlist</p>
                            <p type='button'className='mb-0 p-2'style={{background:'#6F64F8',width:'100px', borderBottomRightRadius:'8px'}}>Add to cart</p>
                        </div> 
                        </div>
                    ))}
                </div>

            </div>
        )
    }
}

export default Product
