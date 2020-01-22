import React, { Component } from 'react';
import './assets/Sass/base.scss';
import './App.scss';
import Header from "./Components/Header";
import { ThemeContext, Theme } from './Settings/config';
import JMCContainer from "./Components/JMCContainer";
import HomeScreen from "./Components/HomeScreen";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      theme: Theme.onePiece,
      scored: 0,
      clicked: 0
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

  endOfGame = (scored, clicked) => {
    this.state({scored: scored, clicked: clicked, result: scored !== 4})
  }

  onUpdateCounter = (scored, clicked) => {

  }

  render() {
    return (
      <>
        <ThemeContext.Provider value={this.state.theme}>
          <Header />
          <JMCContainer>
            <HomeScreen />
          </JMCContainer>
          {/*<Timer onEndOfGame={this.endOfGame} timer={10} />
          <Cards onEndOfGame={this.endOfGame} cards={this.parseDataToMatrix(this.state.theme.data)}/>
          <EndSingleParty modalShowDefault={true} result={false} />*/}
        </ThemeContext.Provider>
      </>
    );
  }

}

export default App;
