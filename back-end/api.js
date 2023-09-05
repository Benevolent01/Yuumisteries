const router = require("express")();
const axios = require("axios").default
const { log } = require("./utils");

let key = process.env.RIOT_KEY;

let myHeaders = {}; myHeaders["X-Riot-Token"] = key;

router.post("/allInfo", async (req, res) => { 
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

    let accountData = {account: data, masteriesRes, rankRes };
    
    // stringify & send res
    res.end(JSON.stringify(accountData))

    log("Done!")
 
    } catch (e) {
        // decide what to send back
        if (e.response?.data?.status.status_code === 404)
            return res.status(404).end()
    }
})

module.exports = router;