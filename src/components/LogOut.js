import React, { Component } from 'react'
import axios from "axios";
import util from "../util/util";




export class LogOut extends Component {
    constructor(props){
        super(props);
      this.onLogOut = this.onLogOut.bind(this)

    }
   
    onLogOut(){
        axios.post(`${util.API_BASE_URL}accounts/logout/`, {"revoke_token": "true"}, {
            headers: { Authorization: "Token " + localStorage.getItem("token_id") }
        })
        . then(data=> {
          if (data.status === 200){
            // console.log(data);
            window.localStorage.removeItem('token_id', data.data.token);
            window.localStorage.removeItem('username', data.data.email);
            window.location.href='/'
            // console.log('successfully login');
          }
          
        })
        .catch(error => {
          console.log(error);
        
        });
      
      };
    render() {
        return (
            <>
              <span onClick={this.onLogOut} style={{cursor: 'pointer'}}>{this.props.logout}</span>  
            </>
        )
    }
}

export default LogOut
