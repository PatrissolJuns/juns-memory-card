import React from 'react';
import PropTypes from 'prop-types';
import CardItem from "./CardItem";

const CardList = ({cardList, stageImageUrl, clickedOnCardItem, ...props}) => {
  return (
      <div className={"row jmc-card-list max-width"}>
      {cardList.map((card, index) => {
        return <CardItem
                  key={index}
                  id={card.id}
                  stageImageUrl={stageImageUrl}
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
  stageImageUrl: PropTypes.string.isRequired,
  clickedOnCardItem: PropTypes.func.isRequired,
};

export default CardList;
