import React, { Component } from 'react'
import { checkList } from "./imageData";
import { Card} from "react-bootstrap";
import AddCategory from './AddCategory';



    class CheckList extends Component {

      
    render() {
        return (
            < div className='container-fluid'>
              <div className='row'>
                {checkList.map((item) => (
                    <Card key={item.id} id='myCards' className='col-sm-1 m-3' style={{ width: "8rem",cursor:'pointer'}}>
                      <Card.Body>
                        <AddCategory button={<div className="center"><img className=" rounded-circle" width='40px' alt="items" src={item.imageUrl}/></div>} />
                      </Card.Body>
                      <Card.Text className='text-center'>
                          <small className="">{item.Name}</small>
                        <strong className="p-1 d-block">
                            +
                        </strong>
                      </Card.Text>
                    </Card>
                  ))} 
              </div>
            </ div>
        )
    }
}

export default CheckList
