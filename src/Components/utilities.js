import {levels} from "../Others/data";
import {EASY, FAILED, HARD, MEDIUM, SCORE, SUCCEED, TIME} from "../Others/constants";
import {MULTIPLIER} from "../Others/config";

export const getNewObjectFromState = (arrOfObject, index) => {
  const cardIndex = arrOfObject.findIndex(c => c.id === index);

  return {...arrOfObject[cardIndex]};
};

export const updateCardList = (oldCardList, ...cards) => {
  let newCards = [...oldCardList];

  cards.forEach(card => newCards[card.id] = card);
  // cards = cards.slice(cardIndex, 1);
  return newCards;
};

export const getRandomNumber = (min = 0, max = 10) => Math.floor(Math.random() * (max - min + 1) + min);

export const parseDataToMatrix = data => {
  let newData = [...data];
  data.forEach((d, index) => {
    let pos = getRandomNumber(0, data.length - 1);
    while(pos === index ) pos = getRandomNumber(0, data.length - 1);
    newData.splice(pos, 0, d);
  });

  return newData;
};

export const getMatrix = (data, level) => {
  let halfData = data.slice(0, level.imagesNumber);
  const r = ~~(level.items / 2) - level.imagesNumber;
  /*if(level.level === 10) {
    console.log('r = ', r);
    console.log('before work = ', halfData);
  }*/
  if(r > 0) {
    const halfDataLength = halfData.length;
    if(r > halfDataLength) {
      let i = r;
      while(i > 0) {
        halfData.push(...extractRandomly(halfData, i > halfDataLength ? halfDataLength : i));
        i = i - halfDataLength;
      }
    }
    else halfData.push(...extractRandomly(halfData, r));
  }
  // if(level.level === 10) console.log('after work = ', halfData);

  return parseDataToMatrix(shuffle(halfData));
};

export const getLevel = levelNumber => levels.find(level => level.level === levelNumber);

export const getBackgroundLevelImage = (levelNumber, levelImages) => {
  if(1 <= levelNumber && 5 >= levelNumber) return levelImages[0];
  else if(6 <= levelNumber && 10 >= levelNumber) return levelImages[1];
  else if(11 <= levelNumber && 15 >= levelNumber) return levelImages[2];
  else return levelImages[3];
};

export const getDecisionLevel = (level, levelScore) => getMinLevelScore(level) <= levelScore ? SUCCEED : FAILED;

export const getScoreFromClickedTime = (level, clickedTime) => {
  if(clickedTime > 0) {
    return ~~((1 / clickedTime) * level.items * 2 * level.imagesNumber * 100);
  }
  return 0;
};

export const getBonusLevel = (level, timerBonus) => {
  return timerBonus * (level.imagesNumber * 2);
  // return timerBonus * (level.items * 3 + level.imagesNumber * 2);
};

export const getLevelScore = (score, timeBonus) => score + timeBonus;

export const getMinLevelScore = level => getScoreFromClickedTime(level, level.items * getMultiplier(MEDIUM, SCORE));

export const getMultiplier = (difficulty, type = SCORE) => {
  switch (difficulty) {
    case HARD: return MULTIPLIER[type][HARD];
    case EASY: return MULTIPLIER[type][EASY];
    default: return MULTIPLIER[type][MEDIUM];
  }
};

export const getTimer = level => {
  return ~~(level.items * 1.5 + level.imagesNumber * getMultiplier(MEDIUM, TIME));
};

export const preloadImages = arrayOfImagesURL => arrayOfImagesURL.forEach(imageUrl => new Image().src = imageUrl);

console.log('level 1 min = ', getMinLevelScore(getLevel(1)));
console.log('level 2 min = ', getMinLevelScore(getLevel(2)));
console.log('timer 1 min = ', getTimer(getLevel(1)));
console.log('timer 2 min = ', getTimer(getLevel(2)));


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