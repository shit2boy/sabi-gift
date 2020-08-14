import React, { Component } from 'react'
import SideBar from '../components/SideBar';
import {Card } from "react-bootstrap";
import DashboardNav from '../components/DashboardNav'
import kitchen from '../images/Sabi-storepage/kitchen.png'
import CheckList from '../components/AddcheckList';
import { manageRegistry } from "../components/imageData";
// import AddCategory from '../components/AddCategory'
import axios from 'axios'
import util from "../util/util";



export class ManageRegistry extends Component {
    state={
            itemCategories : [],
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
                if (data[i].cat === 'Cooking') {
                    let category = [];
                    category.push(data[i].cat,data[i].picture)
                this.setState({itemCategories : category});
                    
                }else{
                    return;
                }

            // let category = [];
            // category.push(data[i].cat)

            // this.setState({itemCategories : category});

            }
            // this.setState({itemCategories : data});
            console.log(this.state.itemCategories);

            }
        })
        .catch((err) => {
            console.log(err);
            
        });
    }


    render() {
        return (
            <div className='container-fluid'>
                <DashboardNav/>
                <div className='row mt-5'>
                    <div className='col-1 d-none d-lg-block'>
                        <SideBar/>
                    </div>
                    <div className='col ml-3'>
                        <div className='row '>
                            <div classNmae='col-12'>
                            <h1><strong>Manage Registry</strong></h1>
                            <p>This is where you manage your registry items.</p>
                            </div>
                        </div>
                        <div className='row mt-5 '>
                            <div className='col-12 text-center' style={{height :'130px', border:'1px solid'}}>
                                <h6 className='py-2'>YOUR REGISTRY URL</h6>
                                <p>www.sabigifts.ng/registry/jimi2020</p>
                            </div>
                       
                            <div className='manageReg text-center mt-4' style={{borderRadius:'25px', height:'250px'}}>
                                <h2 className='py-3 text-white'>Jimi & Joanna</h2>
                                <h5 className='py-4 text-white'>February 10, 2020 (14 days left)</h5>
                            </div>
                        </div>
                       <div classNmae=' row col' style={{marginTop:'25px'}}>
                       <h5>Your Registry Checklist</h5>
                       </div>
                        <div className='mt-4 row'>
                            <div className="col">
                                <CheckList/>
                            </div>
                        </div>
                            
                        <h5 className='mt-4'>Add items to your registry</h5>
                        <div className='row' style={{marginTop:'40px'}}>
                            <div className='col-sm-2'>
                                    <Card id=''style={{ width: "8rem", borderRadius : '25px',background:'#6668A3',boxShadow: '0px 30px 60px #BA2F4F41'}}>
                                        <Card.Body>
                                        <Card.Img className="center rounded-circle" alt="items" src={kitchen} width='60px' />
                                        </Card.Body>
                                        <Card.Text className='text-center'>
                                            <small className="p-1">kitchen Essentials</small>
                                            <strong className="d-block p-1">10</strong>
                                        </Card.Text>
                                    </Card>
                            </div>
                            <div className='col mb-5' style={{ border:'1px solid #CBCBCB',borderRadius: '25px',opacity: '1' }}>
                                <div className='row'>
                                    {this.state.itemCategories.map((item, index) => (
                                    <div className='m-3'>
                                            <Card id='myCards' key={index} style={{ width:"8rem",cursor:'pointer',border :'1px dotted' }}>
                                                <Card.Body className=''>
                                                {/* <Card.Img className="center rounded-circle" alt="items" width='40px' src={item.picture} /> */}
                                                </Card.Body>
                                            </Card>
                                    </div>
                                ))} 
                                </div>

                            </div>
                        </div>
                        
                        <div className='row' style={{marginTop:'40px'}}>
                            <div className='col-sm-2'>
                                    <Card id=''style={{ width: "8rem", borderRadius : '25px',background:'#6668A3',boxShadow: '0px 30px 60px #BA2F4F41'}}>
                                        <Card.Body>
                                        <Card.Img className="center rounded-circle" alt="items" src={kitchen} width='60px' />
                                        </Card.Body>
                                        <Card.Text className='text-center'>
                                            <small className="p-1">Dining Essentials</small>
                                            <strong className="d-block p-1">10</strong>
                                        </Card.Text>
                                    </Card>
                            </div>
                            <div className='col mb-5' style={{ border:'1px solid #CBCBCB',borderRadius: '25px',opacity: '1' }}>
                                <div className='row'>
                                {manageRegistry.map((item, index) => (
                                    <div className='m-3'>
                                            <Card id='myCards' key={index} style={{ width:"8rem",cursor:'pointer',border :'1px dashed' }}>
                                                <Card.Body className=''>
                                                <Card.Img className="center rounded-circle" alt="items" width='40px' src={item.imageUrl} />
                                                </Card.Body>
                                            </Card>
                                    </div>
                                ))} 
                                </div>

                            </div>
                        </div>
                        <div className='row' style={{marginTop:'40px'}}>
                            <div className='col-sm-2'>
                                    <Card id=''style={{ width: "8rem", borderRadius : '25px',background:'#6668A3',boxShadow: '0px 30px 60px #BA2F4F41'}}>
                                        <Card.Body>
                                        <Card.Img className="center rounded-circle" alt="items" src={kitchen} width='60px' />
                                        </Card.Body>
                                        <Card.Text className='text-center'>
                                            <small className="p-1">kitchen Essentials</small>
                                            <strong className="d-block p-1">10</strong>
                                        </Card.Text>
                                    </Card>
                            </div>
                            <div className='col mb-5' style={{ border:'1px solid #CBCBCB',borderRadius: '25px',opacity: '1' }}>
                                <div className='row'>
                                {manageRegistry.map((item, index) => (
                                    <div className='m-3'>
                                            <Card id='myCards' key={index} style={{ width:"8rem",cursor:'pointer',border :'1px dashed' }}>
                                                <Card.Body className=''>
                                                <Card.Img className="center rounded-circle" alt="items" width='40px' src={item.imageUrl} />
                                                </Card.Body>
                                            </Card>
                                    </div>
                                ))} 
                                </div>

                            </div>
                        </div>



                    </div>

                </div>
                
            </div>
        )
    }
}

export default ManageRegistry
