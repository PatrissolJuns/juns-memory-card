import React from 'react';
import { onePiece } from "./data";

export const MAX_TIMER = 301; // 5 minutes
export const MIN_TIMER = 10;

export const WON_IMG = "https://i.postimg.cc/T2DBgJvb/emoji-smile.jpg";
export const LOST_IMG = "https://i.postimg.cc/sDCqcG3N/emoji-sad.png";

export const Theme = {
  'onePiece' : {
    data: onePiece,
    cardBackground: 'url("https://i.postimg.cc/dVsJ1yCC/one-piece-couv.png")',
  },
};

export const ThemeContext = React.createContext(Theme.onePiece);
