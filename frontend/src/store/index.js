import { createStore, combineReducers } from "redux";
import { inputReducer, todoReducer, otherReducer } from "../reducer";

const rootReducer = combineReducers({
  inputReducer,
  todoReducer,
  otherReducer,
});

const store = createStore(rootReducer);

export default store;
