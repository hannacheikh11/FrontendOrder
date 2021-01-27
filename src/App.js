
import React from "react";
import Cart from "./components/Cart";
import Products from "./components/Products";
import data from "./data.json";

import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import order from "./components/Cart";


import GetOrders from "./components/GetOrders";
import Edite from "./components/Edite";
import generalGet from "./components/to";



 class App extends React.Component {
  constructor(){
    super()
    this.state={
    products: data.products,
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    }
  }


  
  //createOrder = (order) => {
    
  //  alert("Your order " + order.name);
   // axios.post('/api/v1/orders', { order })
   // .then(res => {
     // console.log(res);
      ////console.log(res.data);
     

   // })
  
//  .catch(error => {
   // console.log(error)
 // })
//}

  //el metodo close modedl

  closeModal = () => {
    this.state.order=null
  };


 


  
  // el methodo eliminar un producto del pedido
removeFromCart=(product)=>{
  const cartItems = this.state.cartItems.slice();
  this.setState({
    cartItems: cartItems.filter((x)=> x._id !==product._id)
  });
  localStorage.setItem("cartItems", JSON.stringify( cartItems.filter((x)=> x._id !==product._id)));
}
// el methodo añdir un producto al pedido
  addToCart=(product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart=false;
    cartItems.forEach((item) =>{
      if(item.codigo=== product.codigo){
        item.count++;
        alreadyInCart=true;
      }
    });
    if(!alreadyInCart)
{
  cartItems.push({...product, count: 1})
} 
this.setState({cartItems});
// persistencia de mi pagina 

 }



  render() {

   return (
    
    <div className="grid-container">
  <header>
              <a href="/">Order</a>
               
              </header>
              <main>
               <div className= "content">
               <div className= "main"> 
              
               
               <Products 
               products={this.state.products}
               addToCart={this.addToCart}></Products> </div>
               
               <div className= "sidebar"> <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart}  createOrder={this.createOrder} removeFromOrder={this.removeFromOrder}/> </div>




               {this.state.order ?(
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                x
              </button>
              <div className="order-details">
                <h3 className="success-message">Your order.</h3>
                <h2>Order {order._id}</h2>
                <ul>
                  <li>
                    <div>Name:</div>
                    <div>{this.state.order.Name}</div>
                  </li>

                  <li>
                    <div>DNI:</div>
                    <div>{this.state.order.DNI}</div>
                  </li>
                  <li>

                    
                    <div>Email:</div>
                    <div>{this.state.order.email}</div>
                  </li>
                  <li>
                    <div>Address:</div>
                    <div>{this.state.order.address}</div>
                  </li>
                  <li>
                    <div>Date created:</div>
                    <div>{this.state.order.created}</div>
                  </li>
                  <li>
                    <div>Total:</div>
                    <div>{this.state.order.total}€</div>
                    <li>
                    <button
                        className="button"
                        onClick={() => this.props.removeFromOrder(order._id)}
                      >
                        Remove Order
                      </button>
                      </li>
                   
                  </li>
                  <li>
                    <div>Cart Items:</div>
                    <div>
                      {order.cartItems.map((x) => (
                        <div>
                          {x.count} {" x "} {x.title}
                        </div>
                      ))}
                    </div>
                  </li>
                </ul>
              </div>
            </Zoom>
          </Modal>
        ):""}


<generalGet/>
<GetOrders/>
<label> Edite you order:</label>
<Edite/>



               </div>
             </main> 
               <footer>
                 All rignt
               </footer>
             
             
              </div>
            
  );
}
}
export default App;


