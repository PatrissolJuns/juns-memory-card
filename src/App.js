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
import { Offline, Online } from "react-detect-offline";


import {
  createUserStat,
  generateUserSessionValue, getStatsByPseudo,
  getUserSessionValue, updateOrCreateUserLevel,
  updateUserSessionValue, updateUserStats
} from "./Others/firebase/database-utilities";
import {MEDIUM} from "./Others/constants";
import Instructions from "./Components/Instructions";
import GlobalStatistic from "./Components/GlobalStatistic";
import OfflineMode from "./Components/OfflineMode";
import Credit from "./Components/Credit";
import Setting from "./Components/Setting";

class App extends Component {

  constructor(props) {
    super(props);

    let userSessionValue = getUserSessionValue();
    if(!userSessionValue) userSessionValue = generateUserSessionValue();

    this.state = {
      ...userSessionValue,
      theme: Theme.onePiece,
      difficulty: MEDIUM,
    }
  }

  componentDidMount() {
    /*getStatsByPseudo('test').then(
        (data) => {
          console.log('DATA TEST_JUNS = ',data);

          const level = {levelNumber: 1, levelScore: 678, time: 12};
          const level2 = {levelNumber: 3, levelScore: 6780, time: 12};
          const level3 = {levelNumber: 2, levelScore: 4424, time: 14};
          const level4 = {levelNumber: 1, levelScore: 1020, time: 14};

          const newData = updateOrCreateUserLevel(data, this.state.difficulty, level);

          console.log('newData TEST_JUNS = ',newData);

          const newData2 = updateOrCreateUserLevel(newData, this.state.difficulty, level2);
          console.log('newData2 TEST_JUNS = ',newData2);

          const newData3 = updateOrCreateUserLevel(newData2, this.state.difficulty, level3);
          console.log('newData3 TEST_JUNS = ',newData3);

          const newData4 = updateOrCreateUserLevel(newData3, this.state.difficulty, level4);
          console.log('newData4 TEST_JUNS = ',newData4);




        }
    )*/
  }

  updateUserSessionValue = (newPseudo, newName, isNewAccount, level) => {
    return new Promise((resolve, reject) => {
      // Step 1: Update the value of the session
      updateUserSessionValue(newPseudo, newName, false);

      // Step 2: Update the state
      this.setState((prevState) => ({
        userPseudo: newPseudo,
        userName: newName,
        isUserGenerated: false
      }), () => {
        if(isNewAccount) {
          const data = updateOrCreateUserLevel({name: newName, levels: {}}, this.state.difficulty, level);
          // console.log('isNewAccount data = ', data);
          createUserStat(newPseudo, data)
              .then(() => resolve(true))
              .catch(() => reject(false));
        }
        else {
          getStatsByPseudo(newPseudo).then(
              (stats) => {
                const data = updateOrCreateUserLevel(stats, this.state.difficulty, level);
                // console.log('updateOrCreateUserLevel data = ', data);
                updateUserStats(newPseudo, data)
                    .then(() => resolve(true))
                    .catch(() => reject(false));
              }
          )
        }
      });
    });
  };

  render() {
    return (
        <>
          <ThemeContext.Provider value={this.state.theme}>
            <Header />
            {/*<Offline>*/}
            {/*  <OfflineMode />*/}
            {/*</Offline>*/}
            <JMCContainer>
              <Router>
                <Switch>
                  <Route exact path="/">
                    <HomeScreen />
                    {/*<Link to="/topics">Topics</Link>*/}
                  </Route>
                  <Route exact path="/instructions">
                    <Instructions />
                  </Route>
                  <Route exact path="/statistics">
                    <GlobalStatistic  userPseudo={this.state.userPseudo}/>
                  </Route>
                  <Route exact path="/credits">
                    <Credit />
                  </Route>
                  <Route exact path="/settings">
                    <Setting />
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
