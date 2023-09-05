import { UPDATE_ALL_INFO } from "../actions";

let initialState = {
  account: {
    name: "",
    summonerLevel: "",
    profileIconId: 29,
    revisionDate: "",
  },
  masteriesRes: {
    data: [],
    totalMasteries: null,
    totalPoints: null,
    chestsAvailable: null,
  },
  rankRes: [],
};

let f = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ALL_INFO:
      return action.data;
    default:
      return state;
  }
}

export default f;