import React from 'react';
import axios from 'axios';

export default class Edite extends React.Component {
  state = {
    email :'',
    cod:'',
   
   
  }

  handleChange = event => {
    this.setState({ email: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    const ord = {
      email: this.state.email
    };

    
    axios.put('/api/v1/orders/' + 'cod',{ord})
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }


  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <label>
            cod order:
            <input type="text" name="cod" onChange={this.state.cod} />
          </label>
       
          <label>
            Edite your email:
            <input type="text" name="email" onChange={this.handleChange} />
          </label>
          
          <button type="submit">Edite</button>
        </form>
      </div>
    )
  }
}