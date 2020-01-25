import React, {useState} from 'react';
import PropTypes from 'prop-types';
import JMCSection from "../../UIElements/JMCSection";
import JMCTitle from "../../UIElements/JMCTitle";
import IMG from './../../../assets/images/jons_img1.png';
import CountUp from "react-countup";
import {FAILED, SUCCEED} from "../../../Others/constants";
import {LOST_IMG, NEXT_IMG, RETRY_IMG, WON_IMG} from "../../../Others/config";
import {preloadImages} from "../../utilities";
import CollectUserInformation from "./CollectUserInformation";
import LeaderBoard from "../../UIElements/LeaderBoard";
import {getHighScoreOfLevel} from "../../../Others/firebase/database-utilities";

const EndOfLevel = ({
                      timer,
                      score,
                      decision,
                      spentTime,
                      timeBonus,
                      levelScore,
                      clickedTime,
                      nextLevelLink,
                      userName,
                      userPseudo,
                      levelNumber,
                      isUserGenerated,
                      updateUserSessionValue,
                      ...props}) => {

  const [launchLevelScore, setLaunchLevelScore] = useState(false);
  const [displayResultButton, setDisplayResultButton] = useState(false);
  const [toggleLostImage, setToggleLostImage] = useState(false);
  const [toggleWonImage, setToggleWonImage] = useState(false);
  const [toggleCollectUserInformation, setToggleCollectUserInformation] = useState(false);

  const [leaderBoard, setLeaderBoard] = useState([]);
  const [displayLeaderBoard, setDisplayLeaderBoard] = useState(false);

  const leaderBoardData = [
    {
      pseudo: 'juns',
      levelScore: 343,
      time: 12,
    },
    {
      pseudo: 'mahamat',
      levelScore: 56,
      time: 10,
    },
  ];

  const getHighScore = () => {
    getHighScoreOfLevel(levelNumber, 'Medium').then(
        (data) => {
          setLeaderBoard(data);
          setDisplayLeaderBoard(true);
        }
    )
  };

  const toggleOpacity = toggler => toggler ? 'opacity-1' : 'opacity-0';

  let refLink = null;

  // Preload images for further usage
  preloadImages([WON_IMG, NEXT_IMG, RETRY_IMG, LOST_IMG]);

  const nextLevelFunc = () => {
    setToggleCollectUserInformation(false);
  };

  const saveData = () => {
    if(!isUserGenerated) {
      updateUserSessionValue(userPseudo, userName, false, {levelNumber: levelNumber, levelScore: levelScore, time: spentTime});
    }
    refLink.click();
  };

  return (
      <div className={"jmc-end-of-level"}>
        <a ref={a => refLink = a} style={{position: "absolute"}} className={"visibility-hidden"} href={nextLevelLink}>Hide</a>
        <JMCSection>
          <div className="col-md-12 result-title">
            <JMCTitle title={"Result"} />
          </div>
          <div className="col-md-10">
            <div className="row justify-content-center">
              <div className="col-3">
                <div className="test_box">
                  <p>Clicked time:</p>
                  <p>Your time:</p>
                  <p>Score:</p>
                  <p>Bonus:</p>
                  <span> </span>
                  <p className={"levelScoreLabel " + toggleOpacity(launchLevelScore)}>Level score:</p>
                </div>
              </div>
              <div className="col-3">
                <div className="test_box">
                  <p><strong>
                    <CountUp
                        onEnd={() => getHighScore()}
                        separator=" "
                        duration={2}
                        end={clickedTime}
                    />
                  </strong></p>
                  {/*<p><strong>
                    <CountUp duration={3} delay={3} end={timer} />
                  </strong></p>*/}
                  <p><strong>
                    <CountUp separator=" " duration={2} delay={1} end={spentTime} />
                  </strong></p>
                  <p><strong>
                    <CountUp
                        onEnd={() => timeBonus > 0 ? '' : setLaunchLevelScore(true)}
                        separator=" "
                        duration={2}
                        delay={2} end={score} />
                  </strong></p>
                  <p><strong>
                    <CountUp
                        onEnd={() => timeBonus > 0 ? setLaunchLevelScore(true) : ''}
                        separator=" " duration={2} delay={3} end={timeBonus} />
                  </strong></p>
                  <span className={"levelScore"}> </span>
                  <p><strong className={"levelScore " + toggleOpacity(launchLevelScore)}>
                    <CountUp
                        onEnd={() => setDisplayResultButton(true)}
                        start={0} separator=" " duration={3} delay={timeBonus > 0 ? 5 : 2} end={levelScore} />
                  </strong></p>
                  {/*<p><strong className={"levelScore"}>
                    <CountUp duration={5} delay={5} end={levelScore} />
                  </strong></p>*/}
                  {/*<p><strong className={"levelScore"}>
                    <CountUp
                        onEnd={() => setLaunchLevelScore(true)}
                        start={0} separator=" " duration={3} delay={2} end={256} />
                  </strong></p>
                  <p><strong className={"levelScore " + (launchLevelScore ? 'visibility-visible' : 'visibility-hidden')}>
                    <CountUp start={0} separator=" " duration={5} delay={5} end={ls} />
                  </strong></p>*/}
                </div>
              </div>
              {
                displayLeaderBoard
                  ? <div className="col-md-6 high-score">
                      <div className="test_box text-box">
                        <h4 className={"mb-2 mt-2"}> <i className="fa fa-trophy mr-2"> </i> High Scores</h4>

                        {/*<div className={"row justify-content-center align-items-center mb-3"}>
                    <p className={"col-2 p-0"}><i style={{color: "#c22315"}} className="fa fa-medal"></i></p>
                    <p className={"col-1 p-0"}>1.</p>
                    <div className={"col-9"}>
                      <div className="row justify-content-center">
                        <p className={"col-12"}>AAA</p>
                        <p className={"col-6 display-score"}><i className="fa fa-coins"></i>875</p>
                        <p className={"col-6 display-time"}><i className="fa fa-clock"></i>35</p>
                      </div>
                    </div>
                  </div>
                  <span className="small-bar"> </span>
                  <div className={"row justify-content-center align-items-center mb-3"}>
                    <p className={"col-2 p-0"}> </p>
                    <p className={"col-1 p-0"}>2.</p>
                    <div className={"col-9"}>
                      <div className="row justify-content-center">
                        <p className={"col-12"}>BBB</p>
                        <p className={"col-6 display-score"}><i className="fa fa-coins"> </i>343</p>
                        <p className={"col-6 display-time"}><i className="fa fa-clock"> </i>35</p>
                      </div>
                    </div>
                  </div>
                  <div className={"row justify-content-center align-items-center mb-3"}>
                    <p className={"col-2 p-0"}> </p>
                    <p className={"col-1 p-0"}>3.</p>
                    <div className={"col-9"}>
                      <div className="row justify-content-center">
                        <p className={"col-12"}>CCC</p>
                        <p className={"col-6 display-score"}><i className="fa fa-coins"> </i>343</p>
                        <p className={"col-6 display-time"}><i className="fa fa-clock"> </i>35</p>
                      </div>
                    </div>
                  </div>*/}

                        <LeaderBoard data={leaderBoard}/>
                      </div>
                    </div>
                  : null
              }

              <div className={"col-12 transition-400 "+ toggleOpacity(displayResultButton)}>
                <div className={"row justify-content-center"}>
                  <div className="col-12 pt-2">
                    <div className="row justify-content-center">
                      <div className="jons">
                        <h4>You {decision === SUCCEED ? "Won" : "Lost"}</h4>
                        <figure className={"decision d-inline-block pl-3"}>
                          <img
                              className={"transition-400"}
                              height={80}
                              width={80}
                              src={
                                decision === SUCCEED
                                  ? toggleWonImage ? NEXT_IMG : WON_IMG
                                  : toggleLostImage ? RETRY_IMG : LOST_IMG
                              }
                              alt="#"
                          />
                        </figure>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="row justify-content-center">
                      {
                        isUserGenerated && decision === SUCCEED
                            ?
                            <a
                                className="read_more"
                                href={"#"}
                                onClick={() => setToggleCollectUserInformation(true)}
                                onMouseOver={() => decision === FAILED ? setToggleLostImage(true) : setToggleWonImage(true)}
                                onMouseOut={() => decision === FAILED ? setToggleLostImage(false) : setToggleWonImage(false)}
                            >
                              {decision === SUCCEED ? "Next level" : "Retry"}
                            </a>
                            :
                            <a
                                onClick={() => saveData()}
                                className="read_more"
                                href={toggleCollectUserInformation ? '#' : '#'}
                                onMouseOver={() => decision === FAILED ? setToggleLostImage(true) : setToggleWonImage(true)}
                                onMouseOut={() => decision === FAILED ? setToggleLostImage(false) : setToggleWonImage(false)}
                            >
                              {decision === SUCCEED ? "Next level" : "Retry"}
                            </a>
                      }
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </JMCSection>

        {
          toggleCollectUserInformation
              ? <CollectUserInformation
                  userName={userName}
                  userPseudo={userPseudo}
                  spentTime={spentTime}
                  levelScore={levelScore}
                  levelNumber={levelNumber}
                  isUserGenerated={isUserGenerated}
                  nextLevelFunc={nextLevelFunc}
                  updateUserSessionValue={updateUserSessionValue}
              />
              : null
        }
      </div>
  );
};

