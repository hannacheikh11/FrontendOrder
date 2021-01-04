
import React from "react";
import Products from "./components/Products";
import data from "./data.json";


class App extends React.Component {
  constructor(){
    super()
    this.state={
    products: data.products
    }
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
               <Products products={this.state.products}></Products> </div>
               <div className= "sidebar"> Order </div>
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


