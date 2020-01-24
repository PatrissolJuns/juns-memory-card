import React, {Component} from 'react';
import '../../../../assets/Sass/Cards.scss';
import CardItem from "./CardItem";

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: props.cards.map((card, index) => ({
        id: index,
        imageUrl: card,
        active: false,
        shouldDisplay: true
      })),
      scored: 0,
      clicked: 0
    }
  }

  updateCards = (...cards) => {
    let newCards = [...this.state.cards];

    cards.forEach(card => newCards[card.id] = card);
    // cards = cards.slice(cardIndex, 1);
    return newCards;
  }

  getActiveCard = (includeShouldDisplay = false) =>
      this.state.cards.filter(c => c.active && (includeShouldDisplay ? c.shouldDisplay : true));

  clickHandler = (id) => {
    const activatedCard = this.getActiveCard(true);
    const activatedCardCount = activatedCard.length;
    console.log('INSIDE THE CLICKHANDLER =',id);
    console.log('activatedCardCount = ',activatedCardCount);

    if(activatedCardCount < 2) {
      const cardIndex = this.state.cards.findIndex(c => c.id === id);

      const card = {...this.state.cards[cardIndex]};

      card.active = !card.active;

      /*let cards = [...this.state.cards];

      cards[cardIndex] = card;
      // cards = cards.slice(cardIndex, 1);
      this.setState({cards: cards});*/

      this.setState(
        (prevState) => ({clicked: prevState.clicked + 1, cards: this.updateCards(card)}),
        () => {
          if(activatedCardCount === 1) {
            setTimeout(() => {
              this.checkTwoCard();
            }, 500);
          }
      });
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
        this.setState((prevState) => ({scored: prevState.scored + 1, cards: this.updateCards(card1, card2)}));
      }
      else {
        card1.active = false;
        card2.active = false;
        this.setState({cards: this.updateCards(card1, card2)});
      }
    }
  }


  /*componentWillUpdate(prevProps, prevState) {
    console.log('[Card.JS] this.state = ',this.state);
    console.log('[Card.JS] prevState = ',prevState);
  }*/


  componentDidMount() {
    // Force browser to load images
    this.state.cards.forEach(card => new Image().src = card.imageUrl);
  }


  render() {

    return (
        <>
          <h1>Scored: {this.state.scored} and Clicked time : {this.state.clicked}</h1>
          <br/>
          <div className={"cards"}>
            {
              this.state.cards.map(card => {
                return <CardItem
                          key={card.id}
                          {...card}
                          clicked={this.clickHandler}
                        />
              })
            }
          </div>
        </>
    );
  }
}

export default Cards;