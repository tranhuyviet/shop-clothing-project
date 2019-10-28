import React from "react";
import "./cart-dropdown.styles.scss";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.action";

import { createStructuredSelector } from "reselect";

const CartDropdown = ({ cartItems, history, dispatch }) => {
  console.log(cartItems);
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map(item => <CartItem key={item.id} item={item} />)
        ) : (
          <span className="empty-message">Your cart is empty!</span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          history.push("/checkout");
          dispatch(toggleCartHidden());
        }}
      >
        go to checkout
      </CustomButton>
    </div>
  );
};

// const mapStateToProps = ({ cart: { cartItems } }) => {
//   return {
//     cartItems
//   };
// };

//way 1
// const mapStateToProps = state => ({
//   cartItems: selectCartItems(state)
// });

//way 2:
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));
