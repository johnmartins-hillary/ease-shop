import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartAction";
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentMethodScreen() {
  const [paymentMethod, setPaymentMethod] = useState("Paypal");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    navigate("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <form className="form">
        <h1>Payment Method</h1>
        <div>
          <div>
            <input
              type="radio"
              name="paymentMethod"
              id="paypal"
              value="paypal"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="paypal">PayPal</label>
          </div>
          <div>
            <input
              type="radio"
              name="paymentMethod"
              id="stripe"
              value="stripe"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="paypal">Stripe</label>
          </div>
        </div>
        <div>
          <button type="submit" className="primary" onClick={submitHandler}>
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default PaymentMethodScreen;
