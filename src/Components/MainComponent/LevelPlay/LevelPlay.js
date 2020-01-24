import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Timer from "./Timer";
import SideBar from "./SideBar";
import {FAILED, StatusType} from "./../../../Settings/config";
import EndOfLevel from "./EndOfLevel";
import CardList from "../Card/CardList";
import {getNewObjectFromState, updateCardList} from "../../utilities";

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
      scored: 0,
      clicked: 0,
      decision: FAILED,
      leftTime: 0,
      displayResult: true
    }
  }

  /**
   * Get the number of card done
   * @returns {number}
   */
  getProgress = () => this.state.cardList.filter(c => !c.shouldDisplay).length / 2;

  clickedOnCardItemHandler = (id) => {
    console.log('id = ', id);
    const activatedCard = this.getActiveCard(true);
    const activatedCardCount = activatedCard.length;
    console.log('activatedCardCount = ',activatedCardCount);

    if(activatedCardCount < 2) {
      const card = getNewObjectFromState(this.state.cardList, id);
      card.active = !card.active;

      this.setState(
          (prevState) => ({clicked: prevState.clicked + 1, cardList: updateCardList(prevState.cardList, card)}),
          () => {
            if (activatedCardCount === 1) {
              setTimeout(() => {
                this.checkTwoCard();
              }, 500);
            }
          }
      );
    }
  }

  checkTwoCard = () => {
    const activatedCard = this.getActiveCard(true);
    console.log('activatedCard = ',activatedCard);
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
      this.setState((prevState) => ({cardList: updateCardList(prevState.cardList, card1, card2)}));
    }
  }

  getActiveCard = (includeShouldDisplay = false) =>
      this.state.cardList.filter(c => c.active && (includeShouldDisplay ? c.shouldDisplay : true));

  componentDidMount() {
    // Force browser to load images
    this.state.cardList.forEach(card => new Image().src = card.imageUrl);
  }

  leftTimerHandler = newValue => {
    let leftTime = this.props.timer - newValue;
    if(leftTime <= 0)
      this.setState((prevState) => ({leftTime: leftTime, displayResult: true}));
    else this.setState((prevState) => ({leftTime: leftTime}));
  }


  render() {
    return (
        <>
          <Timer timer={this.props.timer} updateLeftTimer={this.leftTimerHandler}/>
          <SideBar
            progress={`${this.getProgress()}/${this.state.cardList.length / 2}`}
            clicked={this.state.clicked}
            levelName={this.props.name}
          />
          <CardList
              cardList={this.state.cardList}
              levelImageUrl={this.props.levelImageUrl}
              clickedOnCardItem={this.clickedOnCardItemHandler}
          />
          {
            this.state.displayResult
                ? <EndOfLevel
                    leftTime={this.state.leftTime}
                    timer={this.props.timer}
                    decision={this.state.decision}
                    scored={this.state.scored}
                    clicked={this.state.clicked}
                />
                : null
          }
        </>
    );
  }
}

LevelPlay.propTypes = {
  id: PropTypes.number.isRequired,
  levelImageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.oneOf([...StatusType]),
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  timer: PropTypes.number.isRequired,
};

export default LevelPlay;
