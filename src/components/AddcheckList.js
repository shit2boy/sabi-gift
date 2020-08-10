import React, { Component } from 'react'
import { checkList } from "./imageData";
import { Card} from "react-bootstrap";



    class CheckList extends Component {
    render() {
        return (
            < div className='container-fluid'>
              <div className='row'>
                {checkList.map((item) => (
                    <Card key={item.id} id='myCards' className='col-sm-1 m-3' style={{ width: "8rem"}}>
                      <Card.Body>
                        <Card.Img className="center rounded-circle" alt="items" src={item.imageUrl} />
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
