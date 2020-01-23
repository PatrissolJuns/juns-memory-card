import React from 'react';
import PropTypes from 'prop-types';
import JMCSection from "../../UIElements/JMCSection";
import JMCTitle from "../../UIElements/JMCTitle";
import IMG from './../../../assets/images/jons_img1.png';
import {FAILED, SUCCEED} from "../../../Settings/config";

const EndOfStage = ({
                      scored,
                      clicked,
                      timer,
                      leftTime,
                      decision,
                      nextStageLink,
                      ...props}) => {
  return (
      <div className={"jmc-end-of-stage"}>
        <JMCSection>
          <div className="col-md-12">
            <JMCTitle title={"Result"} />
          </div>
          <div className="col-md-6">
            <div className="test_box">
              <div className="jons">
                <h4>You {decision === SUCCEED ? "Win" : "Lost"}</h4>
              </div>
              <p>Score: &nbsp; {scored}</p>
              <p>Clicked time: &nbsp; {clicked}</p>
              <p>Timer: &nbsp; {timer}</p>
              <p>Your time: &nbsp; {timer - leftTime}</p>
              <a className="read_more" href={nextStageLink}>
                {decision === SUCCEED ? "Next stage" : "Retry"}
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

EndOfStage.propTypes = {
  scored: PropTypes.number.isRequired,
  clicked: PropTypes.number.isRequired,
  timer: PropTypes.number.isRequired,
  leftTime: PropTypes.number.isRequired,
  decision: PropTypes.oneOf([FAILED, SUCCEED]).isRequired,
  nextStageLink: PropTypes.string,
};

export default EndOfStage;
