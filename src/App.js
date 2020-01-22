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


  render() {
    return (
      <>
        <ThemeContext.Provider value={this.state.theme}>
          <Header />
          <Timer timer={10} />
          <Cards cards={this.state.theme.data}/>
        </ThemeContext.Provider>
      </>
    );
  }

}

export default App;
