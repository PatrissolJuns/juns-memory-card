import React, { Component } from 'react';
import './assets/Sass/base.scss';
import './App.scss';
import Header from "./Components/Header";
import { ThemeContext, Theme } from './Others/config';
import JMCContainer from "./Components/JMCContainer";
import HomeScreen from "./Components/HomeScreen";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import MainComponent from "./Components/MainComponent/MainComponent";
import {generateUserSessionValue, getUserSessionValue} from "./Others/firebase/database-utilities";

class App extends Component {

  constructor(props) {
    super(props);

    let userSessionValue = getUserSessionValue();
    if(!userSessionValue) userSessionValue = generateUserSessionValue();

    this.state = {
      ...userSessionValue,
      theme: Theme.onePiece,
    }
  }

  updateUserSessionValue = (newPseudo, newName, isNewAccount) => {
    console.log('[APP.JS]:: INSIDE updateUserSessionValue');
    console.log('newPseudo = ',newPseudo);
    console.log('newName = ',newName);
    console.log('isNewAccount = ',isNewAccount);
  };

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
                    <MainComponent
                        userName={this.state.userName}
                        userPseudo={this.state.userPseudo}
                        isUserGenerated={this.state.isUserGenerated}
                        updateUserSessionValue={this.updateUserSessionValue}
                        shouldDisplayLevelList={true}
                    />
                  </Route>
                  <Route path="/play/level/:levelId">
                    <MainComponent
                        userName={this.state.userName}
                        userPseudo={this.state.userPseudo}
                        isUserGenerated={this.state.isUserGenerated}
                        updateUserSessionValue={this.updateUserSessionValue}
                        shouldDisplayLevelList={false}
                    />
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
