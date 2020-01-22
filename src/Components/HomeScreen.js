import React from 'react';
import JMCSection from "./UIElements/JMCSection";
import JMCLink from "./UIElements/JMCLink";

const HomeScreen = (props) => {
  return (
      <JMCSection marginTop={"mt-5"} {...props}>
        <div className="col-md-12 mt-3">
          <ul className="jmc-home-list">
            <li><JMCLink link={"#"} textLink={"Play"} /></li>
            <li><JMCLink link={"#"} textLink={"Instructions"} /></li>
            <li><JMCLink link={"#"} textLink={"Statistics"} /></li>
            <li><JMCLink link={"#"} textLink={"Settings"} /></li>
          </ul>
        </div>
      </JMCSection>
  );
};

export default HomeScreen;
