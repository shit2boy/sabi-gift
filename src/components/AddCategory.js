import React, { Component } from 'react'
import { Card, Modal,} from "react-bootstrap";
import axios from 'axios'
import util from "../util/util";


export default class AddCategory extends Component {
    
        state = {
            modalShow: false,
            AddedCategory: '',
            itemCategories : [],
        }

    setModalHide = () => {
        this.setState({ modalShow: false,  });
      };
    
      setModalShow = () => {
        this.setState({ modalShow: true });
      };


    componentDidMount() {
        axios
        .get(`${util.API_BASE_URL}registries/`, {headers:{ Authorization: 'Token ' + localStorage.getItem('token_id')} })

        .then((res) => {
            // console.log(res.data);
            if (res.data !== undefined) {
            let data = res.data;

            // for (let i=0;i<data.length;i++) {
            // let category =[];
            // if (data[i].cat ) {
                
            // }

               
            // this.setState({itemCategories : data});

            // }
            for (let i=0;i<data.length;i++) {
                data[i].picture = data[i].picture.replace("image/upload/","");
            this.setState({itemCategories : data});

            }
            }
        })
        .catch((err) => {
            console.log(err);
            
        });
    }

    render() {
        return (
            <div>
                <div className=''>
                <span onClick={() =>this.setModalShow(true)} className='pointer'>{this.props.button}</span>
                <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={this.state.modalShow}
                onHide={() => this.setModalHide(false)}
                >
                <Modal.Header closeButton>
                    <p>Select Gift registry</p>
                </Modal.Header>
                <Modal.Body className=" ">
                <div className='container'>
                    <div className='row justify-content-center'>
                    {this.state.itemCategories.map((item, index) => (
                    <div className='m-3'>
                        <Card id='myCards' key={index} style={{ width:"8rem",cursor:'pointer',border :'1px dotted' }}>
                            <Card.Body className=''>
                            <Card.Img className="center rounded-circle" alt="items" width='50px' src={item.picture} />
                            </Card.Body>
                        </Card>
                    </div>
                ))} 

                </div>
                
            </div>
            </Modal.Body>
            
          </Modal>
                </div>
                
            </div>
        )
    }
}
