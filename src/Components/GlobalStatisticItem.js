import React from 'react';
import PropTypes from 'prop-types';
import JMCCard from "./UIElements/JMCCard";
import LeaderBoard from "./UIElements/LeaderBoard";

const GlobalStatisticItem = props => {

  // const userStats = props.userStats.find(l => l.levelNumber === level.levelNumber).levelNumber

  return (
      <div className={"jmc-level-item fullheight jmc-global-stats"}>
        <JMCCard
            imageUrl={" "}
            withButton={false}
            colProperty={" "}
            leaderBoardData={props.data}
            levelScore={props.levelScore}
            time={props.time}
            textTop={`Level ${props.levelNumber}`}
        >
          {/*<LeaderBoard data={props.data}/>*/}
        </JMCCard>
      </div>
  );
};

GlobalStatisticItem.propTypes = {
  levelNumber: PropTypes.number.isRequired,
  levelScore: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    pseudo: PropTypes.string.isRequired,
    levelScore: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired,
  })).isRequired,
};

export default GlobalStatisticItem;
