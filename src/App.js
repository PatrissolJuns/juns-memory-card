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
import MainComponent from "./Components/MainComponent/MainComponent";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
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
                  <Route path="/level-list">
                    <MainComponent shouldDisplayLevelList={true} />
                  </Route>
                  <Route path="/play/level/:levelId">
                    <MainComponent shouldDisplayLevelList={false} />
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
