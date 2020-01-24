import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {RUNNING, Theme, UNREACHED} from "./../../Settings/config";
import LevelList from "./LevelList";
import LevelPlay from "./LevelPlay/LevelPlay";
import { withRouter } from "react-router";
import {getBackgroundLevelImage, getLevel, getMatrix, getRandomNumber} from "../utilities";
import {levels} from "../../Settings/data";

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
      levelPlayData: this.getLevelPlayData(levelList[levelId - 1]),
      generalScore: 0,
      generalClicked: 0
    }
  }

  componentDidMount() {
    console.log('data = ',this.state.levelListData[1]);
    console.log('current = ',this.state.levelPlayData);
    /*let {data, levelImages} = this.state.theme;
    // console.log('data = ',data);
    levelImages = this.getLevelListData(data, levelImages);
    // console.log('levelImages = ',levelImages);
    let levelPlayData = this.getLevelPlayData(levelImages[0]);*/
    // console.log('levelPlayData = ',levelPlayData);
  }

  getLevelListData = (data, levelImages, levels) => levels.map(level => ({
    id: level.level,
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
    timer: this.getTimer(getLevel(data.id))
  });

  getTimer = level => {
    return level.items * 3 + level.imagesNumber * 2;
  }

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
                levelImageUrl={this.state.levelPlayData.levelImageUrl}
                name={this.state.levelPlayData.name}
                data={this.state.levelPlayData.data}
                timer={this.state.levelPlayData.timer}
            />
        }
        </>
    );
  }
}

MainComponent.propTypes = {
  shouldDisplayLevelList: PropTypes.bool,
  levelToDisplay: PropTypes.number,
};

export default withRouter(MainComponent);
