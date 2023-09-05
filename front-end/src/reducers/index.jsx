import { combineReducers } from "redux";
import updateInput from "./updateInput";
import updateAllInfo from "./updateTable";

let myMainReducer = combineReducers({
  inputInfo: updateInput,
  allInfo: updateAllInfo,
});

export default myMainReducer;
