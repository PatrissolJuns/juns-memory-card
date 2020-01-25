import React from 'react';
import {onePiece} from "./data";
import {EASY, HARD, MEDIUM, SCORE, TIME} from "./constants";
/*
import GAME_1 from  './../assets/images/game1.jpg';
import GAME_2 from  './../assets/images/game2.jpg';
import GAME_3 from  './../assets/images/game3.jpg';
import GAME_4 from  './../assets/images/game4.jpg';
import GAME_5 from  './../assets/images/game5.jpg';
import GAME_6 from  './../assets/images/game6.jpg';
*/

export const MULTIPLIER = {
  [SCORE]: {
    [EASY]: 2.5,
    [MEDIUM]: 2,
    [HARD]: 1.5,
  },
  [TIME]: {
    [EASY]: 3,
    [MEDIUM]: 2.5,
    [HARD]: 2,
  }
};

export const WON_IMG = "https://i.postimg.cc/6Qyw9sX8/a186a8d8e1f7b380778c05a6d157155d.png";
export const NEXT_IMG = "https://i.postimg.cc/hjJKSkVC/emoji-star-burned.png";
export const RETRY_IMG = "https://i.postimg.cc/tgwbJrq2/emoji-retry-full-removebg-preview.png";
export const LOST_IMG = "https://i.postimg.cc/90qKSVyh/emoji-crying-burned-1.png";
export const GOLD_IMG = "https://i.postimg.cc/vZ9zGYzS/gold-removebg-preview.png";

export const Theme = {
  'onePiece' : {
    data: onePiece,
    // cardBackground: 'url("https://i.postimg.cc/dVsJ1yCC/one-piece-couv.png")',
    levelImages: [
      // "https://i.postimg.cc/dVsJ1yCC/one-piece-couv.png",
      "https://i.postimg.cc/Sx2VQHjz/game1.jpg",
      "https://i.postimg.cc/dVsJ1yCC/one-piece-couv.png",
      "https://i.postimg.cc/htctdYkf/244-2440924-tony-tony-chopper-chopper-one-piece-wallpaper-hd.png",
      "https://i.postimg.cc/q7Bq9Fw9/by-melonciutus-strong-manga-mastodon-big-mom-the-four-empero.jpg",
      // GAME_1,
      // GAME_3,
      // GAME_4,
      // GAME_5,
      // GAME_6,
    ]
  },
};

export const ADMIN_EMAIL = "adminjmc@gmail.com";
export const ADMIN_PWD = "adminjmc";

export const COLLECTION_STATISTICS_NAME = 'statistics';

export const ThemeContext = React.createContext(Theme.onePiece);
