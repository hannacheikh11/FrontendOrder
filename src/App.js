
import React from "react";
import Cart from "./components/Cart";
import Products from "./components/Products";
import data from "./data.json";


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
// para crear el order
  createOrder = (order) => {
    alert("Need to save order for " + order.name);
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
      if(item._id=== product._id){
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
localStorage.setItem("cartItems", JSON.stringify(cartItems));
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
               <div className= "sidebar"> <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart}  createOrder={this.createOrder}/> </div>
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


