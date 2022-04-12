import { createStore, combineReducers } from "redux";
import { inputReducer, envReducer, otherReducer } from "../reducer";

const rootReducer = combineReducers({
  inputReducer,
  envReducer,
  otherReducer,
});

const store = createStore(rootReducer);

export default store;
