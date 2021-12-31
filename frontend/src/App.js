import React from "react";
// import { Counter } from './features/counter/Counter';
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartScreen from "./Screens/CartScreen";
import { useSelector } from "react-redux";
import SignInScreen from "./Screens/SignInScreen";
import RegisterScreen from "./Screens/RegisterScreen";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector(state => state.userSignin)
  return (
    <div className="grid-container">
      <Header cartItems={cartItems} userSignin={userSignin}/>
      <Routes>
        <Route path="/signin" element={<SignInScreen />} exact></Route>
        <Route path="/register" element={<RegisterScreen />} exact></Route>
        <Route path="/cart/:id" element={<CartScreen />} exact></Route>
        <Route path="/product/:id" element={<ProductScreen />} exact></Route>
        <Route path="/" element={<HomeScreen />} exact></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
