import React, {Component} from 'react';
import PropTypes from 'prop-types';
import JMCTitle from "./UIElements/JMCTitle";
import {ButtonBack, ButtonNext, CarouselProvider, Slide, Slider} from "pure-react-carousel";
import JMCCard from "./UIElements/JMCCard";
import {getGlobalHighScoreOfLevel, getStatsByPseudo} from "../Others/firebase/database-utilities";
import {MEDIUM} from "../Others/constants";
import GlobalStatisticItem from "./GlobalStatisticItem";


class GlobalStatistic extends Component {

  constructor(props) {
    super(props);

    this.state = {
      statsList: [],
      userStats: [],
      displayLeaderBoard: false
    }
  }

  componentDidMount() {
    this.fetchData();
  }


  fetchData = () => {
    getGlobalHighScoreOfLevel(MEDIUM).then(
        (data) => {
          console.log("[INSIDE GLOBALSTATISTIC]:: data => ", data);

          getStatsByPseudo(this.props.userPseudo).then(
              (userData) => {
                console.log("[INSIDE GLOBALSTATISTIC]:: userData => ", userData);
                this.setState((prevState) =>({
                  statsList: data,
                  userStats: userData.levels[MEDIUM] ? userData.levels[MEDIUM] : [],
                  displayLeaderBoard: true
                }));
              }
          )
        }
    )
    // fetchData();
  };

  getUserStatsLevel = levelNumber => this.state.userStats.find(l => l.levelNumber === levelNumber);

  render() {
    return (
        <div id="game" className="casino fullwidth">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-12">
                <JMCTitle
                    displayPaddingBottom={true}
                    paddingButtonTitle={"pb-2"}
                    title="Statistics"
                    underlined={false}
                />
              </div>
            </div>
            {
              this.state.displayLeaderBoard
                  ? <div className="row">
                    <div className="col-lg-12 col-md-11 col-sm-10">

                      <CarouselProvider
                          naturalSlideWidth={500}
                          naturalSlideHeight={500}
                          totalSlides={this.state.statsList.length}
                          visibleSlides={3}
                      >
                        <Slider>
                          {
                            this.state.statsList.map((levelStats, index) => {
                              return (
                                  <Slide key={index} index={index}>
                                    <GlobalStatisticItem
                                        // levelNumber={this.state.userStats.find(l => l.levelNumber === level.levelNumber).levelNumber}
                                        levelNumber={levelStats[0].levelNumber}
                                        levelScore={this.state.userStats.length !== 0 ? this.getUserStatsLevel() ? this.getUserStatsLevel().levelScore : 0 : 0}
                                        time={this.state.userStats.length !== 0 ? this.getUserStatsLevel() ? this.getUserStatsLevel().time : 0 : 0}
                                        data={levelStats}
                                    />
                                  </Slide>
                              )
                            })
                          }
                        </Slider>
                        <ButtonBack>
                          <a className="jmc-arrow jmc-arrow-prev right-100">
                            <i className="fa fa-arrow-left"> </i>
                          </a>
                        </ButtonBack>
                        <ButtonNext>
                          <a className="jmc-arrow jmc-arrow-next left-100">
                            <i className="fa fa-arrow-right"> </i>
                          </a>
                        </ButtonNext>
                      </CarouselProvider>
                      <JMCCard
                          imageUrl={"https://i.postimg.cc/dVsJ1yCC/one-piece-couv.png"}
                          marginBottom={' '}
                          addClass={"opacity-0"}
                      />
                    </div>
                  </div>
                  : <i className="fa fa-10x fa-refresh fa-spin fa-spinner big-loader"> </i>
            }

          </div>
        </div>
    );
  }
}

GlobalStatistic.propTypes = {
  userPseudo: PropTypes.string.isRequired,
};

export default GlobalStatistic;
