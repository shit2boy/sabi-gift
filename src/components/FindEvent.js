import React, { Component } from 'react'
import axios from "axios";
import util from "../util/util";

export class FindEvent extends Component {
    constructor(){
        super()
        this.state={
            result : [],
        }
    }
        async componentDidMount(){
            try {
                    
               
                // filterResult= ()=> {
               let res= await axios.get (`${util.API_BASE_URL}events/`,{ 'content-type': 'multipart/form-data' })
            } catch (error) {
                console.log(error)
            }
        }
    
    render() {
        return (
            <div>
            <form className='container'>
                <div class="form-group row">
                   <div class="col-sm-8 br-1">
                        <input type="email" class="form-control" id="inputEmail3" placeholder="Victor's Birthday"/>
                    </div>
                    <button type="submit" class="btn p-2" style={{backgroundColor:'#6F64F8'}}>Find</button>
                </div> 
            </form>
            <p class='text-center'>We found 50 event registries</p>
            </div>
        )
    }
}

export default FindEvent
