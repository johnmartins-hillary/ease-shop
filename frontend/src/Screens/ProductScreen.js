import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import { detailsProduct } from "../actions/productsActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProductScreen() {
  const dispatch = useDispatch();
  const params = useParams();
  const productId = params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);
  const addToCartHandler = () => {
    navigate(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="productscreen">
          <div className="row top">
            <NavLink to="/">Return to results</NavLink>
            <div className="col-2">
              <img
                src={product.data.image}
                alt={product.data.name}
                className="large"
              />
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.data.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={product.data.rating}
                    numReviews={product.data.numReviews}
                  />
                </li>
                <li>Price: ${product.data.price}</li>
                <li>
                  Description:
                  <p>{product.data.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">${product.data.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {product.data.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="error">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {product.data.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>QTY</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.data.countInStock).keys()].map((x) => (
                                <option value={x + 1} key={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          className="primary block"
                          onClick={() => addToCartHandler()}
                        >
                          Add to Cart
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
