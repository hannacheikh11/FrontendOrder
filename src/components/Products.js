import React, { Component } from "react";
import formatCurrency from '../util';
export default class Products extends Component{


    render (){
        return(
        <div>
            <lu className="products">

                {this.props.products.map(product =>(
                    <li key = {product._id}>
                         <div className="product">

                             <a href={"#" + product._id}>
                                 <img scr={product.image} alt={product.title}></img>
                             <p>
                                 {product.title}
                             </p>
                             </a>
<div className="product-price">
    <div>
        {product.price}€
    </div>
    <button className="button primary">
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

