export let UPDATE_SUMMONER_INPUT = "UPDATE_SUMM_INPUT";
export let UPDATE_SERVER_INPUT = "UPDATE_SERVER_INPUT";
export let UPDATE_ACCOUNT_INFO = "UPDATE_ACCOUNT_INFO";
export let UPDATE_RANKS = "UPDATE_RANKS";
export let UPDATE_MASTERIES = "UPDATE_MASTERIES";

export let updateSummonerInput = (summoner) => ({ type: UPDATE_SUMMONER_INPUT, summoner });
export let updateServerInput = (server) => ({ type: UPDATE_SERVER_INPUT, server });
export let updateAccountInfo = (account) => ({ type: UPDATE_ACCOUNT_INFO, account });
export let updateRanks = (ranks) => ({ type: UPDATE_RANKS, ranks });
export let updateMasteries = (masteries) => ({ type: UPDATE_MASTERIES, masteries });
