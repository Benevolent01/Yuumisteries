import { UPDATE_ACCOUNT_INFO, UPDATE_MASTERIES, UPDATE_RANKS } from "../actions";

let initialState = {
  account: {
    name: "",
    summonerLevel: "",
    profileIconId: null,
    revisionDate: "",
  },
  masteries: [],
  ranks: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ACCOUNT_INFO:
      return { ...state, account: action.account };
    case UPDATE_RANKS:
      return { ...state, ranks: action.ranks };
    case UPDATE_MASTERIES:
      return { ...state, masteries: action.masteries };
    default:
      return state;
  }
};
