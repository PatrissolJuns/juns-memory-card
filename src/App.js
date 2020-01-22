import React, { Component } from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import Timer from "./Components/Timer/Timer";
import { ThemeContext, Theme } from './Settings/config';
import Cards from "./Components/Card/Cards";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      theme: Theme.onePiece,
    }
  }

  // min and max included
  getRandomNumber = (min = 0, max = 10) => Math.floor(Math.random() * (max - min + 1) + min)

  parseDataToMatrix = data => {
    if(data.length % 2 !== 0) {
      throw new Error("data must be a multiple of 2");
    }
    let newData = [...data];
    data.forEach((d, index) => {
      let pos = this.getRandomNumber(0, data.length - 1);
      while(pos === index ) pos = this.getRandomNumber(0, data.length - 1);
      newData.splice(pos, 0, d);
    });

    return newData;
  }

  render() {
    return (
      <>
        <ThemeContext.Provider value={this.state.theme}>
          <Header />
          <Timer timer={10} />
          <Cards cards={this.parseDataToMatrix(this.state.theme.data)}/>
        </ThemeContext.Provider>
      </>
    );
  }

}

export default App;
