import React from 'react';
import PropTypes from 'prop-types';
import LeaderBoard from "./LeaderBoard";

const JMCCard = ({
                   imageUrl,
                   buttonName,
                   alt,
                   withButton = false,
                   colProperty = 'col-md-4',
                   marginBottom = 'mb-5',
                   addClass,
                   textTop,
                   cardAddStyle,
                   levelScore,
                   time,
                   paddingGameBox = '',
                   boxSizeClass = '',
                   leaderBoardData,
                   ...props}) => {

  let style = {
    backgroundImage: `url("${imageUrl})"`
  };

  const leaderBoardComponent = () => {
    return (
        <>
          {/*<LeaderBoard data={leaderBoardData}/>*/}
          <div className="high-score">
            <div className="test_box text-box pos-relative">
              <h4 className={"mb-2 mt-2 text-center ml-5"}> <i className="fa fa-trophy mr-2"> </i> High Scores</h4>
              <LeaderBoard data={leaderBoardData}/>
            </div>
            {/*<div className="test_box text-box">
              <h4 className={"mb-2 mt-2"}> Your Score</h4>
              <span className="small-bar"> </span>
              <p>Clicked time: {levelScore}</p>
              <p>Your time: {time}</p>
            </div>
            <div className="test_box text-box">
              <h4 className={"mb-2 mt-2"}> <i className="fa fa-trophy mr-2"> </i> High Scores</h4>
              <LeaderBoard data={leaderBoardData}/>
            </div>*/}
            {/*<dic className="container">
            <div className="row">
              <div className="test_box text-box pos-relative mt-1 ml-2">
                <h4 className={"mb-2 mt-2"}> Your Score</h4>
                <span className="small-bar"> </span>
                <p>Clicked time: {levelScore}</p>
                <p>Your time: {time}</p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="test_box text-box pos-relative">
                <h4 className={"mb-2 mt-2"}> <i className="fa fa-trophy mr-2"> </i> High Scores</h4>
                <LeaderBoard data={leaderBoardData}/>
              </div>
            </div>
          </dic>*/}
          </div>
        </>
    )
  };

  return (
      <div
          {...props}
          className={`${colProperty} jmc-card ${marginBottom} ${addClass} ${levelScore !== undefined ? 'w-h-300' : ''}`}
          style={cardAddStyle}
      >
        <div className={`game_box ${paddingGameBox}`}>
          <p className={"jmc-level-item-name"}>{textTop}</p>
          {
            levelScore !== undefined
              ? leaderBoardComponent() /*<LeaderBoard data={leaderBoardData}/>*/ /*leaderBoardComponent()*/
            : <figure className={boxSizeClass} style={style}> </figure>
          }
        </div>
        {
          withButton
            ? <div className="game">
                <h3>{buttonName}</h3>
              </div>
            : null
        }
      </div>
  );
};

JMCCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  withButton: PropTypes.bool,
  buttonName: PropTypes.string,
  alt: PropTypes.string,
  colProperty: PropTypes.string,
  marginBottom: PropTypes.string,
  addClass: PropTypes.string,
  textTop: PropTypes.string,
  cardAddStyle: PropTypes.object,
  paddingGameBox: PropTypes.string,
  boxSizeClass: PropTypes.string,
  levelScore: PropTypes.number,
  time: PropTypes.number,
  leaderBoardData: PropTypes.array,
};

export default JMCCard;
