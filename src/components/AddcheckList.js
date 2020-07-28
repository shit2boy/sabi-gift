import React, { Component } from 'react'
import { checkList } from "./imageData";
import { Card} from "react-bootstrap";



    class CheckList extends Component {
    render() {
        return (
            <>
              {checkList.map((item) => (
                  <Card key={item.id} id='myCards' style={{ width: "8rem"}}>
                    <Card.Body>
                      <Card.Img className="center rounded-circle" alt="items" src={item.imageUrl} />
                    </Card.Body>
                    <Card.Text className='text-center'>
                        <small className="">{item.Name}</small>
                      <strong className="p-1">
                          +
                      </strong>
                    </Card.Text>
                  </Card>
                ))} 
            </>
        )
    }
}

export default CheckList
