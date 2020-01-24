import React from 'react';
import PropTypes from 'prop-types';

const SideBar = props => {
  return (
      <div className={"jmc-sidebar"}>
        <ul className="list-unstyled components">
          <li><p>{props.levelName}</p></li>
          <li><p>Progress: &nbsp; {props.progress}</p></li>
          <li><p>Clicked Time: &nbsp; {props.clickedTime}</p></li>
          {/*<li><p>Difficulty: &nbsp; {props.difficulty}</p></li>*/}
        </ul>
      </div>
  );
};

SideBar.propTypes = {
  progress: PropTypes.string.isRequired,
  levelName: PropTypes.string.isRequired,
  clickedTime: PropTypes.number.isRequired
};

export default SideBar;
