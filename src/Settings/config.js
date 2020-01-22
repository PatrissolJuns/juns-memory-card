import React from 'react';
import { onePiece } from "./data";

export const MAX_TIMER = 301; // 5 minutes
export const MIN_TIMER = 10;
export const RUNNING = 'RUNNING';
export const FAILED = 'FAILED';
export const SUCCESS = 'SUCCESS';
export const UNREACHED = 'UNREACHED';

export const StatusType = [RUNNING, FAILED, SUCCESS, UNREACHED];

export const WON_IMG = "https://i.postimg.cc/T2DBgJvb/emoji-smile.jpg";
export const LOST_IMG = "https://i.postimg.cc/sDCqcG3N/emoji-sad.png";

export const Theme = {
  'onePiece' : {
    data: onePiece,
    // cardBackground: 'url("https://i.postimg.cc/dVsJ1yCC/one-piece-couv.png")',
    stageImages: [
      "https://i.postimg.cc/dVsJ1yCC/one-piece-couv.png",
      "https://i.postimg.cc/htctdYkf/244-2440924-tony-tony-chopper-chopper-one-piece-wallpaper-hd.png",
      "https://i.postimg.cc/q7Bq9Fw9/by-melonciutus-strong-manga-mastodon-big-mom-the-four-empero.jpg"
    ]
  },
};

export const ThemeContext = React.createContext(Theme.onePiece);
