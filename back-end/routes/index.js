const router = require("express").Router();
const axios = require("axios").default;
const { log } = require("./common");

let key = process.env.RIOT_KEY;

let myHeaders = {};
myHeaders["X-Riot-Token"] = key;

router.post("/getData", async (req, res) => {
  try {
    let { summoner, server } = req.body;

    // handle parameters
    summoner = encodeURI(summoner);
    server = server.toLowerCase();

    // Account Data: PUUID, name, level,
    let { data } = await axios.get(`https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}`, {
      headers: myHeaders,
    });
    // Account Masteries
    let masteriesRes = await axios.get(`https://${server}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${data.id}`, {
      headers: myHeaders,
    });
    masteriesRes = masteriesRes.data;
    // Account Leagues
    let rankRes = await axios.get(`https://${server}.api.riotgames.com/lol/league/v4/entries/by-summoner/${data.id}`, {
      headers: myHeaders,
    });
    rankRes = rankRes.data;

    // account, masteries, ranks
    let accountData = { account: data, masteries: masteriesRes, ranks: rankRes };

    // stringify & send res
    res.end(JSON.stringify(accountData));
    log("Done!");
  } catch (e) {
    // decide what to send back
    log(e);
    res.status(500).end();
  }
});

module.exports = router;
