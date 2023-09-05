import { UPDATE_ERROR_HANDLE } from "../actions";

let f = (state = 0, action) => {
  switch (action.type) {
    case UPDATE_ERROR_HANDLE:
      return action.errorType;
    default:
      return state;
  }
}

export default f;