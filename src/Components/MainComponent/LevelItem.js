import React from 'react';
import PropTypes from 'prop-types';
import JMCCard from "../UIElements/JMCCard";

const LevelItem = ({
                     id,
                     levelImageUrl,
                     name,
                     clicked,
                     scored,
                     status,
                     playAble,
                     // clickedOnLevelItem,
                     ...props}) => {

  const t = "col-md-12";
  return (
      <div className={"jmc-level-item"}>
        {playAble
          ? <JMCCard
                imageUrl={levelImageUrl}
                withButton={true}
                buttonName={"Play"}
                colProperty={t}
                textTop={name}
            />
          : <JMCCard
                imageUrl={levelImageUrl}
                withButton={false}
                colProperty={t}
                textTop={name}
            />
        }
      </div>
  );
};

LevelItem.propTypes = {
  id: PropTypes.number.isRequired,
  levelImageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  clicked: PropTypes.number.isRequired,
  scored: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  playAble: PropTypes.bool.isRequired,
  // clickedOnLevelItem: PropTypes.func.isRequired,
};

export default LevelItem;

// onClick={clickedOnLevelItem(id)}