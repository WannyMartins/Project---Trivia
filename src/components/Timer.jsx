import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Timer extends Component {
  constructor() {
    super();

    this.state = {
      timer: 30,
    };
  }

  componentDidMount() {
    this.timerQuestion();
  }

  componentDidUpdate(_prevProps, prevState) {
    const { timer } = this.state;
    if (timer !== prevState.timer) {
      this.timerQuestion();
    }
  }

  timerQuestion = () => {
    const { timer } = this.state;
    const { disableButtons } = this.props;
    const oneSecond = 1000;
    const timeOut = setTimeout(() => {
      this.setState({
        timer: timer - 1,
      });
    }, oneSecond);
    if (timer === 0 && document.querySelector('.correct-answer') !== null) {
      disableButtons();
      const correctButton = document.querySelector('.green-border');
      const wrongButton = document.querySelectorAll('.red-border');
      correctButton.disabled = true;
      wrongButton.forEach((element) => {
        element.disabled = true;
      });
    }
    if (timer === 0) { clearTimeout(timeOut); }
  }

  render() {
    const { timer } = this.state;
    return (
      <div>
        {timer}
      </div>
    );
  }
}

Timer.propTypes = {
  disableButtons: PropTypes.func.isRequired,
};

export default Timer;
