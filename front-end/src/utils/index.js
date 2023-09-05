export let championsMap = new Map([]);

async function updateChamps() {
  let version = (await (await fetch(`https://ddragon.leagueoflegends.com/api/versions.json`)).json()).shift();
  let leagueChampsApi = `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`;
  await fetch(leagueChampsApi)
    .then((data) => data.json())
    .then((obj) => {
      for (let champ in obj.data) {
        let champName = obj.data[champ].name;

        championsMap.set(parseInt(obj.data[champ].key), champName);
      }
    });
}
updateChamps();

export let RANKED_SOLO = "RANKED_SOLO_5x5";
export let RANKED_FLEX = "RANKED_FLEX_SR";
export let revisionDateCountryFormat = "en-GB";
export let championPointsDecimalFormat = "it-IT";

export let modifyID = (id) => {
  if (championsMap.has(id)) return championsMap.get(id);
  return "Champion is not found! Will be fixed soon!";
};
