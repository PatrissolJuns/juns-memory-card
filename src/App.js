import React, { Component } from 'react';
import './assets/Sass/base.scss';
import './App.scss';
import Header from "./Components/Header";
import { ThemeContext, Theme } from './Settings/config';
import JMCContainer from "./Components/JMCContainer";
import HomeScreen from "./Components/HomeScreen";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import MainComponent from "./Components/MainComponent";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
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
              <Router>
                <Switch>
                  <Route exact path="/">
                    <HomeScreen />
                    {/*<Link to="/topics">Topics</Link>*/}
                  </Route>
                  <Route path="/topics">
                    <h1>TOPICS </h1>
                    {/*<Link to="/">Home</Link>*/}
                  </Route>
                  <Route path="/stage-list">
                    <MainComponent shouldDisplayStageList={true} />
                    <p>STAGE LIST</p>
                  </Route>
                  <Route path="/play">
                    <MainComponent shouldDisplayStageList={false} />
                    <p>STAGE PLAY</p>
                  </Route>
                  <Redirect to="/" />
                </Switch>
              </Router>
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
