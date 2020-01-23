import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {RUNNING, Theme, UNREACHED} from "./../../Settings/config";
import StageList from "./StageList";
import StagePlay from "./StagePlay/StagePlay";
import { withRouter } from "react-router";

class MainComponent extends Component {

  constructor(props) {
    super(props);

    let {data, stageImages} = Theme.onePiece;

    console.log('this.props = ',props);
    let stageId = 0;
    if(!props.shouldDisplayStageList) {
      stageId = Number(props.match.params.stageId);
      /*console.log('ma = ',props.match);
      console.log('ma = ',props.match.params.stageId);*/
    }

    stageImages = this.getStageListData(data, stageImages);

    this.state = {
      theme: Theme.onePiece,
      stageListData: stageImages,
      stagePlayData: this.getStagePlayData(stageImages[stageId]),
      generalScore: 0,
      generalClicked: 0
    }
  }

  componentDidMount() {
    let {data, stageImages} = this.state.theme;
    // console.log('data = ',data);
    stageImages = this.getStageListData(data, stageImages);
    // console.log('stageImages = ',stageImages);
    let stagePlayData = this.getStagePlayData(stageImages[0]);
    // console.log('stagePlayData = ',stagePlayData);

  }
  // min and max included
  getRandomNumber = (min = 0, max = 10) => Math.floor(Math.random() * (max - min + 1) + min);

  getStageListData = (data, stageImages) => stageImages.map((item, index) => ({
    id: index,
    difficulty: this.getDifficulty(index),
    stageImageUrl: item,
    name: `Stage ${index}`,
    clicked: 0,
    scored: 0,
    status: UNREACHED,
    data: this.parseDataToMatrix(data, this.getDifficulty(index))
  }));

  getStagePlayData = data => ({
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
    // const result = this.props.shouldDisplayStageList ? <p>Stage List Component</p> : <p>Stage Play</p>;
    return (
        <>
        {this.props.shouldDisplayStageList
            ? <StageList
                stageList={this.state.stageListData}
              />
            : <StagePlay
                id={this.state.stagePlayData.id}
                difficulty={this.state.stagePlayData.difficulty}
                stageImageUrl={this.state.stagePlayData.stageImageUrl}
                name={this.state.stagePlayData.name}
                data={this.state.stagePlayData.data}
                timer={this.state.stagePlayData.timer}
            />
        }
        </>
    );
  }
}

MainComponent.propTypes = {
  shouldDisplayStageList: PropTypes.bool,
  stageToDisplay: PropTypes.number,
};

export default withRouter(MainComponent);
