import {getRandomNumber} from "../Components/utilities";

export const onePiece = [
  "https://i.postimg.cc/zv2VjFK9/wp3275269.png",
  "https://i.postimg.cc/1zzRWq5S/maxresdefault.jpg",
  "https://i.postimg.cc/prjLfMVn/one-piece-by-hansih2-smoker.jpg",
  "https://i.postimg.cc/CLdZK9VY/d0a09a309f9a45cd1a6ceeac19e4870f.jpg",
  "https://i.postimg.cc/59sYbbTn/ee6946d701c56b2ae11565d46098fd83.png",
  "https://i.postimg.cc/ZR2qv5mS/171-1717117-doflamingo-one-piece.png",
  // "https://i.postimg.cc/pTpTdngC/3b62fe1aa3395cff000883ae8ada68f4.jpg",
  // "https://i.postimg.cc/Lsy5RV0h/6422ec72d93b9602e76b04bcc2c916db.jpg",
  // "https://i.postimg.cc/664qJnV5/84b2650a22d095062f36b964cf097f24.png",
  // "https://i.postimg.cc/Yqc9p08N/a796dbc061c028b827fdbf3ecd9e30b6.jpg",
  // "https://i.postimg.cc/0yn2dfvZ/one-piece-sketch-usopp-by-lnearmellomatt-jpg-token-ey-J0e-XAi-Oi-J.jpg"
];

export const levels = [
  {level: 1, items: 6, imagesNumber: 3},
  {level: 2, items: 14, imagesNumber: 4},
  {level: 3, items: 14, imagesNumber: 7},
  {level: 4, items: 24, imagesNumber: 4},
  {level: 5, items: 24, imagesNumber: 6},
  {level: 6, items: 24, imagesNumber: 8},
  {level: 7, items: 24, imagesNumber: 10},
  {level: 8, items: 24, imagesNumber: 11},
  {level: 9, items: 24, imagesNumber: 12},
  {level: 10, items: 44, imagesNumber: 7},
  {level: 11, items: 44, imagesNumber: 9},
  {level: 12, items: 44, imagesNumber: 11},
  {level: 13, items: 44, imagesNumber: 11},
  {level: 14, items: 44, imagesNumber: 14},
  {level: 15, items: 44, imagesNumber: 17},
  {level: 16, items: 44, imagesNumber: 19},
  {level: 17, items: 44, imagesNumber: 20},
  {level: 18, items: 44, imagesNumber: 21},
  {level: 19, items: 44, imagesNumber: 22},
  {level: 20, items: 44, imagesNumber: 22},
];

const imagesData = [];

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

function shuffle(arr) {
  let j, x, i, a= [...arr];
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

function extractRandomly(arr, length) {
  return shuffle(arr).slice(0, length);
}