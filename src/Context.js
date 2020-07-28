import React, { Component } from 'react'

const StateContext = React.createContext();

class ProductProvider extends Component {
    state = {
        formField : {},

    }
    changeHandler = (e)=>{
    let formField = this.state.formField;
      formField[e.target.name] = e.target.value;
      this.setState({
        formField,
      });
      console.log(formField)
    }
    render() {
        return (
            <StateContext.Provider 
            value={{...this.state,
            changeHandler : this.changeHandler}}>
                {this.props.children}
            </StateContext.Provider>
        )
    }
}
const ProductConsumer = StateContext.Consumer;
export {ProductProvider, ProductConsumer}
