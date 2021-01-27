import React from 'react';
import axios from 'axios';
import Fade from "react-reveal/Fade";

export default class Delete extends React.Component {
  state = {
    cod: '',
    showCheckout: false,
  }

  handleChange = event => {
     
    this.setState({ cod: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    axios.delete('/api/v1/orders/' + this.state.cod)
      .then(res => {
        console.log(res);
        console.log(res.data.cod);
      })
  }

  render() {
    return (
      
      <div>
        <button
                    onClick={() => {
                      this.setState({ showCheckout: true });
                    }}
                    className="button primary"
                  >
                    Delete
                  </button>
        {this.state.showCheckout && (
        <Fade right cascade>
        <form onSubmit={this.handleSubmit}>
          <label>
            Order ID:
            <input type="text" name="cod" onChange={this.handleChange} />
          </label>
          <button type="submit">Delete</button>
        </form>
        </Fade>)}
      </div>
      
    )
  }
}