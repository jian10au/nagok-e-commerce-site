import {
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_ADD_ITEM_FAIL,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT,
} from "../reducers/ActionType";

const items = localStorage.getItem("Items")
  ? JSON.parse(localStorage.getItem("Items"))
  : [];

const INITIAL_STATE = {
  cartItems: {
    loading: false,
    error: null,
    items: items,
  },
  shipping: {},
  payment: {},
};

function cartReducer(state = INITIAL_STATE, action) {
  // this is a technique to get the existing redux state;
  switch (action.type) {
    case CART_ADD_ITEM_REQUEST:
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          loading: true,
        },
      };
    case CART_ADD_ITEM_SUCCESS:
      const addedProduct = action.payload;

      // check if the cart has product which is the same as the newly added one.
      console.log(addedProduct);
      const foundProduct = state.cartItems.items.find((productInCart) => {
        if (productInCart.productId === addedProduct.productId) {
          return productInCart;
        }
      });

      // if the cart has the product, map throught the cart item and replace the one which is the same.
      if (foundProduct) {
        return {
          ...state,
          cartItems: {
            items: state.cartItems.items.map((productInCart) =>
              productInCart.productId === addedProduct.productId
                ? addedProduct
                : productInCart
            ),
            error: null,
            loading: false,
          },
        };
      }

      // if the cart does not has product, just simply add the product to the cart
      return {
        ...state,
        cartItems: {
          items: [...state.cartItems.items, addedProduct],
          error: null,
          loading: false,
        },
      };

    case CART_ADD_ITEM_FAIL:
      return {
        ...state,
        cartItems: {
          items: [...state.cartItems.items],
          error: action.payload,
          loading: false,
        },
      };

    case CART_REMOVE_ITEM:
      const productId = action.payload;
      const updatedCartItems = state.cartItems.items.filter(
        (item) => item.productId !== productId
      );
      return {
        ...state,
        cartItems: { items: updatedCartItems, error: null, loading: false },
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
