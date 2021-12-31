import React from "react";
import Rating from "./Rating";
import {Link} from "react-router-dom"

function Product({ product }) {
  return (
    <div>
      <div className="card" key={product._id}>
        <Link to={`/product/${product._id}`}>
          <img src={product.image} className="medium" alt="" />
        </Link>
        <div className="card-body">
          <Link to={`/product/${product._id}`}>
            <h2>{product.name}</h2>
          </Link>
          <Rating rating={product.rating} numReviews={product.numReviews} />
          <div className="price">${product.price}</div>
        </div>
      </div>
    </div>
  );
}

export default Product;
