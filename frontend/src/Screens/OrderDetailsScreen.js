import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { detailsOrder, payOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET } from "../constants/orderConstant";

function OrderDetailsScreen() {
  const dispatch = useDispatch();
  const params = useParams();
  const [sdkReady, setSdkReady] = useState(false);

  const orderId = params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  console.log(order?.data?.isPaid);
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get(
        "http://localhost:9000/api/config/paypal"
      );

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay || order?.data?._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order?.data?.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
      // setSdkReady("");
    }
  }, [dispatch, order, orderId, sdkReady]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order?.data, paymentResult));
    window.location.reload()
  };

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <h1>Order {order?.data?._id}</h1>
          <div className="row top">
            <div className="col-2">
              <ul>
                <li>
                  <div className="card card-body">
                    <h2>Shipping</h2>
                    <p>
                      <strong>Name: </strong>
                      {order?.data?.shippingAddress?.fullName} <br />
                      <strong> Address: </strong>
                      {order?.data?.shippingAddress?.address}
                      {order?.data?.shippingAddress?.city},{" "}
                      {order?.data?.shippingAddress?.postalCode},
                      {order?.data?.shippingAddress?.country}
                    </p>
                    {order?.data?.isDelivered ? (
                      <MessageBox variant="success">
                        Delivered at {order?.data?.deliveredAt}
                      </MessageBox>
                    ) : (
                      <MessageBox variant="danger">Not Delivered</MessageBox>
                    )}
                  </div>
                </li>
                <li>
                  <div className="card card-body">
                    <h2>Payment</h2>
                    <p>
                      <strong>Method:</strong>
                      {order?.data?.paymentMethod}
                    </p>
                    {order?.data?.isPaid ? (
                      <MessageBox variant="success">
                        Paid at {order?.data?.paidAt}
                      </MessageBox>
                    ) : (
                      <MessageBox variant="danger">Not Paid</MessageBox>
                    )}
                  </div>
                </li>
                <li>
                  <div className="card card-body">
                    <h2>Order Items</h2>
                    <ul>
                      {order?.data?.orderItems?.map((item) => (
                        <li key={item?.product}>
                          <div className="row">
                            <div>
                              <img
                                src={item?.image}
                                alt={item?.name}
                                className="small"
                              />
                            </div>

                            <div className="min-30">
                              <Link to={`/product/${item?.product}`}>
                                {item?.name}
                              </Link>
                            </div>

                            <div>
                              {item?.qty} * ${item?.price} = $
                              {item?.qty * item?.price}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <h2>Order Summary</h2>
                  </li>
                  <li>
                    <div className="row">
                      <div>Items</div>
                      <div>${order?.data?.itemsPrice?.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Shipping</div>
                      <div>${order?.data?.shippingPrice?.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Tax</div>
                      <div>${order?.data?.taxPrice?.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>
                        <strong>Order Total</strong>
                      </div>
                      <div>
                        <strong>${order?.data?.totalPrice?.toFixed(2)}</strong>
                      </div>
                    </div>
                  </li>
                  {order?.data?.isPaid == false && (
                    <li>
                      {sdkReady ? (
                        <>
                          {errorPay && (
                            <MessageBox variant="danger">{errorPay}</MessageBox>
                          )}
                          {loadingPay && <LoadingBox></LoadingBox>}
                          <PayPalButton
                            amount={order?.data?.totalPrice}
                            onSuccess={() => successPaymentHandler()}
                          ></PayPalButton>
                        </>
                      ) : (
                        <>{sdkReady === false && <LoadingBox></LoadingBox>}</>
                      )}
                    </li>
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

export default OrderDetailsScreen;
