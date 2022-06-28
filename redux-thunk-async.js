const { default: axios } = require("axios");
const { createStore, applyMiddleware } = require("redux");
const thunk = require("redux-thunk").default;

const API_URL = "https://jsonplaceholder.typicode.com/todos";
//state

const initialTodosState = {
  todos: [],
  isLoading: false,
  error: null,
};
//CONSTENT
const GET_TODOS_REQUESTS = "GET_TODOS_REQUESTS";
const GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS";
const GET_TODOS_FAILED = "GET_TODOS_FAILED";

//action
const getTodosRequest = () => {
  return {
    type: GET_TODOS_REQUESTS,
  };
};

const getTodosSuccess = (todos) => {
  return {
    type: GET_TODOS_SUCCESS,
    payload: todos,
  };
};

const getTodosFailed = (error) => {
  return {
    type: GET_TODOS_FAILED,
    payload: error,
  };
};

//reducers
const todosReducer = (state = initialTodosState, action) => {
  switch (action.type) {
    case GET_TODOS_REQUESTS:
      return {
        ...state,
        isLoading: true,
      };

    case GET_TODOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        todos: action.payload,
      };

    case GET_TODOS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      break;
  }
};

//async action creator
const fetchData = () => {
  return (dispatch) => {
    dispatch(getTodosRequest);
    axios
      .get(API_URL)
      .then((res) => {
        const todos = res.data;
        const titles = todos.map((todo) => todo.title);
        dispatch(getTodosSuccess(titles));
        // console.log(titles);
      })
      .catch((error) => {
        // console.log(error.message);
        const errorMessage = error.message;
        dispatch(getTodosFailed(errorMessage));
      });
  };
};

//store
const store = createStore(todosReducer, applyMiddleware(thunk));

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchData());
// store.dispatch(getTodosRequest);
