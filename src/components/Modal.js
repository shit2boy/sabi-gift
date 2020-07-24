import React, {useState} from 'react'
import {Modal,Form,Col} from "react-bootstrap";
import { Link } from 'react-router-dom';


function ModalFindEvent(props) {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  }

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
               
                   <Form noValidate validated={validated} onSubmit={handleSubmit}>
                      <Form.Row>
                      <Form.Group as={Col} controlId="Fname">
                        <Form.Control
                          required
                          type="text"
                          placeholder="Victor's Birthday"
                          />
                          <Form.Control.Feedback type='invalid'>Empty</Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} md={2} controlId="btn">
                        <button type="submit" class="btn p-1" style={{backgroundColor:'#58B852',width: '90px'}}>Find</button>
                      </Form.Group>
                      </Form.Row>
                    </Form>
        </Modal.Body>
      </Modal>
    );
  }
  
  function FindEvent() {
    const [modalShow, setModalShow] = React.useState(false);
  
    return (
      <>
        <Link className='text-white text-decoration-none bg-success px-4 py-2 bannerBtn' onClick={() => setModalShow(true)}>
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



 