import React, { Component } from 'react'
import { Input } from 'antd';
import { GrFavorite } from "react-icons/gr";
import { BsFillGridFill,BsListUl } from "react-icons/bs";
import { Card } from "react-bootstrap";
// import {StateContext} from "../Context"
import axios from "axios";
import util from "../util/util";
import AddToCart from "./AddToCart";
// import { propTypes } from 'prop-types';


const { Search } = Input;

// let productStyle= {
    // width : '8rem',
    // minHeight: '10rem',
    // paddingLeft : '0px',
    // paddingRight : '0px',
    // boxShadow: '0px 1px 8px #00000022',
    // borderRadius: '8px',
    // opacity: '1',
    // overflow: 'hidden',
// }


export class Product extends Component {
//   static contextType = StateContext;
   
    state={
       Products : [],
   }

        componentDidMount() {
            axios
            .get(`${util.API_BASE_URL}registries/`, {headers:{ Authorization: 'Token ' + localStorage.getItem('token_id')} })

            .then((res) => {
                // console.log(res.data);
                if (res.data !== undefined) {
                let data = res.data;
                for (let i=0;i<data.length;i++) {
                    data[i].picture = data[i].picture.replace("image/upload/","");
                }
                this.setState({Products : data});
                }
            })
            .catch((err) => {
                console.log(err);
                
            });
        }


    render() {
        return (
            <div className='container-fluid'>
                <div className='row mb-1'>
                    <div className='col-8'>
                        <small>7,618 results found in 5ms</small>
                    </div>
                    <div className='col-2 d-none d-lg-block'>
                    <select className='p-1'>
                        <option>Default</option>
                        <option>item</option>
                        <option>item</option>
                    </select>
                       <span><BsFillGridFill/></span>
                        <span className=''><BsListUl/></span>
                    </div>
                </div>
                <div className='row mb-2'>
                      <div className='col-sm-10'><Search placeholder="Search here" onSearch={value => console.log(value)} /></div>
                     
                </div>
                    <div className='row'>
                    {/* onClick={(id)=>this.context.handleItemDetails(id)} */}
                    {this.state.Products.map((item) => (
                            <Card key={item.id} className='productCards  col-sm-3 m-3'  >
                        <div><img className="card-img center" alt="items" src={item.picture} /></div>
                        <p className='card-img-overlay text-danger text-left mt-0 ml-0'></p>
                        <span className='d-block ml-auto'>#{item.price}</span>
                        {/* <span className='d-block mr-auto'>#{item.discount_price}</span> */}
                        <Card.Body style={{minHeight:'50px',padding:'5px'}}>
                            <strong className='d-block' style={{textOverflow: 'ellipsis'}}>{item.name}</strong>
                            <small>{item.description}</small>
                        </Card.Body>
                        <div></div>
                        {!this.props.showWishList && <div className='col p-0 mb-0'>
                            <span type='button' className='col-6 p-2'style={{background:'#ededed',color :'#2c2c2c'}}><GrFavorite/> Wishlist</span>
                            <AddToCart productId={item.id} image={item.picture} info={item.description} price={item.price} inStock={item.in_stock} button={<span type='button'className='col-6 p-2'style={{background:'#6F64F8',borderBottomRightRadius:'8px'}}>Add to cart</span>}/>
                    </div> }
                        
                        {this.props.showWishList && <div className=' col-12 p-0 mb-0'>
                            <AddToCart productId={item.id} image={item.picture} info={item.description} price={item.price} inStock={item.in_stock} button={<span type='button'className='p-2 col text-center'style={{background:'#6F64F8', borderBottomRightRadius:'8px'}}>Add to cart</span>}/>
                            
                            
                        </div> }
                       
                        </Card>
                    ))}
                </div>

            </div>
        )
    }
}

export default Product

// Product.protoTypes = {
//     product:propTypes.Object({
//         id:propTypes.number,
//         picture:propTypes.string,
//         price:propTypes.string,info: propTypes.string,

//     }).isRequired
// }
