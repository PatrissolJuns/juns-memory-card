import React from 'react';
import PropTypes from 'prop-types';

const SideBar = props => {
  return (
      <div className={"jmc-sidebar"}>
        <ul className="list-unstyled components">
          <li><p>{props.levelName}</p></li>
          <li><p>Progress: &nbsp; {props.progress}</p></li>
          <li><p>Clicked: &nbsp; {props.clicked}</p></li>
          {/*<li><p>Difficulty: &nbsp; {props.difficulty}</p></li>*/}
        </ul>
      </div>
  );
};

SideBar.propTypes = {
  progress: PropTypes.number.isRequired,
  clicked: PropTypes.number.isRequired,
  levelName: PropTypes.string.isRequired
};

export default SideBar;
