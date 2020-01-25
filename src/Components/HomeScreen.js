import React from 'react';
import JMCSection from "./UIElements/JMCSection";
import JMCLink from "./UIElements/JMCLink";
import { Link } from "react-router-dom";

const HomeScreen = (props) => {
  return (
      <JMCSection classStyle={' '} marginTop={"mt-5"} {...props}>
        <div className="col-md-12 mt-3">
          <ul className="jmc-home-list">
            <li><Link to="/level-list"><JMCLink link={"level-list"} textLink={"Play"} /></Link></li>
            <li><Link to="/instructions"><JMCLink link={"instructions"} textLink={"Instructions"} /></Link></li>
            <li><Link to="/statistics"><JMCLink link={"statistics"} textLink={"Statistics"} /></Link></li>
            <li><Link to="/settings"><JMCLink link={"settings"} textLink={"Settings"} /></Link></li>
          </ul>
        </div>
      </JMCSection>
  );
};

export default HomeScreen;
