import React, {Component} from 'react';
import '../../../assets/Sass/Timer.scss';
import PropTypes from 'prop-types';
import { MAX_TIMER} from "../../../Settings/config";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: props.timer > MAX_TIMER ? MAX_TIMER : props.timer,
      currentTimer: 0
    }
  }

  updateTimer() {
    if(this.state.currentTimer < this.state.timer) {
      this.setState((prevState, props) => {
        return {
          currentTimer: prevState.currentTimer + 1
        }
      }, () => this.props.updateLeftTimer(this.state.currentTimer))
    } else {
      clearInterval(this.timerID);
    }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.updateTimer(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  static displayNumber(number) {
    return number > 9 ? `${number}` : `0${number}`;
  }

  displayTimer() {
    const timer = this.state.timer - this.state.currentTimer;
    if(timer > 60) {
      return `${Timer.displayNumber(~~(timer / 60))}:${Timer.displayNumber(timer % 60)}`;
    }
    return `${Timer.displayNumber(timer)}s`;
  }

  render() {
    const style = {
      // width: `${~~((this.state.currentTimer / this.state.timer) * 100)}%`,
      animation: this.state.timer +"s linear 0s 1 normal none running timer",
    };

    return (
      <div className="Timer">
        <div
            className={this.state.currentTimer === this.state.timer ? "Progress Finished" : "Progress"}
            style={style}>
        </div>
        <strong>{ this.displayTimer() }</strong>
      </div>
    );
  }
}

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
  updateLeftTimer: PropTypes.func.isRequired,
};

export default Timer;
