import { CartActionTypes } from "./cart.types";
import { addItemToCart } from "./cart.utils";

const INITIAL_STATE = {
  hidden: true,
  cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden
      };
    case CartActionTypes.ADD_ITEM:
      // let item = action.payload;
      // let cartTemp = [...state.cartItems];
      // let itemTemp = cartTemp.find(cart => cart.id === item.id);

      // if (!itemTemp) {
      //   //not exist
      //   let count = 1;
      //   let totalPrice = item.price;

      //   let cartItem = { ...item, count, totalPrice };
      //   cartTemp = [...cartTemp, cartItem];
      // } else {
      //   //exist already
      //   itemTemp.count++;
      //   itemTemp.totalPrice = itemTemp.count * itemTemp.price;
      //   itemTemp.totalPrice = parseFloat(itemTemp.totalPrice.toFixed(2));
      // }

      return {
        ...state,
        //cartItems: cartTemp
        cartItems: addItemToCart(state.cartItems, action.payload)
      };
    default:
      return state;
  }
};

export default cartReducer;
