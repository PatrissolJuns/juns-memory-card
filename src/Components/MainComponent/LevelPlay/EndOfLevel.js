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
                      isUserGenerated,
                      updateUserSessionValue,
                      ...props}) => {

  const [launchLevelScore, setLaunchLevelScore] = useState(false);
  const [displayResultButton, setDisplayResultButton] = useState(false);
  const [toggleLostImage, setToggleLostImage] = useState(false);
  const [toggleWonImage, setToggleWonImage] = useState(false);
  const [toggleCollectUserInformation, setToggleCollectUserInformation] = useState(false);

  const toggleOpacity = toggler => toggler ? 'opacity-1' : 'opacity-0';

  // Preload images for further usage
  preloadImages([WON_IMG, NEXT_IMG, RETRY_IMG, LOST_IMG]);

  return (
      <div className={"jmc-end-of-level"}>
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
                    <CountUp separator=" " duration={2} end={clickedTime} />
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
                        start={0} separator=" " duration={3} delay={timeBonus > 0 ? 6 : 3} end={levelScore} />
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
              <div className="col-md-6">
                <div className="test_box">
                  <div className="jons">
                    <figure><img src={IMG} alt="#"/></figure>
                  </div>
                </div>
              </div>
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
                                className="read_more"
                                href={toggleCollectUserInformation ? '' : nextLevelLink}
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
                  isUserGenerated={isUserGenerated}
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
