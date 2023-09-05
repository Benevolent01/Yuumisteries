import React from "react";
import yuumi2 from "../assets/yuumi2.png";
import "../styles/Table.css";
import { connect } from "react-redux";
import { RANKED_FLEX, RANKED_SOLO, championPointsDecimalFormat, revisionDateCountryFormat } from "../utils";

const Table = (props) => {
  // Account Info
  let { name, profileIconId, summonerLevel, revisionDate } = props.account;
  let profileIcon = profileIconId ? `http://ddragon.leagueoflegends.com/cdn/13.17.1/img/profileicon/${profileIconId}.png` : yuumi2;

  // Ranks
  let ranks = props.ranks;
  let soloDuoImg = `none`;
  let soloDuoTier = "UNRANKED",
    soloDuoRank = "",
    soloDuoPoints = "0";
  let flexImg = `none`;
  let flexTier = "UNRANKED",
    flexRank = "",
    flexPoints = "0";
  if (ranks.length) {
    let ranksSolo = ranks.find((ranksInfo) => ranksInfo.queueType === RANKED_SOLO);
    let ranksFlex = ranks.find((ranksInfo) => ranksInfo.queueType === RANKED_FLEX);
    if (ranksSolo)
      (soloDuoImg = ranksSolo.tier.toLowerCase()), (soloDuoTier = ranksSolo.tier), (soloDuoRank = ranksSolo.rank), (soloDuoPoints = ranksSolo.leaguePoints);
    if (ranksFlex) (flexImg = ranksFlex.tier.toLowerCase()), (flexTier = ranksFlex.tier), (flexRank = ranksFlex.rank), (flexPoints = ranksFlex.leaguePoints);
  }

  // Masteries
  let masteries = props.masteries;
  let totalMasteryPoints = 0,
    totalMasteryLvls = 0,
    chestFree = 0;
  if (masteries.length) {
    masteries.forEach(({ championLevel, championPoints, chestGranted }) => {
      totalMasteryLvls += championLevel;
      totalMasteryPoints += championPoints;
      chestFree += !chestGranted;
    });
  }

  return (
    <>
      <section>
        <div className="table_info_1" id="tableDiv">
          <div className="info_2">
            <img src={`../assets/ranked-emblem/emblem-${soloDuoImg}.png`} alt="Rank Image"></img>
            <h2>Ranked Solo/Duo</h2>
            <h2>
              {soloDuoTier} {soloDuoRank}
            </h2>
            <h2>{soloDuoPoints} (LP)</h2>
          </div>
          <div className="info_1">
            <div className="summoner_icon">
              <img src={profileIcon} alt="Profile Icon" />
            </div>
            <div className="text">
              <h2>{name}</h2>
              <h3>{summonerLevel && `Level ${summonerLevel}`} </h3>
              <h3>{revisionDate && `Last seen on ${new Date(revisionDate).toLocaleDateString(revisionDateCountryFormat)}`}</h3>
            </div>
          </div>
          <div className="info_2">
            <img src={`../assets/ranked-emblem/emblem-${flexImg}.png`} alt={flexTier + " Image"}></img>
            <h2>Ranked Flex</h2>
            <h2>
              {flexTier} {flexRank}
            </h2>
            <h2>{flexPoints} (LP)</h2>
          </div>
        </div>
        {props.masteries.length ? (
          <div className="table_div">
            <table id="myTable">
              <thead>
                <tr>
                  <th>Champion Name</th>
                  <th>Champion Mastery</th>
                  <th>Mastery Level</th>
                  <th>Chest Available</th>
                  <th>Last Played</th>
                </tr>
              </thead>
              <tbody>
                {props.masteries.length
                  ? props.masteries.map(({ championId, championPoints, championLevel, chestGranted, lastPlayTime }) => (
                      <tr key={championId}>
                        <td>{championId}</td>
                        <td>{championPoints.toLocaleString(championPointsDecimalFormat)}</td>
                        <td>{championLevel}</td>
                        <td>{chestGranted ? "No" : "Yes"}</td>
                        <td>Last played on {new Date(lastPlayTime).toLocaleDateString(championPointsDecimalFormat)}</td>
                      </tr>
                    ))
                  : ""}
              </tbody>
              <tfoot>
                <tr>
                  <th>Totally: {masteries.length}</th>
                  <th>{totalMasteryPoints}</th>
                  <th>{totalMasteryLvls}</th>
                  <th>{`${chestFree} / ${masteries.length} available`}</th>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <div className="defaultTableDiv">
            <h1>Make a search to begin fetching data!</h1>
          </div>
        )}
      </section>
    </>
  );
};

let mapStateToProps = (state) => ({
  account: state.allInfo.account,
  ranks: state.allInfo.ranks,
  masteries: state.allInfo.masteries,
});

export default connect(mapStateToProps)(Table);
