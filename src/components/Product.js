import React, { Component } from 'react'
import { Input } from 'antd';
import { GrFavorite } from "react-icons/gr";
import { BsFillGridFill,BsListUl } from "react-icons/bs";
import { Card } from "react-bootstrap";
// import {StateContext} from "../Context"
import axios from "axios";
import util from "../util/util";
// import AddItem from "./AddItem";
// import { propTypes } from 'prop-types';


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
//   static contextType = StateContext;
   
    state={
       Products : [],
   }

        componentDidMount() {
            axios
            .get(`${util.API_BASE_URL}registries/`, {headers:{ Authorization: 'Token ' + localStorage.getItem('token_id')} })

            .then((res) => {
                console.log(res.data);
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
            <div className=''>
                 <div className='d-flex'>
                      <div className='col-9'><Search placeholder="Search here" onSearch={value => console.log(value)} enterButton /></div>
                      <div className=''>
                        <select className='p-1'>
                            <option>Default</option>
                            <option>item</option>
                            <option>item</option>
                        </select>
                        </div>
                        <div>
                            <span><BsFillGridFill/></span>
                            <span className='ml-1'><BsListUl/></span>
                        </div>
                      
                    </div>
                    <div className='row'>
                    {this.state.Products.map((item) => (
                        <div key={item.id} id='productCards' className='card m-2 col-sm-3' onClick={(id)=>this.context.handleItemDetails(id)} style={ productStyle}>
                        <Card.Img className="center" alt="items" src={item.picture} />
                        <span className='d-block ml-auto'>#{item.price}</span>
                        <Card.Body>
                            <small className='d-block'>{item.description}</small>
                            <small>{item.comment}</small>
                        </Card.Body>
                        {!this.props.showWishList && <div className='d-flex'>
                            <p type='button' className='mb-0 p-2'style={{background:'#ededed',mniWidth:'95px',color :'#2c2c2c'}}><GrFavorite/> Wishlist</p>
                            <p type='button'className='mb-0 p-2'style={{background:'#6F64F8',mniWidth:'100px', borderBottomRightRadius:'8px'}}>Add to cart</p>
                        </div> }
                        
                        {this.props.showWishList && <div className='d-flex'>
                            <p type='button'className='mb-0 p-2 text-center'style={{background:'#6F64F8',mniWidth:'200px', borderBottomRightRadius:'8px'}}>Add to cart</p>
                        </div> }
                        </div>
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
