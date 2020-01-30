import React from 'react';
import JMCSection from "./UIElements/JMCSection";
import JMCLink from "./UIElements/JMCLink";
import { Link } from "react-router-dom";

const HomeScreen = (props) => {
  return (
      <JMCSection classStyle={' '} marginTop={"mt-5"} {...props}>
        <div className="col-md-12 mt-3">
          <ul className="jmc-home-list">
            <li><JMCLink link={"level-list"} textLink={"Play"} /></li>
            <li><JMCLink link={"instructions"} textLink={"Instructions"} /></li>
            <li><JMCLink link={"statistics"} textLink={"Statistics"} /></li>
            <li><JMCLink link={"settings"} textLink={"Settings"} /></li>
            <li><JMCLink link={"credits"} textLink={"Credits"} /></li>
          </ul>
        </div>
      </JMCSection>
  );
};

export default HomeScreen;
