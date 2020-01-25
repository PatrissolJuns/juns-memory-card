import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Theme} from "../../Others/config";
import LevelList from "./LevelList";
import LevelPlay from "./LevelPlay/LevelPlay";
import { withRouter } from "react-router";
import {getBackgroundLevelImage, getLevel, getMatrix, getTimer} from "../utilities";
import {levels} from "../../Others/data";
import {RUNNING, UNREACHED} from "../../Others/constants";

class MainComponent extends Component {

  constructor(props) {
    super(props);

    let {data, levelImages} = Theme.onePiece;
    let levelList = [];

    let levelId = 0;
    if(!props.shouldDisplayLevelList && props.match.params.hasOwnProperty('levelId')) {
      levelId = Number(props.match.params.levelId);
    }

    if(levelId < 0 || levelId > 20) {
      throw new Error("Level does not exist");
    }

    levelList = this.getLevelListData(data, levelImages, levels);

    this.state = {
      theme: Theme.onePiece,
      levelListData: levelList,
      levelPlayData: this.getLevelPlayData(levelList[levelId === 0 ? 0 : levelId - 1]),
      generalScore: 0,
      generalClicked: 0
    }
  }

  componentDidMount() {
    // console.log('data = ',this.state.levelListData);
    // console.log('current = ',this.state.levelPlayData);
    /*let {data, levelImages} = this.state.theme;
    // console.log('data = ',data);
    levelImages = this.getLevelListData(data, levelImages);
    // console.log('levelImages = ',levelImages);
    let levelPlayData = this.getLevelPlayData(levelImages[0]);*/
    // console.log('levelPlayData = ',levelPlayData);
  }

  getLevelListData = (data, levelImages, levels) => levels.map(level => ({
    id: level.level,
    imagesNumber: level.imagesNumber,
    levelImageUrl: getBackgroundLevelImage(level.level, levelImages),
    name: `Level ${level.level}`,
    clicked: 0,
    scored: 0,
    status: UNREACHED,
    data: getMatrix(data, level)
  }));

  getLevelPlayData = data => ({
    ...data,
    status: RUNNING,
    timer: getTimer(getLevel(data.id))
  });

  render() {
    // const result = this.props.shouldDisplayLevelList ? <p>Level List Component</p> : <p>Level Play</p>;
    return (
        <>
        {this.props.shouldDisplayLevelList
            ? <LevelList
                levelList={this.state.levelListData}
              />
            : <LevelPlay
                id={this.state.levelPlayData.id}
                imagesNumber={this.state.levelPlayData.imagesNumber}
                levelImageUrl={this.state.levelPlayData.levelImageUrl}
                name={this.state.levelPlayData.name}
                data={this.state.levelPlayData.data}
                timer={this.state.levelPlayData.timer}
                userName={this.props.userName}
                userPseudo={this.props.userPseudo}
                isUserGenerated={this.props.isUserGenerated}
                updateUserSessionValue={this.props.updateUserSessionValue}
            />
        }
        </>
    );
  }
}

MainComponent.propTypes = {
  shouldDisplayLevelList: PropTypes.bool.isRequired,
  levelToDisplay: PropTypes.number,
  userName: PropTypes.string.isRequired,
  userPseudo: PropTypes.string.isRequired,
  isUserGenerated: PropTypes.bool.isRequired,
  updateUserSessionValue: PropTypes.func.isRequired,
};

export default withRouter(MainComponent);
