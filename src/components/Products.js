import React, { Component } from "react";
import App from "../App";

export class Products extends Component{


    render (){
        return(
        <div>
            <lu className="products">

                {this.props.products.map(product =>(
                    <li key = {product.codigo}>
                         <div className="product">

                             <a href={"#" + product.codigo}>
                                 
                                 <img src={product.image} alt={product.title}></img>
                             <p>
                                 {product.title}
                             </p>
                             </a>
<div className="product-price">
    <div>
        {product.price}€
    </div>
    <button onClick={()=>this.props.addToCart(product)} className="button primary">
        add to Order
    </button>

</div>
</div>            
                    </li>
                ))}
            </lu>
        </div>
        )
    }
}
      
export default Products;