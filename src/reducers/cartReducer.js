import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT,
} from "../reducers/ActionType";

function cartReducer(
  state = { cartItems: [], shipping: {}, payment: {} },
  action
) {
  // this is a technique to get the existing redux state;
  switch (action.type) {
    case CART_ADD_ITEM:
      console.log(action.payload, " what is action payload");
      const item = action.payload;
      // check if the existing shopping cart has the same item;
      const product = state.cartItems.find(
        (existingItem) => existingItem.productId === item.productId
      );

      if (product) {
        console.log({
          cartItems: state.cartItems.map((existingItem) =>
            existingItem.productId === product.productId ? item : existingItem
          ),
        });
        return {
          state,
          cartItems: state.cartItems.map((existingItem) =>
            existingItem.productId === product.productId ? item : existingItem
          ),
        };
      }
      // if it does replace the whole existing product with the newly added item
      // and update the whole shopping cart array;

      return {
        ...state,
        cartItems: [...state.cartItems, item],
      };

    case CART_REMOVE_ITEM:
      const productId = action.payload;
      const updatedCartItems = state.cartItems.filter(
        (item) => item.productId !== productId
      );
      return {
        ...state,
        cartItems: updatedCartItems,
        // notice, this action completes mutates the orginal whole piece of state;
        // if you have other piece of state, you had to manually concatenate back
      };

    case CART_SAVE_SHIPPING:
      return { ...state, shipping: action.payload };
    case CART_SAVE_PAYMENT:
      return { ...state, payment: action.payload };
    default:
      return state;
  }
}

export { cartReducer };
