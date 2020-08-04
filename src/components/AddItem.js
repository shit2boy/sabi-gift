import React, { Component } from 'react'
import smartwatch from '../images/Sabi-storepage/smartwatch.jpg'
import { GrFavorite } from "react-icons/gr";
import { Modal } from 'react-bootstrap';

import { Rate } from 'antd';




export class AddItem extends Component {
    constructor(){
        super()
        this.state = {
            modalShow: false,
        }
       
    }
    setModalHide = () => {
        this.setState({ modalShow: false,  });
      };
    
      setModalShow = () => {
        this.setState({ modalShow: true });
      };
    
    render() {
        return (
                <>
                <p onClick={() =>this.setModalShow(true)} className='pointer'></p>
                <Modal
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.state.modalShow}
            onHide={() => this.setModalHide(false)}
          >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body className=" ">
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col d-flex justify-content-center ' style={{maxheight : '400px'}}>
                        <div className='mt-4 shadow'>
                            <img src={smartwatch} alt='apple-watch'/>
                        </div>

                    </div>
                    <div className='col d-flex justify-content-center' style={{maxheight : '400px'}}>
                        <div  className='mt-4'>
                            <Rate allowHalf defaultValue={4.5} /> <span>1 customer review</span> 
                            <h3>Water resistant black coloured Apple watch</h3>
                            <span className='d-block' style={{color:'#59CF1F'}}>In Stock</span>
                            <div className='d-flex justify-content-between align-items-center mt-4 p-2' style={{width:'400px', border: '2px solid #E2E2E2',borderRadius: '15px',opacity: '1'}}>
                                <p>₦130,099</p>
                                <div >
                                    <select className='p-2 mr-1' value="1">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </select>
                                    <input className='p-2 btn-primary' type= 'button'  value='Add to Cart' style={{background:'#6F64F8',borderRadius: '15px', opacity: '1'}}/>
                                </div>
                                <GrFavorite size='35'/>
                            </div>
                            <div className='mt-5'>
                                <p>Delivery:  <span classNme='ml-4'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum soci...</span></p>
                            </div>
                        </div>
                    </div>

                </div>
                
            </div>
            </Modal.Body>
            
          </Modal>
                </>
            
        )
    }
}

export default AddItem
