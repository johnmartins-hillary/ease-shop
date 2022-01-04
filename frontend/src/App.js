import React, { useEffect } from "react";
// import { Counter } from './features/counter/Counter';
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartScreen from "./Screens/CartScreen";
import { useDispatch, useSelector } from "react-redux";
import SignInScreen from "./Screens/SignInScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ShippingAddressScreen from "./Screens/ShippingAddressScreen";
import PaymentMethodScreen from "./Screens/PaymentMethodScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import OrderDetailsScreen from "./Screens/OrderDetailsScreen";
import { listOrderMine } from "./actions/orderActions";
import OrderedHistoryScreen from "./Screens/OrderedHistoryScreen";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine);
  }, [dispatch]);
  return (
    <div className="grid-container">
      <Header cartItems={cartItems} userSignin={userSignin} />
      <Routes>
        <Route path="/cart/:id" element={<CartScreen />}></Route>
        <Route path="/product/:id" element={<ProductScreen />}></Route>
        <Route path="/signin" element={<SignInScreen />}></Route>
        <Route path="/register" element={<RegisterScreen />}></Route>
        <Route
          path="/shipping"
          element={<ShippingAddressScreen />}
          exct
        ></Route>
        <Route path="/payment" element={<PaymentMethodScreen />}></Route>
        <Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
        <Route path="/order/:id" element={<OrderDetailsScreen />}></Route>
        <Route path="/orderhistory" element={<OrderedHistoryScreen />}></Route>
        <Route
          path="/profile"
          element={<PrivateRoute />}
        ></Route>
        <Route path="/" element={<HomeScreen />} exact></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
