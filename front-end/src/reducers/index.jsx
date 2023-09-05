import { combineReducers } from "redux";
import updateInput from "./updateInput";
import invalidInput from "./updateErrorHandle";
import updateAllInfo from "./updateTable";

let myMainReducer = combineReducers({
  inputInfo: updateInput,
  errorType: invalidInput,
  data: updateAllInfo,
});

export default myMainReducer;