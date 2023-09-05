import React, { useEffect, useState } from 'react'
import yuumi from "./../../assets/yuumi.jpg"
import yuumi2 from "./../../assets/yuumi2.png"
import './../../styles/Table.css'
import { RANKED_FLEX, RANKED_SOLO, championPointsDecimalFormat, mp, revisionDateCountryFormat } from './utils'
import { log } from '../../config'
import { useDispatch, useSelector } from 'react-redux'

const Table = () => {

  // -------------------------------------------------------- //

  let { name, profileIconId, summonerLevel, revisionDate } = useSelector(state => state.data.account);
  let masteries = useSelector(state => state.data.masteriesRes);
  let leagues = useSelector(state => state.data.rankRes);
  let iconUrl = `https://opgg-static.akamaized.net/images/profile_icons/profileIcon${profileIconId}.jpg`
  let imgIdx = -1, imgIdx2 = -1;
  let soloDuoTier = "UNRANKED", soloDuoRank = "", soloDuoPoints = 0;
  let flexTier = "UNRANKED", flexRank = "", flexPoints = 0;

  if (leagues.length) {
    let obj1 = leagues.find(x => x.queueType === RANKED_SOLO);
    let obj2 = leagues.find(x => x.queueType === RANKED_FLEX);
    if (obj1)
      soloDuoTier = obj1.tier, soloDuoRank = obj1.rank, soloDuoPoints = obj1.leaguePoints;
    if (obj2)
      flexTier = obj2.tier, flexRank = obj2.rank, flexPoints = obj2.leaguePoints;
    if (mp.has(soloDuoTier))
      imgIdx = mp.get(soloDuoTier);
    if (mp.has(flexTier))
      imgIdx2 = mp.get(flexTier);
  }

  // -------------------------------------------------------- //

  return (
    <>
      <section>
        <div className="table_info_1" id="tableDiv">
          <div className="info_2">
            <img src={`./../../../assets/${imgIdx}.png`} alt="Rank Image"></img>
            <h2>Ranked Solo/Duo</h2>
            <h2>{soloDuoTier} {soloDuoRank}</h2>
            <h2>{soloDuoPoints} (LP)</h2>
          </div>
          <div className="info_1">
            <div className="summoner_icon">
              <img src={profileIconId ? iconUrl : yuumi2} alt="Profile Icon" />
            </div>
            <div className="text">
              <h2>{name}</h2>
              <h3>{summonerLevel && `Level ${summonerLevel}`} </h3>
              <h3>{revisionDate && `Last seen on ${(new Date(revisionDate)).toLocaleDateString(revisionDateCountryFormat)}`}</h3>
            </div>
          </div>
          <div className="info_2">
            <img src={`./../../../assets/${imgIdx2}.png`} alt="Rank Image"></img>
            <h2>Ranked Flex</h2>
            <h2>{flexTier} {flexRank}</h2>
            <h2>{flexPoints} (LP)</h2>
          </div>
        </div>
        {masteries.data.length ? (<div className="table_div">
          <table>
            <thead>
              <tr>
                <th>Champion Name</th>
                <th>Champion Mastery</th>
                <th>Mastery Level</th>
                <th>Chest Available?</th>
              </tr>
            </thead>
            <tbody>
              {masteries.data.length ? masteries?.data.map(x => (
                <tr key={x.championId}>
                  <td>{x.championId}</td>
                  <td>{(x.championPoints).toLocaleString(championPointsDecimalFormat)}</td>
                  <td>{x.championLevel}</td>
                  <td>{x.chestGranted}</td>
                </tr>
              )) : ''}
            </tbody>
            <tfoot>
              <tr>
                <th>Totally: {masteries.data.length}</th>
                <th>{masteries.totalPoints}</th>
                <th>{masteries.totalMasteries}</th>
                <th>{`${masteries.chestsAvailable} available`}</th>
              </tr>
            </tfoot>
          </table>
        </div>) :
          <div className="defaultTableDiv">
            <h1>
              Make a search to begin fetching data!
            </h1>
          </div>
        }
      </section>
    </>
  )
}

export default Table
