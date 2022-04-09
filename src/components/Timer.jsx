import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeButtonNextValue, changeColorButtons, countTimer } from '../actions';

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
    const {
      changeValue, changeColors, nextButtonHide, colorAnswerButtons,
    } = this.props;
    const oneSecond = 1000;
    const timeOut = setTimeout(() => {
      this.setState({
        timer: timer - 1,
      });
      // console.log(timer);
    }, oneSecond);
    // timerSet(timer);
    if (timer === 0) {
      console.log(timer);
      changeValue(nextButtonHide);
      changeColors(colorAnswerButtons);
      clearTimeout(timeOut);
    }
    const clearTimer = (time) => {
      clearTimeout(time);
    };
  }

  render() {
    const { timer } = this.state;

    return (
      <div>
        { timer }
        {/* {this.timerQuestion()} */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // timer: state.questions.t
  nextButtonHide: state.questions.nextButtonHide,
  colorAnswerButtons: state.questions.colorAnswerButtons,
});

const mapDispatchToProps = (dispatch) => ({
  changeValue: (nextButtonHide) => {
    dispatch(changeButtonNextValue(nextButtonHide));
  },
  changeColors: (colorsButton) => dispatch(changeColorButtons(colorsButton)),
  timerSet: (sec) => dispatch(countTimer(sec)),
});

Timer.propTypes = {
  changeValue: PropTypes.func.isRequired,
  nextButtonHide: PropTypes.bool.isRequired,
  changeColors: PropTypes.func.isRequired,
  colorAnswerButtons: PropTypes.bool.isRequired,
  // timerSet: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
