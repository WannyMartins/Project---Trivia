import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeButtonNextValue, changeColorButtons, resetPlayer } from '../actions';
import Header from './Header';

class Feedback extends Component {
  resetButtons = () => {
    const { changeValue, nextButtonHide, changeColors, colorAnswerButtons } = this.props;
    changeValue(nextButtonHide);
    changeColors(colorAnswerButtons);
    this.resetProfile();
  }

  resetProfile = () => {
    const { resetInfoPlayer } = this.props;
    const resetObjPlayer = {
      name: '',
      gravatarEmail: '',
      assertions: 0,
      score: 0,
    };

    resetInfoPlayer(resetObjPlayer);
  }

  render() {
    const minScore = 3;
    const { score, assertions } = this.props;
    console.log(assertions);
    return (
      <>
        <Header />
        <p data-testid="feedback-text">
          {
            assertions < minScore ? 'Could be better...' : 'Well Done!'
          }
        </p>
        <p data-testid="feedback-total-score">
          {score}
        </p>
        <p data-testid="feedback-total-question">
          {assertions}
        </p>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.resetButtons }
          >
            Play Again
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </Link>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
  nextButtonHide: state.questions.nextButtonHide,
  colorAnswerButtons: state.questions.colorAnswerButtons,
});

const mapDispatchToProps = (dispatch) => ({
  changeValue: (nextButtonHide) => {
    dispatch(changeButtonNextValue(nextButtonHide));
  },
  changeColors: (colorsButton) => dispatch(changeColorButtons(colorsButton)),
  resetInfoPlayer: (objectReset) => dispatch(resetPlayer(objectReset)),
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  changeValue: PropTypes.func.isRequired,
  nextButtonHide: PropTypes.bool.isRequired,
  changeColors: PropTypes.func.isRequired,
  colorAnswerButtons: PropTypes.bool.isRequired,
  resetInfoPlayer: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
