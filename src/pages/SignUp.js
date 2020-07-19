import React, { Component } from "react";
import { Link } from "react-router-dom";
import sabigift from "../images/landing/sabigift.png";
import { Form,Steps  } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Input,Checkbox } from "antd";
// import { Col} from "react-bootstrap";

const { Step } = Steps;

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      questions: [
        "Yay, Someone is ready to \n celebrate ! Let's quickly get you started.",
        "Who's your lucky spouse to be?",
        " \n when is your Special day?",
        "How many guests are you inviting?",
      ],
      answers : ["","","",""],
      firstOff: "",
      luckySpouse: "",
      specialDay: "",
      noOfGuests: 0,
      currentIndex: 0,
      formValue: "",
      button : 'GET STARTED',
    };
  }
  mapValueAndNext = () => {
    console.log(this.state.formValue);
    console.log(this.state.currentIndex);
    let value = this.state.formValue;
    let currentIndex = this.state.currentIndex;

    if (this.state.currentIndex > 3) {
        
    this.setState({ currentIndex: currentIndex + 1, button : 'Submit' });
      return;
    }
    
    let answers = this.state.answers;
    answers[currentIndex] = value;
    this.setState({answers : answers});
    console.dir(this.state);
    this.setState({ currentIndex: currentIndex + 1 });
    this.setState({ formValue: this.state.answers[currentIndex+1] });
  }

  goBack = () => {
      console.log(this.state)
      console.log("current index " + this.state.currentIndex)
      console.log("current index " + this.state.answers[this.state.currentIndex-1])
      let formValue = this.state.answers[this.state.currentIndex-1];
    if (this.state.currentIndex <=0) {
        return;
    }

    if (this.state.currentIndex <= 4) {
        this.setState({currentIndex : this.state.currentIndex - 1});
        this.setState({formValue : formValue});
        console.log(this.state.formValue)
    }

    // const onFinish = values => {
    //     console.log('Received values of form: ', values);
    //   };
  }

  render() {
    return (
      <div className='container-fluid'>
          <div className="row">
            <div className=" col-4 leftSignUp" >
                <Link className='mt-3' to="/">
                  <img
                    className="homeicon rounded-circle"
                    src={sabigift}
                    alt="SabiGift-Logo"
                  />
                </Link>
             
              <div>
                <h4 className="text-white">WHY OUR SERVICES?</h4>
              </div>
              <Steps className="px-5 text-white text-center" direction="vertical" current={1}>
                <Step
                  color= " white" 
                  title="Lorem ipsum lorem ipsum"
                  description="Lorem ipsum lorem sioe"
                />
                <Step
                 
                  title="Lorem ipsum lorem ipsum"
                  description="Lorem ipsum lorem sioe"
                />
                <Step
                 
                  title="Lorem ipsum lorem ipsum"
                  description="Lorem ipsum lorem sioe"
                />
                <Step
                  
                  title="Lorem ipsum lorem ipsum"
                  description="Lorem ipsum lorem sioe"
                />
                <Step
                 
                  title="Lorem ipsum lorem ipsum"
                  description="Lorem ipsum lorem sioe"
                />
              </Steps>
            </div>
            <div className="col-8 rightSignUp">
              <div className="py-5 ml-5">
                {this.state.currentIndex === 2 && (
                  <div id='title'>
                    {(
                      this.state.answers[0] +
                      " " +
                      this.state.answers[1] +
                      this.state.questions[2]
                    )
                      .split("\n")
                      .map((text, index) => (
                        <h2>{text}</h2>
                      ))}
                    <div className="mt-4">
                      <input
                        className="p-2"
                        type="date"
                        id="inputField"
                        value={this.state.formValue}
                        placeholder="Enter Name"
                        required
                        onChange={(e) =>
                          this.setState({ formValue: e.target.value })
                        }
                      />
                       {this.state.currentIndex === 0 && <button
                        className="btn btn-dark rounded-pill ml-4 px-3"
                        onClick={(e) => this.mapValueAndNext(e)}
                      >
                        GET STARTED
                      </button>}
                      
                      {this.state.currentIndex > 0 && <button
                        className="btn btn-dark rounded-pill ml-4 px-3"
                        onClick={(e) => this.mapValueAndNext(e)}
                      >
                        Next
                      </button>}
                    </div>
                  </div>
                )}
                {this.state.currentIndex !== 2 && this.state.currentIndex !== 4 && (
                  <div>
                    {this.state.questions[this.state.currentIndex]
                      .split("\n")
                      .map((text, index) => (
                        <h2>{text}</h2>
                      ))}
                    <div className="mt-4">
                      <input
                        className="p-2"
                        type="text"
                        id="inputField"
                        value={this.state.formValue}
                        placeholder="Enter Name"
                        required
                        onChange={(e) =>
                          this.setState({ formValue: e.target.value })
                        }
                      />
                      {this.state.currentIndex === 0 && <button
                        className="btn btn-dark rounded-pill ml-4 px-3"
                        onClick={(e) => this.mapValueAndNext(e)}
                      >
                        GET STARTED
                      </button>}
                      
                      {this.state.currentIndex > 0 && <button
                        className="btn btn-dark rounded-pill ml-4 px-3"
                        onClick={(e) => this.mapValueAndNext(e)}
                      >
                        Next
                      </button>}
                    </div>
                  </div>
                )}

                {this.state.currentIndex === 4 && <div className='col-8'>
                    <div className='' >
                        <h2>Good News! You can create <br/>
                            a free registry on SabiGifts.<br/>
                            Let's create your account</h2>

                             <Form
                            name="normal_login"
                            className="login-form ml-5 w-50"
                            initialValues={{
                                remember: true,
                            }}
                            
                            >
                            <Form.Item
                                name="username"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>
                            <div className='d-inline'>
                            <Form.Item
                                name="password"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                                ]}
                            >
                                <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item
                                name="confirmPassword"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your Confirm Password!',
                                },
                                ]}
                            >
                                <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder=" Confirm Password"
                                />
                            </Form.Item>
                            </div>
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <p className="login-form-forgot" >
                                Forgot password
                                </p>
                            </Form.Item> 

                            {/* <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                               Sign up
                                </Button>
                                Or <Link href="">register now!</Link>
                            </Form.Item> */}
                            </Form>


                            {/* <Form className=''>
                                <Form.Row>
                                  <Form.Group  controlId="formGridNmae">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control type="text" placeholder="Jimi" />
                                  </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                  <Form.Group as={Col} controlId="formGridLastname">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="********" />
                                  </Form.Group>
                                  <Form.Group as={Col} controlId="formGridPhone">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type='password' placeholder="*********" />
                                  </Form.Group>
                                </Form.Row>
                              </Form> */}

                            <Link to='/about' className='btn btn-dark rounded-pill px-5'>Sign Up</Link>
                    </div>
              </div>
                }
                
              <div className=''>
              {this.state.currentIndex < 4 && <div style={{paddingTop:'40vh'}} >
                  <button onClick={()=>this.goBack()} className=" btn btn-light rounded-pill px-5">
                    Back
                  </button>
                </div>}
                
              </div>
              </div>
             
              
            </div>
          </div>
        </div>
    );
  }
}

export default SignUp;
