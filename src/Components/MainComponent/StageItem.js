import React from 'react';
import PropTypes from 'prop-types';
import JMCCard from "../UIElements/JMCCard";

const StageItem = ({
                     id,
                     difficulty,
                     stageImageUrl,
                     name,
                     clicked,
                     scored,
                     status,
                     playAble,
                     // clickedOnStageItem,
                     ...props}) => {

  const t = "col-md-12";
  return (
      <div className={"jmc-stage-item"}>
        {playAble
          ? <JMCCard
                imageUrl={stageImageUrl}
                withButton={true}
                buttonName={"Play"}
                colProperty={t}
                textTop={name}
            />
          : <JMCCard
                imageUrl={stageImageUrl}
                withButton={false}
                colProperty={t}
                textTop={name}
            />
        }
      </div>
  );
};

StageItem.propTypes = {
  id: PropTypes.number.isRequired,
  difficulty: PropTypes.node.isRequired,
  stageImageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  clicked: PropTypes.number.isRequired,
  scored: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  playAble: PropTypes.bool.isRequired,
  // clickedOnStageItem: PropTypes.func.isRequired,
};

export default StageItem;

// onClick={clickedOnStageItem(id)}