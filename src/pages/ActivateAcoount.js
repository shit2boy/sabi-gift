// import React from 'react'

// const ActivateAcoount = () => {
//     const history = useHistory()
//         useEffect(() => {
//         const query = new URLSearchParams(history.location.search)
//         const user_id = query.get("user_id");
//         const timestamp = query.get("timestamp");
//         const signature =query.get("signature");
//         if (user_id) {
//             setUser_id(user_id)
//         }
//         if (timestamp) {
//             setSimestamp(timestamp)
//         }
//         if (signature) {
//             setSignature(signature)
//         }
        
//     }, []);
//     return (
//         <div className='container'>
//             <div>
//             <Form noValidate onSubmit ={this.onSubmit}>
//                 <Form.Group controlId="formBasicEmail">
//                     <Form.Label>User Id</Form.Label>
//                     <Form.Control type="text" name="email" value={this.changeHandler} placeholder="Enter user Id" required />
//                 </Form.Group>

//                 <Form.Group controlId="formBasicPassword">
//                     <Form.Label>Timestamp</Form.Label>
//                     <Form.Control type="text" name="password" value={this.changeHandler} placeholder="Timestamp" />
//                 </Form.Group>
//                 <Form.Group controlId="formBasicPassword">
//                     <Form.Label>Signature</Form.Label>
//                     <Form.Control type="text" name="password" value={this.changeHandler} placeholder="Signature" />
//                 </Form.Group>
//                 <Button className="w-100" variant="success" type="submit" style={{background:'#58B852', color:'#ffffff'}}>
//                     Verify me
//                 </Button>
                
//             </Form>
//             </div>
            
//         </div>
//     )
// }

// export default ActivateAcoount



import React, { Component } from 'react'
import { Button,Form } from 'react-bootstrap';
import axios from "axios";
import util from "../util/util";

export default class ActivateAcoount extends Component {
    constructor(){
        super();
        this.state = {
            user_id : '',
            timestamp : '',
            signature : ''
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

        onSubmit(e){
            e.preventDefault();
            const {user_id, timestamp, signature} = this.state;
            if (!this.state === ''){
                axios.post(`${util.API_BASE_URL}accounts/verify-registration/`, {user_id, timestamp,signature},{ 
                    'headers': {
                      "Content-Type": "application/json",
                      },
                    })
                    . then(data=> {
                        console.log(data);
                      if (data.status === 200){
                        // console.log(data);
                        window.localStorage.setItem('token_id', data.data.token);
                        window.localStorage.setItem('username', data.data.email);
                        window.location.href='/about'
                        // console.log('successfully login');
                      }
                      
                    })
                    .catch(error => {
                      console.log(error);
                    //   this.setState({errorMessage:'invalid'});
                    
                    });
            }
        }

            componentDidMount(){
                const query = new URLSearchParams(window.location.search)
                console.log(window.location.search);
                const user_id = query.get("user_id");
                const timestamp = query.get("timestamp");
                const signature =query.get("signature");
                if (user_id) {
                    this.setState({user_id : user_id})
                }
                if (timestamp) {
                    this.setState({timestamp : timestamp})
                }
                if (signature) {
                    this.setState({signature : signature})
                }
                
            }

    render() {
        return (
            <div className='container'>
                <div className='mt-5'>
                <Form noValidate>
                 <Form.Group controlId="formBasicEmail">
                    <Form.Label>User Id</Form.Label>
                     <Form.Control type="text" name="email" value={this.state.user_id} readOnly placeholder="Enter user Id" required />
                 </Form.Group>

                 <Form.Group controlId="formBasicPassword">
                     <Form.Label>Timestamp</Form.Label>
                     <Form.Control type="text" name="password" value={this.state.timestamp} readOnly placeholder="Timestamp" />
                 </Form.Group>
                 <Form.Group controlId="formBasicPassword">
                     <Form.Label>Signature</Form.Label>
                     <Form.Control type="text" name="password" value={this.state.signature} readOnly placeholder="Signature" />
                 </Form.Group>
                 <Button className="w-100" variant="success" onClick={this.onSubmit} type="submit" style={{background:'#58B852', color:'#ffffff'}}>
                     Verify me
                 </Button>
                
             </Form>
                </div>
           </div>
        
        )
    }
}
