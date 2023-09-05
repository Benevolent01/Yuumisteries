import React from "react";
import "../styles/Navbar.css";
import yuumiImg from "./../assets/yuumi.jpg";
import { BACKEND_API_URL, VALID_SERVERS } from "../config";
import { connect } from "react-redux";
import { updateSummonerInput, updateServerInput, updateAccountInfo, updateRanks, updateMasteries } from "../actions";
import { modifyID } from "../utils";

let Navbar = (props) => {
  let summoner = props.summoner;
  let server = props.server;

  let handleInput = async () => {
    console.log("You clicked me!");

    // Allowed input any sequence of length [3, 16]
    let allowed = new RegExp(/^.{3,16}$/g).test(summoner);
    if (!allowed) {
      alert(`Invalid input, not allowed, try again.`);
      return;
    }

    fetchData();
  };

  async function fetchData() {
    let r = await fetch(BACKEND_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ summoner, server }),
    });
    if (r.status !== 200) {
      alert(`Summoner ${summoner} was not found.. Try again!`);
      return;
    }
    let { account, ranks, masteries } = await r.json();
    props.dispatch(updateAccountInfo(account));
    props.dispatch(updateRanks(ranks));
    masteries = masteries.map((mastery) => ({ ...mastery, championId: modifyID(mastery.championId) }));
    props.dispatch(updateMasteries(masteries));
  }

  let handleEnter = (e) => {
    if (e.key === "Enter") {
      handleInput();
    }
  };

  return (
    <section>
      <nav className="nav_1">
        <img src={yuumiImg} alt="Yuumi Here" />
        <div className="input_div">
          <div className="input_1">
            <span>Search</span>
            <input type="text" id="input" onChange={(e) => props.dispatch(updateSummonerInput(e.target.value))} onKeyDown={(e) => handleEnter(e)} key={12} />
            <select id="select" onChange={(e) => props.dispatch(updateServerInput(e.target.value))} key={13}>
              {VALID_SERVERS.map((x) => {
                return (
                  <option className="fixOpt" value={x} key={x}>
                    {x}
                  </option>
                );
              })}
            </select>
            <button onClick={handleInput}>GO!</button>
          </div>
        </div>
        <span>YUUMI INC.</span>
      </nav>
    </section>
  );
};

let mapStateToProps = (state) => ({
  summoner: state.inputInfo.summoner,
  server: state.inputInfo.server,
});

export default connect(mapStateToProps)(Navbar);
