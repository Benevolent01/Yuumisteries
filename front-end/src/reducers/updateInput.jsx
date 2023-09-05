import { UPDATE_SUMMONER_INPUT, UPDATE_SERVER_INPUT } from "../actions";
import { VALID_SERVERS } from "../config";

let initialState = {
  summoner: "",
  server: VALID_SERVERS[0],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SUMMONER_INPUT:
      return { ...state, summoner: action.summoner };
    case UPDATE_SERVER_INPUT:
      return { ...state, server: action.server };
    default:
      return state;
  }
};
