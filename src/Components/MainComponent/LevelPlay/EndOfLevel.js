import React from 'react';
import PropTypes from 'prop-types';
import JMCSection from "../../UIElements/JMCSection";
import JMCTitle from "../../UIElements/JMCTitle";
import IMG from './../../../assets/images/jons_img1.png';
import {FAILED, SUCCEED} from "../../../Settings/config";

const EndOfLevel = ({
                      scored,
                      clicked,
                      timer,
                      leftTime,
                      decision,
                      nextLevelLink,
                      ...props}) => {
  return (
      <div className={"jmc-end-of-level"}>
        <JMCSection>
          <div className="col-md-12 result-title">
            <JMCTitle title={"Result"} />
          </div>
          <div className="col-md-6">
            <div className="test_box">
              <div className="jons">
                {/*<h4>You {decision === SUCCEED ? "Win" : "Lost"}</h4>*/}
              </div>
              <p>Score: &nbsp; <strong>{scored}</strong></p>
              <p>Clicked time: &nbsp; <strong>{clicked}</strong></p>
              <p>Timer: &nbsp; <strong>{timer}</strong></p>
              <p>Your time: &nbsp; <strong>{timer - leftTime}</strong></p>
              <a className="read_more" href={nextLevelLink}>
                {decision === SUCCEED ? "Next level" : "Retry"}
              </a>
            </div>
          </div>
          <div className="col-md-6">
            <div className="test_box">
              <div className="jons">
                <figure><img src={IMG} alt="#"/></figure>
              </div>
            </div>
          </div>
        </JMCSection>
      </div>
  );
};

EndOfLevel.propTypes = {
  scored: PropTypes.number.isRequired,
  clicked: PropTypes.number.isRequired,
  timer: PropTypes.number.isRequired,
  leftTime: PropTypes.number.isRequired,
  decision: PropTypes.oneOf([FAILED, SUCCEED]).isRequired,
  nextLevelLink: PropTypes.string,
};

export default EndOfLevel;
