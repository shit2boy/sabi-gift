import React from 'react'
import {Modal} from "react-bootstrap";
import { Link } from 'react-router-dom';


function ModalFindEvent(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="findevent">
           <h2>Find an event Registry or Website</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <form className='container h-25'>
                    <div class="form-group row" style={{borderRadius: '15px'}} >
                        <div class="col-sm-10 mx-auto">
                            <input type="email" class="form-control" id="findEvent" placeholder="Victor's Birthday"/>
                        </div>
                        <button type="submit" class="btn p-1" style={{backgroundColor:'#6F64F8',width: '90px'}}>Find</button>
                    </div> 
                </form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer> */}
      </Modal>
    );
  }
  
  function FindEvent() {
    const [modalShow, setModalShow] = React.useState(false);
  
    return (
      <>
        <Link className='text-white bg-success p-2 bannerBtn' onClick={() => setModalShow(true)}>
            Find an Event
        </Link>
  
        <ModalFindEvent
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }
export {FindEvent};



 