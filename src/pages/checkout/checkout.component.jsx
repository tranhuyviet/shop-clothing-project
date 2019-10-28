import React from "react";
import "./checkout.styles.scss";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import { connect } from "react-redux";
import { removeItem } from "../../redux/cart/cart.action";
import {
  selectCartItems,
  selectCartTotal
} from "../../redux/cart/cart.selectors";

import { createStructuredSelector } from "reselect";

const CheckoutPage = ({ cartItems, totalPrice }) => (
  <div className="checkout-page">
    <div className="checkout-header">
      <div className="header-block">
        <span>Product</span>
      </div>
      <div className="header-block">
        <span>Description</span>
      </div>
      <div className="header-block">
        <span>Quantity</span>
      </div>
      <div className="header-block">
        <span>Price</span>
      </div>
      <div className="header-block">
        <span>Remove</span>
      </div>
    </div>

    {cartItems.map(item => {
      return <CheckoutItem cartItem={item} key={item.id} />;
    })}

    <div className="total">
      <span>Total: ${totalPrice}</span>
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  totalPrice: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);
