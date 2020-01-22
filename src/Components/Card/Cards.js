import React, {Component} from 'react';
import './Cards.css';
import CardItem from "./CardItem/CardItem";

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: props.cards.map((card, index) => ({
        id: index,
        imageUrl: card,
        active: false,
        shouldDisplay: true
      }))
    }
  }

  clickHandler = (id) => {
    console.log('INSIDE THE CLICKHANDLER =',id);
    const cardIndex = this.state.cards.findIndex(c => c.id === id);

    const card = {...this.state.cards[cardIndex]};
    // console.log('before card = ',card);
    card.active = !card.active;
    // console.log('after card = ',card);

    let cards = [...this.state.cards];
    console.log('cards = ',cards);
    console.log('cardIndex = ',cardIndex);
    cards[cardIndex] = card;
    // cards = cards.slice(cardIndex, 1);
    this.setState((prevState, props) => {
      return {cards: cards};
    });
  }


  componentWillUpdate(prevProps, prevState) {
    console.log('[Card.JS] this.state = ',this.state);
    console.log('[Card.JS] prevState = ',prevState);
  }


  componentDidMount() {
    // console.log('cards = ', this.state.cards);
    // Force browser to load images
    this.state.cards.forEach((card) => new Image().src = card.imageUrl);
  }


  render() {

    return (
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
    );
  }
}

export default Cards;