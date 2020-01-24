import React from 'react';
import '../../../assets/Sass/Timer.scss';
import PropTypes from 'prop-types';

const Timer = ({timer, spentTime, shouldStop, ...props}) => {
  const displayNumber = number => number > 9 ? `${number}` : `0${number}`;

  const displayTimer = () => {
    const leftTimer = timer > spentTime ? timer - spentTime : 0;

    if(leftTimer > 60) {
      return `${displayNumber(~~(leftTimer / 60))}:${displayNumber(leftTimer % 60)}`;
    }
    return `${displayNumber(leftTimer)}s`;
  }
  let style = null;

  if(shouldStop) {
    style = {
      width: `${~~((spentTime / timer) * 100)}%`,
      animation: 'unset',
    };
  }
  else {
    style = {
      // width: `${~~((this.state.currentTimer / this.state.timer) * 100)}%`,
      animation: `${timer}s linear 0s 1 normal none running timer`,
    };
  }

  return (
      <div className="Timer">
        <div
            className={spentTime === timer ? "Progress Finished" : "Progress"}
            style={style}>
        </div>
        <strong>{ displayTimer() }</strong>
      </div>
  );

}

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
  shouldStop: PropTypes.bool.isRequired,
  spentTime: PropTypes.number.isRequired
};

export default Timer;


/*
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: props.timer > MAX_TIMER ? MAX_TIMER : props.timer,
      currentTimer: 0
    }
  }

  updateTimer() {
    if(this.props.stopCounting) clearInterval(this.timerID);
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
*/
