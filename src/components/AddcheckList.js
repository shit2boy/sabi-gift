import React, { Component } from 'react'
import { checkList } from "./imageData";
import { Card} from "react-bootstrap";
import AddCategory from './AddCategory';



    class CheckList extends Component {
      constructor(){
        super();
        this.state ={
          isChecked : false,
      }
    }


    // componentDidMount() {
    //   axios
    //     .get(`${util.API_BASE_URL}accounts/profile/`, {
    //       headers: { Authorization: "Token " + localStorage.getItem("token_id") },
    //     })
    //     .then((res) => {
    //       // console.log(res.data);
    //       if (res.data !== undefined) {
    //         window.localStorage.setItem("name", res.data.first_name);
    //         window.localStorage.setItem("image", res.data.photo);
    //         window.localStorage.setItem("username", res.data.username);
    //       }
    //     })
    //     .catch((err) => {
    //       // console.log(err);
    //       window.localStorage.removeItem("name");
    //       window.localStorage.removeItem("image");
    //       window.localStorage.removeItem("username");
    //       window.location.href = "/";
    //     });
    // }


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
                        <AddCategory button={item.add} />
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
