import { createStore, combineReducers } from "redux";
import { inputReducer, envReducer, safetyReducer } from "../reducer";

const rootReducer = combineReducers({
  inputReducer,
  envReducer,
  safetyReducer,
});

const store = createStore(rootReducer);

export default store;
