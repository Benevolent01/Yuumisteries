import React from 'react'
import '../../styles/Navbar.css'
import yuumiImg from "./../../assets/yuumi.jpg";
import { BACKEND_API_URL, VALID_SERVERS } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { updateSummonerInput, updateServerInput, updateErrorHandle, updateAllInfo, } from '../../actions';
import { finalDataFix } from './utils';

let Navbar = () => {

  let dispatch = useDispatch();
  let summoner = useSelector(state => state.inputInfo.summoner);
  let server = useSelector(state => state.inputInfo.server);

  let handleInput = async () => {
    console.log("You clicked me!")

    // Allowed input any sequence of length [3, 16] 
    let allowed = new RegExp(/^.{3,16}$/g).test(summoner)
    if (!allowed) {
      dispatch(updateErrorHandle(-1));
      alert(`Invalid input, not allowed, try again.`)
      return;
    }

    fetchData()
    dispatch(updateErrorHandle(1));
  }

  async function fetchData() {
    let r = await fetch(BACKEND_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ summoner, server }),
    })
    if (r.status !== 200) {
      dispatch(updateErrorHandle(0));
      alert(`Summoner ${summoner} was not found.. Try again!`)
      return;
    }
    let obj = await r.json();
    finalDataFix(obj);
    dispatch(updateAllInfo(obj))
  }

  let handleEnter = (e) => {
    if (e.key === "Enter") {
      handleInput();
      console.log("You pressed enter!")
    }
  }

  return (
    <section>
      <nav className="nav_1">
        <img src={yuumiImg} alt="Yuumi Here" />
        <div className="input_div">
          <div className="input_1">
            <span>Search</span>
            <input type="text" id="input" onChange={(e) => dispatch(updateSummonerInput(e.target.value))} onKeyDown={(e) => handleEnter(e)} key={12} />
            <select id="select" onChange={(e) => dispatch(updateServerInput(e.target.value))} key={13}>
              {VALID_SERVERS.map(x => {
                return <option className="fixOpt" value={x} key={x}>{x}</option>
              })}
            </select>
            <button onClick={handleInput}>GO!</button>
          </div>
        </div>
        <span>YUUMI INC.</span>
      </nav>
    </section>
  )
}

export default Navbar