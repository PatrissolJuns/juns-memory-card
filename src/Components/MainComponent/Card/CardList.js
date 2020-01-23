import React from 'react';
import PropTypes from 'prop-types';
import CardItem from "./CardItem";

const CardList = ({cardList, levelImageUrl, clickedOnCardItem, ...props}) => {
  return (
      <div className={"row jmc-card-list max-width"}>
      {cardList.map((card, index) => {
        return <CardItem
                  key={index}
                  id={card.id}
                  levelImageUrl={levelImageUrl}
                  imageUrl={card.imageUrl}
                  shouldDisplay={card.shouldDisplay}
                  active={card.active}
                  clickedOnCardItem={clickedOnCardItem}
                />
        })
      }
      </div>
  );
};

CardList.propTypes = {
  cardList: PropTypes.array.isRequired,
  levelImageUrl: PropTypes.string.isRequired,
  clickedOnCardItem: PropTypes.func.isRequired,
};

export default CardList;
