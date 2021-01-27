

import axios from 'axios';

import React from 'react'
import Fade from "react-reveal/Fade";


class NewOrder extends React.Component {
    constructor(props) {
        super(props);
        this.changeOrder = this.changeOrder.bind(this);
        this.clickAdd = this.clickAdd.bind(this);
        this.state = {cod: '', name: '', showCheckout: false};
    }

    changeOrder(event) {
       
        const name = event.target.name;

        
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    clickAdd= event =>{
      event.preventDefault();
  
        
       
        const or = {
          cod:this.state.cod,
          name: this.state.name,
          DNI: this.state.DNI,
          address: this.state.address,
          email: this.state.email,
          total: this.state.total,
          
      };
          //this.setState({order:order});
          //this.props.createOrder(order);
          alert("Your order " + or.name);
        axios.post('/api/v1/orders', { ...or })
        .then(res => {
          console.log(res);
          console.log(res.data);
         
    
        })
      
      .catch(error => {
        console.log(error)
      })
      };
    
     
    

    

    render() {
      
        return(
          <div>
          <button
          onClick={() => {
            this.setState({ showCheckout: true });
          }}
          className="button primary"
        >
          Confirmation
        </button>
        <div class="container">
  <div class="center">
        {this.state.showCheckout && (
        <Fade right cascade>
            <tr>
                <td><label>code:</label><input className="form-control"  name="cod" value={this.state.cod} onChange={this.changeOrder}/></td>
                <td><label>name:</label><input className="form-control" name="name" value={this.state.name} onChange={this.changeOrder}/></td>
                <td><label>Dni:</label><input className="form-control" name="DNI" value={this.state.DNI} onChange={this.changeOrder}/></td>
                <td><label>Adress:</label><input className="form-control" name="address" value={this.state.address} onChange={this.changeOrder}/></td>
                <td><label>email:</label><input className="form-control" name="email" value={this.state.email} onChange={this.changeOrder}/></td>
                <td><label>total:</label><input className="form-control" name="total" value={this.state.total} onChange={this.changeOrder}/></td>
                <td><button className="btn btn-primary" onClick={this.clickAdd}>Add Order</button> </td>
            </tr>  
            </Fade>)}
      </div> 
      </div>
        </div>
        );
        
    }
}

export default NewOrder