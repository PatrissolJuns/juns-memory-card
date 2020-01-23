import {levels} from "../Settings/data";

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


export const parseDataToMatrix = data => {
  let newData = [...data];
  data.forEach((d, index) => {
    let pos = getRandomNumber(0, data.length - 1);
    while(pos === index ) pos = getRandomNumber(0, data.length - 1);
    newData.splice(pos, 0, d);
  });

  return newData;
}

export const getMatrix = (data, level) => {
  let halfData = data.slice(0, level.imagesNumber);
  const r = ~~(level.items / 2) - level.imagesNumber;
  if(r > 0) halfData.push(...extractRandomly(halfData, r));

  return parseDataToMatrix(shuffle(halfData));
};

export const shuffle = arr => {
  let j, x, i, a= [...arr];
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

export const extractRandomly = (arr, length) => {
  return shuffle(arr).slice(0, length);
}

export const getLevel = levelNumber => levels.find(level => level.level === levelNumber);