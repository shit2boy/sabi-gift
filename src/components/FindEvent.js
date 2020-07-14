import React, { Component } from 'react'

export class FindEvent extends Component {
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
