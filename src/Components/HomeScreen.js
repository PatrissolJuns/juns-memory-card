import React from 'react';
import JMCSection from "./UIElements/JMCSection";
import JMCLink from "./UIElements/JMCLink";
import { Link } from "react-router-dom";

const HomeScreen = (props) => {
  return (
      <JMCSection marginTop={"mt-5"} {...props}>
        <div className="col-md-12 mt-3">
          <ul className="jmc-home-list">
            <li><Link to="/stage-list"><JMCLink link={"#"} textLink={"Play"} /></Link></li>
            <li><Link to="/instructions"><JMCLink link={"#"} textLink={"Instructions"} /></Link></li>
            <li><Link to="/statistics"><JMCLink link={"#"} textLink={"Statistics"} /></Link></li>
            <li><Link to="/settings"><JMCLink link={"#"} textLink={"Settings"} /></Link></li>
          </ul>
        </div>
      </JMCSection>
  );
};

export default HomeScreen;