EndOfLevel.propTypes = {
  timer: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  spentTime: PropTypes.number.isRequired,
  timeBonus: PropTypes.number.isRequired,
  levelScore: PropTypes.number.isRequired,
  clickedTime: PropTypes.number.isRequired,
  nextLevelLink: PropTypes.string.isRequired,
  decision: PropTypes.oneOf([FAILED, SUCCEED]).isRequired,
  userName: PropTypes.string.isRequired,
  userPseudo: PropTypes.string.isRequired,
  levelNumber: PropTypes.number.isRequired,
  isUserGenerated: PropTypes.bool.isRequired,
  updateUserSessionValue: PropTypes.func.isRequired,
};

export default EndOfLevel;


/*
<div className="col-md-3">
  <div className="test_box">
    <div className="jons">
      {/!*<h4>You {decision === SUCCEED ? "Win" : "Lost"}</h4>*!/}
    </div>
    <p>Score: &nbsp; <strong>{score}</strong></p>
    <p>Clicked time: &nbsp; <strong>{clicked}</strong></p>
    <p>Timer: &nbsp; <strong>{timer}</strong></p>
    <p>Your time: &nbsp; <strong>{timer - spentTime}</strong></p>
    <a className="read_more" href={nextLevelLink}>
      {decision === SUCCEED ? "Next level" : "Retry"}
    </a>
  </div>
</div>*/




