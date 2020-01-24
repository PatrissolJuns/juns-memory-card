import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Timer from "./Timer";
import SideBar from "./SideBar";
import EndOfLevel from "./EndOfLevel";
import CardList from "./Card/CardList";
import {
  getLevel,
  preloadImages,
  getLevelScore,
  getBonusLevel,
  updateCardList,
  getDecisionLevel,
  getNewObjectFromState,
  getScoreFromClickedTime,
} from "../../utilities";
import {levels} from "../../../Others/data";
import {FAILED, StatusType, SUCCEED} from "../../../Others/constants";

class LevelPlay extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cardList: props.data.map((card, index) => ({
        id: index,
        imageUrl: card,
        active: false,
        shouldDisplay: true
      })),
      score: 0,
      spentTime: 0,
      timeBonus: 0,
      levelScore: 0,
      clickedTime: 0,
      decision: FAILED,
      displayResult: false
    }
  }

  componentDidMount() {

    this.timerID = setInterval(
        () => this.updateTimer(),
        1000
    );
    // Force browser to load images
    // this.state.cardList.forEach(card => new Image().src = card.imageUrl);
    preloadImages(this.state.cardList.map(card => card.imageUrl));
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  /**
   * Get the number of card done
   * @returns {number}
   */
  getProgress = () => this.state.cardList.filter(c => !c.shouldDisplay).length / 2;

  clickedOnCardItemHandler = (id) => {
    // console.log('id = ', id);
    const activatedCard = this.getActiveCard(true);
    const activatedCardCount = activatedCard.length;
    // console.log('activatedCardCount = ',activatedCardCount);

    if(activatedCardCount < 2) {
      const card = getNewObjectFromState(this.state.cardList, id);
      card.active = !card.active;

      this.setState(
          (prevState) => ({clickedTime: prevState.clickedTime + 1, cardList: updateCardList(prevState.cardList, card)}),
          () => {
            if (activatedCardCount === 1) {
              setTimeout(() => {
                this.checkTwoCard();
              }, 500);
            }
          }
      );
    }
  };

  checkTwoCard = () => {
    const activatedCard = this.getActiveCard(true);
    // console.log('activatedCard = ',activatedCard);
    if(activatedCard.length === 2) {
      let card1 = {...activatedCard[0]}, card2 = {...activatedCard[1]}; // To not mutate directly the state

      // Check if the cards are right
      if(card1.imageUrl === card2.imageUrl) {
        card1.shouldDisplay = false;
        card2.shouldDisplay = false;
      }
      else {
        card1.active = false;
        card2.active = false;
      }
      // Update the cardList
      this.setState(
          (prevState) => ({cardList: updateCardList(prevState.cardList, card1, card2)}),
          () => {
            if(this.getProgress() === this.state.cardList.length / 2) {
              this.setLevelScoreAndDecision()
                  .then(
                      () => this.setState(
                      (prevState) => ({displayResult: true}),
                      () => clearInterval(this.timerID)
                      )
              );
            }
          }
      );
    }
  };

  setLevelScoreAndDecision = () => {
    return new Promise((resolve, reject) => {
      if(this.getProgress() === this.state.cardList.length / 2 && this.state.clickedTime > 0) {
        this.setScore()
            .then(
                score => {
                  const timerBonus = this.state.spentTime < this.props.timer
                      ? this.props.timer - this.state.spentTime
                      : 0;

                  const level = getLevel(this.props.id);

                  const timeBonus = getBonusLevel(level, timerBonus);

                  const levelScore = getLevelScore(score, timeBonus);

                  console.log('timerBonus = ', timerBonus);
                  console.log('score = ', score);
                  console.log('timeBonus = ', timeBonus);
                  console.log('levelScore = ', levelScore);

                  this.setState(
                      (prevState) =>({
                        timeBonus: timeBonus,
                        levelScore: levelScore,
                        decision: getDecisionLevel(level, levelScore)
                      }),
                      () => resolve(this.state.levelScore)
                  );
                }
            );
      }
    })

  };

  setScore = () => {
    return new Promise((resolve, reject) => {
      if(this.getProgress() === this.state.cardList.length / 2) {
        this.setState(
            (prevState) => ({score: getScoreFromClickedTime(getLevel(this.props.id), this.state.clickedTime)}),
            () => resolve(this.state.score)
        );
      }
    });
  };

  getActiveCard = (includeShouldDisplay = false) =>
      this.state.cardList.filter(c => c.active && (includeShouldDisplay ? c.shouldDisplay : true));

  getNextLevelLink = () => {
    if(this.state.decision === SUCCEED) {
      if(this.props.id === levels.length) return '/';
      else return `/play/level/${this.props.id + 1}`
    }
    return `/play/level/${this.props.id}`
  };

  updateTimer = () => {
    if(!this.state.displayResult) {
      this.setState((prevState) => ({spentTime: prevState.spentTime + 1}))
    } else {
      clearInterval(this.timerID);
    }
  };


  render() {
    return (
        <>
          <Timer
              timer={this.props.timer}
              spentTime={this.state.spentTime}
              shouldStop={this.state.displayResult}
          />
          <SideBar
              levelName={this.props.name}
              clickedTime={this.state.clickedTime}
              progress={`${this.getProgress()}/${this.state.cardList.length / 2}`}
          />
          <CardList
              cardList={this.state.cardList}
              levelImageUrl={this.props.levelImageUrl}
              clickedOnCardItem={this.clickedOnCardItemHandler}
          />
          {
            this.state.displayResult
                ? <EndOfLevel
                    timer={this.props.timer}
                    score={this.state.score}
                    decision={this.state.decision}
                    spentTime={this.state.spentTime}
                    timeBonus={this.state.timeBonus}
                    levelScore={this.state.levelScore}
                    clickedTime={this.state.clickedTime}
                    nextLevelLink={this.getNextLevelLink()}
                />
                : null
          }
        </>
    );
  }
}

LevelPlay.propTypes = {
  id: PropTypes.number.isRequired,
  imagesNumber: PropTypes.number.isRequired,
  levelImageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.oneOf([...StatusType]),
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  timer: PropTypes.number.isRequired,
};

export default LevelPlay;
