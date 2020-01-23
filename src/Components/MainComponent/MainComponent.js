import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {RUNNING, Theme, UNREACHED} from "./../../Settings/config";
import LevelList from "./LevelList";
import LevelPlay from "./LevelPlay/LevelPlay";
import { withRouter } from "react-router";

class MainComponent extends Component {

  constructor(props) {
    super(props);

    let {data, levelImages} = Theme.onePiece;

    console.log('this.props = ',props);
    let levelId = 0;
    if(!props.shouldDisplayLevelList && props.match.params.hasOwnProperty('levelId')) {
      levelId = Number(props.match.params.levelId);
      /*console.log('ma = ',props.match);
      console.log('ma = ',props.match.params.levelId);*/
    }

    levelImages = this.getLevelListData(data, levelImages);

    this.state = {
      theme: Theme.onePiece,
      levelListData: levelImages,
      levelPlayData: this.getLevelPlayData(levelImages[levelId]),
      generalScore: 0,
      generalClicked: 0
    }
  }

  componentDidMount() {
    let {data, levelImages} = this.state.theme;
    // console.log('data = ',data);
    levelImages = this.getLevelListData(data, levelImages);
    // console.log('levelImages = ',levelImages);
    let levelPlayData = this.getLevelPlayData(levelImages[0]);
    // console.log('levelPlayData = ',levelPlayData);

  }
  // min and max included
  getRandomNumber = (min = 0, max = 10) => Math.floor(Math.random() * (max - min + 1) + min);

  getLevelListData = (data, levelImages) => levelImages.map((item, index) => ({
    id: index,
    difficulty: this.getDifficulty(index),
    levelImageUrl: item,
    name: `Level ${index}`,
    clicked: 0,
    scored: 0,
    status: UNREACHED,
    data: this.parseDataToMatrix(data, this.getDifficulty(index))
  }));

  getLevelPlayData = data => ({
    ...data,
    status: RUNNING,
    timer: this.getTimer(data.difficulty)
  });

  getTimer = difficulty => {
    return difficulty * 60;
  }

  getDifficulty = (index) => {
    return index + 1;
  }

  parseDataToMatrix = (data, difficulty) => {
    if(data.length % 2 !== 0) {
      throw new Error("data must be a multiple of 2");
    }
    let newData = [...data];
    data.forEach((d, index) => {
      let pos = this.getRandomNumber(0, data.length - 1);
      while(pos === index ) pos = this.getRandomNumber(0, data.length - 1);
      newData.splice(pos, 0, d);
    });

    return newData;
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
                difficulty={this.state.levelPlayData.difficulty}
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