/*
<div className="leaders">
  <div className="leader" style={{"animationDelay": "0s"}}>
    <div className="leader-wrap">
      <div className="leader-ava" style={{"backgroundColor": "rgb(255, 185, 0)"}}>
        <svg fill="#fff" height="24" width="24" viewBox="0 0 32 32">
          <path
              d="M 16 3 C 14.354991 3 13 4.3549901 13 6 C 13 7.125993 13.63434 8.112309 14.5625 8.625 L 11.625 14.5 L 7.03125 11.21875 C 7.6313215 10.668557 8 9.8696776 8 9 C 8 7.3549904 6.6450096 6 5 6 C 3.3549904 6 2 7.3549904 2 9 C 2 10.346851 2.9241199 11.470238 4.15625 11.84375 L 6 22 L 6 26 L 6 27 L 7 27 L 25 27 L 26 27 L 26 26 L 26 22 L 27.84375 11.84375 C 29.07588 11.470238 30 10.346852 30 9 C 30 7.3549901 28.645009 6 27 6 C 25.354991 6 24 7.3549901 24 9 C 24 9.8696781 24.368679 10.668557 24.96875 11.21875 L 20.375 14.5 L 17.4375 8.625 C 18.36566 8.112309 19 7.125993 19 6 C 19 4.3549901 17.645009 3 16 3 z M 16 5 C 16.564129 5 17 5.4358709 17 6 C 17 6.5641291 16.564129 7 16 7 C 15.435871 7 15 6.5641291 15 6 C 15 5.4358709 15.435871 5 16 5 z M 5 8 C 5.5641294 8 6 8.4358706 6 9 C 6 9.5641286 5.5641291 10 5 10 C 4.4358709 10 4 9.5641286 4 9 C 4 8.4358706 4.4358706 8 5 8 z M 27 8 C 27.564129 8 28 8.4358709 28 9 C 28 9.5641283 27.564128 10 27 10 C 26.435872 10 26 9.5641283 26 9 C 26 8.4358709 26.435871 8 27 8 z M 16 10.25 L 19.09375 16.4375 L 20.59375 16.8125 L 25.59375 13.25 L 24.1875 21 L 7.8125 21 L 6.40625 13.25 L 11.40625 16.8125 L 12.90625 16.4375 L 16 10.25 z M 8 23 L 24 23 L 24 25 L 8 25 L 8 23 z"></path>
        </svg>
      </div>
      <div className="leader-content">
        <div className="leader-name">1. Me</div>
        <div className="leader-score">
          <i className="fa fa-coins"> </i>
          <div className="leader-score_title">3 543 430</div>
          <i className="fa fa-clock ml-3"> </i>
          <div className="leader-score_title">23 452</div>
        </div>
      </div>
    </div>
    <div className="leader-bar" style={{"animationDelay": "0.4s"}}>
      <div className="bar" style={{"backgroundColor": "rgb(255, 185, 0)", width: "70%"}}> </div>
    </div>
  </div>

  <div className="leader" style={{"animationDelay": "0.1s"}}>
    <div className="leader-wrap">
      <div className="leader-ava" style={{"backgroundColor": "rgb(105, 121, 126)"}}>
        <svg fill="#fff" height="24" width="24" viewBox="0 0 32 32">
          <path
              d="M 16 3 C 14.354991 3 13 4.3549901 13 6 C 13 7.125993 13.63434 8.112309 14.5625 8.625 L 11.625 14.5 L 7.03125 11.21875 C 7.6313215 10.668557 8 9.8696776 8 9 C 8 7.3549904 6.6450096 6 5 6 C 3.3549904 6 2 7.3549904 2 9 C 2 10.346851 2.9241199 11.470238 4.15625 11.84375 L 6 22 L 6 26 L 6 27 L 7 27 L 25 27 L 26 27 L 26 26 L 26 22 L 27.84375 11.84375 C 29.07588 11.470238 30 10.346852 30 9 C 30 7.3549901 28.645009 6 27 6 C 25.354991 6 24 7.3549901 24 9 C 24 9.8696781 24.368679 10.668557 24.96875 11.21875 L 20.375 14.5 L 17.4375 8.625 C 18.36566 8.112309 19 7.125993 19 6 C 19 4.3549901 17.645009 3 16 3 z M 16 5 C 16.564129 5 17 5.4358709 17 6 C 17 6.5641291 16.564129 7 16 7 C 15.435871 7 15 6.5641291 15 6 C 15 5.4358709 15.435871 5 16 5 z M 5 8 C 5.5641294 8 6 8.4358706 6 9 C 6 9.5641286 5.5641291 10 5 10 C 4.4358709 10 4 9.5641286 4 9 C 4 8.4358706 4.4358706 8 5 8 z M 27 8 C 27.564129 8 28 8.4358709 28 9 C 28 9.5641283 27.564128 10 27 10 C 26.435872 10 26 9.5641283 26 9 C 26 8.4358709 26.435871 8 27 8 z M 16 10.25 L 19.09375 16.4375 L 20.59375 16.8125 L 25.59375 13.25 L 24.1875 21 L 7.8125 21 L 6.40625 13.25 L 11.40625 16.8125 L 12.90625 16.4375 L 16 10.25 z M 8 23 L 24 23 L 24 25 L 8 25 L 8 23 z"></path>
        </svg>
      </div>
      <div className="leader-content">
        <div className="leader-name">2. You</div>
        <div className="leader-score">
          {/!*<svg fill="currentColor" height="20" viewBox="0 0 493 493" version="1.1">
                              <path
                                  d="M247,468 C369.05493,468 468,369.05493 468,247 C468,124.94507 369.05493,26 247,26 C124.94507,26 26,124.94507 26,247 C26,369.05493 124.94507,468 247,468 Z M236.497159,231.653661 L333.872526,231.653661 L333.872526,358.913192 C318.090922,364.0618 303.232933,367.671368 289.298112,369.742004 C275.363292,371.81264 261.120888,372.847943 246.570473,372.847943 C209.522878,372.847943 181.233938,361.963276 161.702804,340.193617 C142.17167,318.423958 132.40625,287.169016 132.40625,246.427855 C132.40625,206.805956 143.738615,175.914769 166.403684,153.753368 C189.068753,131.591967 220.491582,120.511432 260.673112,120.511432 C285.856523,120.511432 310.144158,125.548039 333.536749,135.621403 L316.244227,177.257767 C298.336024,168.303665 279.700579,163.826682 260.337335,163.826682 C237.840155,163.826682 219.820296,171.381591 206.277218,186.491638 C192.734139,201.601684 185.962702,221.915997 185.962702,247.435186 C185.962702,274.073638 191.419025,294.415932 202.331837,308.462679 C213.244648,322.509425 229.109958,329.532693 249.928244,329.532693 C260.785092,329.532693 271.809664,328.413447 283.002291,326.174922 L283.002291,274.96891 L236.497159,274.96891 L236.497159,231.653661 Z"></path>
                            </svg>*!/}
          <i className="fa fa-coins"> </i>
          <div className="leader-score_title">220</div>
        </div>
      </div>
    </div>
    <div className="leader-bar" style={{"animationDelay": "0.6s"}}>
      <div className="bar" style={{"backgroundColor": "rgb(105, 121, 126)", width: "55%"}}> </div>
    </div>
  </div>

  <div className="leader" style={{"animationDelay": "0.2s"}}>
    <div className="leader-wrap">
      <div className="leader-ava" style={{"backgroundColor": "rgb(132, 117, 69)"}}>
        <svg fill="#fff" height="24" width="24" viewBox="0 0 32 32">
          <path
              d="M 16 3 C 14.354991 3 13 4.3549901 13 6 C 13 7.125993 13.63434 8.112309 14.5625 8.625 L 11.625 14.5 L 7.03125 11.21875 C 7.6313215 10.668557 8 9.8696776 8 9 C 8 7.3549904 6.6450096 6 5 6 C 3.3549904 6 2 7.3549904 2 9 C 2 10.346851 2.9241199 11.470238 4.15625 11.84375 L 6 22 L 6 26 L 6 27 L 7 27 L 25 27 L 26 27 L 26 26 L 26 22 L 27.84375 11.84375 C 29.07588 11.470238 30 10.346852 30 9 C 30 7.3549901 28.645009 6 27 6 C 25.354991 6 24 7.3549901 24 9 C 24 9.8696781 24.368679 10.668557 24.96875 11.21875 L 20.375 14.5 L 17.4375 8.625 C 18.36566 8.112309 19 7.125993 19 6 C 19 4.3549901 17.645009 3 16 3 z M 16 5 C 16.564129 5 17 5.4358709 17 6 C 17 6.5641291 16.564129 7 16 7 C 15.435871 7 15 6.5641291 15 6 C 15 5.4358709 15.435871 5 16 5 z M 5 8 C 5.5641294 8 6 8.4358706 6 9 C 6 9.5641286 5.5641291 10 5 10 C 4.4358709 10 4 9.5641286 4 9 C 4 8.4358706 4.4358706 8 5 8 z M 27 8 C 27.564129 8 28 8.4358709 28 9 C 28 9.5641283 27.564128 10 27 10 C 26.435872 10 26 9.5641283 26 9 C 26 8.4358709 26.435871 8 27 8 z M 16 10.25 L 19.09375 16.4375 L 20.59375 16.8125 L 25.59375 13.25 L 24.1875 21 L 7.8125 21 L 6.40625 13.25 L 11.40625 16.8125 L 12.90625 16.4375 L 16 10.25 z M 8 23 L 24 23 L 24 25 L 8 25 L 8 23 z"></path>
        </svg>
      </div>
      <div className="leader-content">
        <div className="leader-name">3. Someone</div>
        <div className="leader-score">
          {/!*<svg fill="currentColor" height="20" viewBox="0 0 493 493" version="1.1">
                              <path
                                  d="M247,468 C369.05493,468 468,369.05493 468,247 C468,124.94507 369.05493,26 247,26 C124.94507,26 26,124.94507 26,247 C26,369.05493 124.94507,468 247,468 Z M236.497159,231.653661 L333.872526,231.653661 L333.872526,358.913192 C318.090922,364.0618 303.232933,367.671368 289.298112,369.742004 C275.363292,371.81264 261.120888,372.847943 246.570473,372.847943 C209.522878,372.847943 181.233938,361.963276 161.702804,340.193617 C142.17167,318.423958 132.40625,287.169016 132.40625,246.427855 C132.40625,206.805956 143.738615,175.914769 166.403684,153.753368 C189.068753,131.591967 220.491582,120.511432 260.673112,120.511432 C285.856523,120.511432 310.144158,125.548039 333.536749,135.621403 L316.244227,177.257767 C298.336024,168.303665 279.700579,163.826682 260.337335,163.826682 C237.840155,163.826682 219.820296,171.381591 206.277218,186.491638 C192.734139,201.601684 185.962702,221.915997 185.962702,247.435186 C185.962702,274.073638 191.419025,294.415932 202.331837,308.462679 C213.244648,322.509425 229.109958,329.532693 249.928244,329.532693 C260.785092,329.532693 271.809664,328.413447 283.002291,326.174922 L283.002291,274.96891 L236.497159,274.96891 L236.497159,231.653661 Z"></path>
                            </svg>*!/}
          <i className="fa fa-coins"> </i>
          <div className="leader-score_title">220</div>
        </div>
      </div>
    </div>
    <div className="leader-bar" style={{"animationDelay": "0.8s"}}>
      <div className="bar" style={{"backgroundColor": "rgb(132, 117, 69)", width: "44%"}}> </div>
    </div>
  </div>

</div>*/
