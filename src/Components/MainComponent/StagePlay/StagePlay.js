import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Timer from "./Timer";
import SideBar from "./SideBar";
import {FAILED, StatusType} from "./../../../Settings/config";
import EndOfStage from "./EndOfStage";
import CardList from "../Card/CardList";
import {getNewObjectFromState, updateCardList} from "../../utilities";

class StagePlay extends Component {

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
      displayResult: false
    }
  }

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

      if(card1.imageUrl === card2.imageUrl) {
        card1.shouldDisplay = false;
        card2.shouldDisplay = false;
        this.setState((prevState) => ({scored: prevState.scored + 1, cardList: updateCardList(prevState.cardList, card1, card2)}));
      }
      else {
        card1.active = false;
        card2.active = false;
        this.setState((prevState) => ({cardList: updateCardList(prevState.cardList, card1, card2)}));
      }
    }
  }

  getActiveCard = (includeShouldDisplay = false) =>
      this.state.cardList.filter(c => c.active && (includeShouldDisplay ? c.shouldDisplay : true));

  componentDidMount() {
    // Force browser to load images
    this.state.cardList.forEach(card => new Image().src = card.imageUrl);
  }

  render() {
    return (
        <>
          <Timer timer={this.props.timer}/>
          <SideBar
            scored={this.state.scored}
            clicked={this.state.clicked}
            difficulty={this.props.difficulty}
            stageName={this.props.name}
          />
          <CardList
              cardList={this.state.cardList}
              stageImageUrl={this.props.stageImageUrl}
              clickedOnCardItem={this.clickedOnCardItemHandler}
          />
          {
            this.state.displayResult
                ? <EndOfStage
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

StagePlay.propTypes = {
  id: PropTypes.number.isRequired,
  difficulty: PropTypes.node.isRequired,
  stageImageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.oneOf([...StatusType]),
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  timer: PropTypes.number.isRequired,
};

export default StagePlay;
