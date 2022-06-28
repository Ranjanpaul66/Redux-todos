const { createStore, applyMiddleware } = require("redux");
const { default: logger } = require("redux-logger");

const GET_PRODUCTS = "GET_PRODUCTS";
const ADD_PRODUCTS = "ADD_PRODUCTS";

//PRODUCT STATES
const initialProductsState = {
  products: ["suger", "salt"],
  numberProducts: 2,
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

// stat

const store = createStore(productReducer, applyMiddleware(logger));

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(getProducts());
store.dispatch(addProducts("pen"));
