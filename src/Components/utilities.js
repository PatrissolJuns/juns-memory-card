export const updateCardList = (oldCardList, ...cards) => {
  let newCards = [...oldCardList];

  cards.forEach(card => newCards[card.id] = card);
  // cards = cards.slice(cardIndex, 1);
  return newCards;
};

export const getRandomNumber = (min = 0, max = 10) => Math.floor(Math.random() * (max - min + 1) + min);

export const getNewObjectFromState = (arrOfObject, index) => {
  const cardIndex = arrOfObject.findIndex(c => c.id === index);

  return {...arrOfObject[cardIndex]};
};
