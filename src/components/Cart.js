import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import axios from 'axios';
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
//import API from '../api';
import api from "../api";
import Delete from "./Delete";
import NewOrder from "./newOrder";


  class Cart extends Component{

  constructor(props) {
    super(props);
    this.state = {
      cod:'',
      name: "",
      DNI:"",
      email: "",
      Adress: "",
      order:null,
     
      showCheckout: false,
    };
  }






  handleInput = event => {
    this.setState({ 
        cod: event.target.value,
        name: event.target.value,
        DNI: event.target.value,
        address:event.target.value,
        email: event.target.value,
        
        //count:event.target.value,
        total:event.target.value,
    });
  };
  
  
  createOrder = event => {
    event.preventDefault();
    const valor = {
      cod:this.state.cod,
      name: this.state.name,
      DNI: this.state.DNI,
      email: this.state.email,
      address: this.state.address,
      total: this.state.total,
      cartItems: this.props.cartItems,
      //count: this.props.cartItems,
      //total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0),
  };
      //this.setState({order:order});
      //this.props.createOrder(order);
      alert("Your order " );
    axios.post('/api/v1/orders', { ...valor})
    .then(res => {
      console.log(res);
      console.log(res.data);
     

    })
  
  .catch(error => {
    console.log(error)
  })
  };

 

  render() {
    const { cartItems } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartItems.length} in the cart{" "}
          </div>
        )}





        <div>
          <div className="cart">
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item.codigo}>
                  <div>
                    <img src={item.image} alt={item.title}></img>
                  </div>
                  <div>
                    <div>{item.title}</div>
                    <div className="right">
                      {item.price} x {item.count}{" "}

                      <button
                        className="button"
                        onClick={() => this.props.removeFromCart(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {cartItems.length !== 0 && (
            <div>
              <div className="cart">
                <div className="total">
                  <div>
                    Total:{" "}
                    {
                      cartItems.reduce((a, c) => a + c.price * c.count, 0)
                    }
                  </div>



                  <button
                    onClick={() => {
                      this.setState({ showCheckout: true });
                    }}
                    className="button primary"
                  >
                    Confirmation
                  </button>
                </div>
                



                
              </div>

              
              {this.state.showCheckout && (
                 <Fade right cascade>
                <div className="cart">
                  <form onSubmit={this.createOrder}>
                    <ul className="form-container">
                    <li>
                        <label>cod de 9 num</label>
                        <input
                          name="cod"
                          type="text"
                          required
                          onChange={this.handleInput}
                        ></input>
                        
                      </li>
                      <li>
                        <label>Name</label>
                        <input
                          name="name"
                          type="text"
                          required
                          onChange={this.handleInput}
                        ></input>
                      </li>

                      <li>
                        <label>DNI</label>
                        <input
                          DNI="DNI"
                          type="text"
                          required
                          onChange={this.handleInput}
                        ></input>
                      </li>
                      <li>
                        <label>address</label>
                        <input
                          name="address"
                          type="text"
                          required
                          onChange={this.handleInput}
                        ></input>
                      </li>
                      <li>
                        <label>Email</label>
                        <input
                          name="email"
                          type="email"
                          required
                          onChange={this.handleInput}
                        ></input>
                        
                      </li>

                      <li>
                        <label>Total Shop</label>
                        <input
                          name="total"
                          type="Number"
                          required
                          onChange={this.handleInput}
                        ></input>
                        
                      </li>
                     

                    
                      
                      <li>
                        <button className="button primary" type="submit">
                          Done
                        </button>
                      </li>
                    </ul>
                  </form>
                </div></Fade>
              )}

              </div>
                


          )}
        </div>
<NewOrder/>
<label>If you wante delete your order please clik her:</label>
         <Delete/>     
                
      </div>
    );
  }
}
export default Cart;