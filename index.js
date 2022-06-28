const { createStore, combineReducers } = require("redux");

const GET_PRODUCTS = "GET_PRODUCTS";
const ADD_PRODUCTS = "ADD_PRODUCTS";

const GET_CART_ITEMS = "GET_CART_ITEMS";
const ADD_CART_ITEMS = "ADD_CART_ITEMS";

//PRODUCT STATES
const initialProductsState = {
  products: ["suger", "salt"],
  numberProducts: 2,
};

//CATRS STATES
const initialCartState = {
  cart: ["suger", "nick"],
  numberProducts: 2,
};

// cart actions
const getCart = () => {
  return {
    type: GET_CART_ITEMS,
  };
};

const addCart = (product) => {
  return {
    type: ADD_CART_ITEMS,
    payload: product,
  };
};

//products ACTIONS
const getProducts = () => {
  return {
    type: GET_PRODUCTS,
  };
};

const addProducts = (product) => {
  return {
    type: ADD_PRODUCTS,
    payload: product,
  };
};

//CART Reducer

const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case GET_CART_ITEMS:
      return {
        ...state,
      };
    case ADD_CART_ITEMS:
      return {
        cart: [...state.cart, action.payload],
        numberProducts: state.numberProducts + 1,
      };
    default:
      return state;
  }
};

//Product Reducer

const productReducer = (state = initialProductsState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
      };
    case ADD_PRODUCTS:
      return {
        product: [...state.products, action.payload],
        numberProducts: state.numberProducts + 1,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  productR: productReducer,
  cartR: cartReducer,
});

// state

// const store = createStore(productReducer);
const store = createStore(rootReducer);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(getProducts());
store.dispatch(addProducts("pen"));
// store.dispatch(addProducts("NEW"));

// store.dispatch(getCart());
// store.dispatch(addCart("NEW"));
// store.dispatch(addCart("NEW"));
