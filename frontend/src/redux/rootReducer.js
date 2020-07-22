import { combineReducers } from "redux";
import employeeDataReducer from "./Employee/employeeDataReducer";

const rootReducer = combineReducers({
  employeeData: employeeDataReducer,
});

export default rootReducer;
