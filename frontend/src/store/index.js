import { createStore, combineReducers } from "redux";
import todoReducer from "../reducer/todolist";
import otherReducer from "../reducer/other";

const rootReducer = combineReducers({
  todoReducer,
  otherReducer,
});

const store = createStore(rootReducer);

export default store;
