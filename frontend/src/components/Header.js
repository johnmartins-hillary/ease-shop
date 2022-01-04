import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { signout } from "../actions/userActions";
import { AiFillCaretDown } from "react-icons/ai";

export default function Header({ cartItems, userSignin }) {
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  };


  return (
    <header className="row">
      <div>
        <Link to="/" className="brand">
          amazon
        </Link>
      </div>
      <div>
        <Link to="/cart/:id">
          <span className="cart">
            <BsCart4 />
          </span>
          {cartItems.length > 0 && (
            <span className="badge">{cartItems.length}</span>
          )}
        </Link>
        {userInfo ? (
          <div className="dropdown">
            <Link to="#">
              {userInfo.name}
              <AiFillCaretDown />
              {""}
            </Link>
            <ul className="dropdown-content">
              <li>
                <Link to="/profile">User Profile</Link>
              </li>
              <li>
                <Link to="/orderhistory">Order History</Link>
              </li>
              <Link to="/" onClick={signoutHandler}>
                Sign Out
              </Link>
            </ul>
          </div>
        ) : (
          <Link to="/signin">Sign In</Link>
        )}
      </div>
    </header>
  );
}
