import React, { Component } from 'react'
import { checkList } from "./imageData";
import { Card} from "react-bootstrap";



    class CheckList extends Component {
    render() {
        return (
            <>
              {checkList.map((item) => (
                  <Card key={item.id} id='myCards' style={{ width: "8rem" }}>
                    <Card.Body>
                      <Card.Img className="center rounded-circle" alt="items" src={item.imageUrl} />
                    </Card.Body>
                    <Card.Text>
                        <small className="p-1">{item.name}</small>
                      <small className="p-1">
                          +
                      </small>
                    </Card.Text>
                  </Card>
                ))} 
            </>
        )
    }
}

export default CheckList
