import { createStore, combineReducers } from "redux";
import {
  inputReducer,
  envReducer,
  ecoReducer,
  safetyReducer,
} from "../reducer";

const rootReducer = combineReducers({
  inputReducer,
  envReducer,
  ecoReducer,
  safetyReducer,
});

const store = createStore(rootReducer);

export default store;
