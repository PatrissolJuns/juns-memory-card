import React from 'react';
import JMCSection from "./UIElements/JMCSection";
import JMCTitle from "./UIElements/JMCTitle";
import {Link} from "react-router-dom";
import JMCLink from "./UIElements/JMCLink";

const Instructions = (props) => {
  return (
      <div className={"instructions"}>
        <JMCSection classStyle={"jmc-end-of-level"} marginTop={"mt-5"} {...props}>
          <div className="col-md-12 result-title">
            <JMCTitle title={"Instructions"} />
          </div>
          <div className="col-md-10">
            {/*<div className="row justify-content-center">
              <div className="col-3">*/}
                <div className="test_box">
                  <p>The objective is to collect the most pairs of cards at the lowest time.</p>
                  <p>Bellow are some rules :</p>
                  <div className="instructions-item">
                    <p>Mix up the cards.</p>
                    <p>Lay them in rows, face down.</p>
                    <p>Turn over any two cards.</p>
                    <p>If the two cards match, keep them.</p>
                    <p>If they don't match, turn them back over.</p>
                    <p>Remember what was on each card and where it was.</p>
                    <p>Watch and remember during the other player's turn.</p>
                    <p>The game is over when all the cards have been matched.</p>
                    <span> </span>
                  </div>

                </div>
              {/*</div>
            </div>*/}
          </div>
          <div className="col-12">
            <div className="row justify-content-center">
              <a href="/" className={"read_more"}>Got it! </a>
            </div>
          </div>
        </JMCSection>
      </div>
  );
};

export default Instructions;
