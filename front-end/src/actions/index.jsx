// ---------------------------------------------- //
export let UPDATE_SUMMONER_INPUT = "UPDATE_SUMM_INPUT";
export let UPDATE_SERVER_INPUT = "UPDATE_SERVER_INPUT";
export let UPDATE_ERROR_HANDLE = "UPDATE_ERROR_HANDLING";

export let updateSummonerInput = (val) => ({ type: UPDATE_SUMMONER_INPUT, summoner: val });
export let updateServerInput = (val) => ({ type: UPDATE_SERVER_INPUT, server: val });
export let updateErrorHandle = (val) => ({ type: UPDATE_ERROR_HANDLE, errorType: val });

// ---------------------------------------------- //

export let UPDATE_ALL_INFO = "UPDATE_ALL_INFO";

export let updateAllInfo = (val) => ({ type: UPDATE_ALL_INFO, data: val });

// ---------------------------------------------- //