import React, { Component } from 'react'
// import { ProductItems } from "./components/imageData";

const StateContext = React.createContext();

class ProductProvider extends Component {
  state = {
      products : [],
      Cart : [],
     
       
      }
        // handlerChange = (e)=> {
        //   let formField = this.state.formField;
        //   formField[e.target.name] = e.target.value;
        //   this.setState({
        //     formField, 
        //   });
          // console.log(formField)
        // }

       
  // }
        handleEventType = e => {
          this.setState({ eventType: e.target.innerText})
          // let type = this.state.eventType
          // console.log(this.state.eventType)
        };

    getItemId = (id) =>{
      const product = this.state.products.find(item => item.id ===id);
      return product
    }

    // handleItemDetails = (id) => {
    //   const product = this.getItemId(id);
    //   console.log(product);
    //   this.setState(()=>{
    //    console.log(product);
    //   })
    // }

      // addToCart =(id)=>{
      //   let tempProducts = [...this.state.products];
      //   const index = tempProducts.indexOf(this.getItemId(id));
      //   const product = tempProducts[index]
      //   console.log(product);
        // product.inCart =true;
        // product.count = 1;
        // const price = product.price;
        // product.total = price;
      //   this.setState(()=>{
      //     return { products:tempProducts, cart : [...this.state.cart, product]};
      //   },() =>{console.log(this.state)})

      // }
      // wishlist =()=>{
      //   console.log('wishlist');
      // }
      //   componentDidMount() {
      //     this.setProducts();
      //   }
      // setProducts = () =>{
      //   let tempProducts=[];
      //   ProductItems.forEach(item =>{
      //     const singleItem = {...item}; 
      //     tempProducts = [...tempProducts,singleItem]
      //   })
      //   this.setState(()=>{
      //     return {products:tempProducts}})

      // }
    
    render() {
        return (
            <StateContext.Provider 
            value={{...this.state,
            
            handleEventType : this.handleEventType,
            // addToCart : this.addToCart,
            // wishist : this.wishlist,
            // handleItemDetails : this.handleItemDetails,
            }}>
                {this.props.children}
            </StateContext.Provider>
        )
    }
}
const ProductConsumer = StateContext.Consumer;
export {ProductProvider, ProductConsumer, StateContext}
