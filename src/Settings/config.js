import React from 'react';
import { onePiece } from "./data";
import GAME_1 from  './../assets/images/game1.jpg';
import GAME_2 from  './../assets/images/game2.jpg';
import GAME_3 from  './../assets/images/game3.jpg';
import GAME_4 from  './../assets/images/game4.jpg';
import GAME_5 from  './../assets/images/game5.jpg';
import GAME_6 from  './../assets/images/game6.jpg';

export const MAX_TIMER = 301; // 5 minutes
export const MIN_TIMER = 10;
export const RUNNING = 'RUNNING';
export const FAILED = 'FAILED';
export const SUCCEED = 'SUCCEED';
export const UNREACHED = 'UNREACHED';
export const EASY = 'Easy';
export const MEDIUM = 'Medium';
export const HARD = 'Hard';

export const StatusType = [RUNNING, FAILED, SUCCEED, UNREACHED];

export const WON_IMG = "https://i.postimg.cc/T2DBgJvb/emoji-smile.jpg";
export const LOST_IMG = "https://i.postimg.cc/sDCqcG3N/emoji-sad.png";

export const Theme = {
  'onePiece' : {
    data: onePiece,
    // cardBackground: 'url("https://i.postimg.cc/dVsJ1yCC/one-piece-couv.png")',
    stageImages: [
      // "https://i.postimg.cc/dVsJ1yCC/one-piece-couv.png",
      // "https://i.postimg.cc/htctdYkf/244-2440924-tony-tony-chopper-chopper-one-piece-wallpaper-hd.png",
      // "https://i.postimg.cc/q7Bq9Fw9/by-melonciutus-strong-manga-mastodon-big-mom-the-four-empero.jpg",
      "https://i.postimg.cc/Sx2VQHjz/game1.jpg",
      "https://i.postimg.cc/dVsJ1yCC/one-piece-couv.png",
      GAME_1,
      GAME_3,
      GAME_4,
      GAME_5,
      GAME_6,
    ]
  },
};

export const ThemeContext = React.createContext(Theme.onePiece);
