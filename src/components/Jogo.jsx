import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeButtonNextValue, changeColorButtons, countAssertions, countScore, tokenRequestAPI } from '../actions';
import Header from './Header';
import './Jogo.css';
import Timer from './Timer';

const magic = 0.5;

class Jogo extends Component {
  constructor() {
    super();

    this.state = {
      index: 0,
      assertion: 0,
      funcScore: 0,
    };
  }

  renderQuestion = () => {
    const { results, nextButtonHide, colorAnswerButtons } = this.props;
    const { index } = this.state;
    const correctAnswer = results[index].correct_answer;
    const incorrectAnswers = (results[index].incorrect_answers);
    const allAnswers = incorrectAnswers.concat(results[index].correct_answer);
    allAnswers.sort(() => Math.random() - magic);
    return (
      <div>
        <h1 data-testid="question-category">{results[index].category}</h1>
        <h3 data-testid="question-text">
          {results[index].question
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, '\'')}
        </h3>
        <div data-testid="answer-options" className="answer-options">
          {
            allAnswers.map((answer, position) => (
              correctAnswer === answer
                ? (
                  <button
                    type="button"
                    key={ position }
                    name="correct"
                    data-testid="correct-answer"
                    className={ colorAnswerButtons ? 'green-border' : '' }
                    disabled={ colorAnswerButtons }
                    onClick={ this.selectAnswer }
                  >
                    {
                      answer
                        .replace(/&amp;/g, '&')
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>')
                        .replace(/&quot;/g, '"')
                        .replace(/&#039;/g, '\'')
                    }
                  </button>)
                : (
                  <button
                    type="button"
                    key={ position }
                    data-testid={ `wrong-answer-${position}` }
                    className={ colorAnswerButtons ? 'red-border' : '' }
                    disabled={ colorAnswerButtons }
                    onClick={ this.selectAnswer }
                  >
                    {answer
                      .replace(/&amp;/g, '&')
                      .replace(/&lt;/g, '<')
                      .replace(/&gt;/g, '>')
                      .replace(/&quot;/g, '"')
                      .replace(/&#039;/g, '\'')}
                  </button>)
            ))
          }
        </div>
        <button
          type="button"
          className={ nextButtonHide ? 'btn-next-hide' : 'btn-next' }
          data-testid="btn-next"
          onClick={ this.nextQuestion }
        >
          NEXT
        </button>
      </div>

    );
  }

  nextQuestion = () => {
    const { results,
      changeValue,
      nextButtonHide,
      changeColors,
      colorAnswerButtons } = this.props;
    const { index } = this.state;
    if (results.length - 1 !== index
      && this.setState((previousValue) => (
        { index: previousValue.index + 1 }))); // Função conjunta para aumentar o valor do ID // e não passa da ultima posição
    changeValue(nextButtonHide);
    changeColors(colorAnswerButtons);
  };

  selectAnswer = (event) => {
    // console.log(event.target.name);
    const timer = 30;
    const oneAssert = 10;
    const easy = 1;
    const medium = 2;
    const hard = 3;
    const { assertion, funcScore, index } = this.state;
    const {
      results,
      scoreCount, assert,
      changeValue, nextButtonHide,
      changeColors, colorAnswerButtons,

    } = this.props;
    changeValue(nextButtonHide);
    changeColors(colorAnswerButtons);
    if (event.target.name === 'correct') {
      this.setState((prev) => ({ assertion: prev.assertion + 1 }));
      if (results[index].difficulty === 'easy') {
        this.setState((prevScore) => (
          { funcScore: prevScore.funcScore + (oneAssert + (timer * easy)) }
        ));
      } if (results[index].difficulty === 'medium') {
        this.setState((prevScore) => (
          { funcScore: prevScore.funcScore + (oneAssert + (timer * medium)) }
        ));
      } if (results[index].difficulty === 'hard') {
        this.setState((prevScore) => (
          { funcScore: prevScore.funcScore + (oneAssert + (timer * hard)) }
        ));
      }
    }
    assert(assertion);
    scoreCount(funcScore);
  }

  render() {
    const { results, assertions, score } = this.props;
    return (
      <>
        <Header />
        <Timer disableButtons={ this.selectAnswer } />
        <p>
          Acertos:
          {' '}
          { assertions }
        </p>
        <p>
          Score:
          {' '}
          { score }
        </p>
        {results !== undefined && this.renderQuestion()}
      </>
    );
  }
}
Jogo.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  changeValue: PropTypes.func.isRequired,
  nextButtonHide: PropTypes.bool.isRequired,
  changeColors: PropTypes.func.isRequired,
  colorAnswerButtons: PropTypes.bool.isRequired,
  assert: PropTypes.func.isRequired,
  scoreCount: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  token: state.token,
  results: state.questions.results.results,
  nextButtonHide: state.questions.nextButtonHide,
  colorAnswerButtons: state.questions.colorAnswerButtons,
  assertions: state.player.assertions,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  requestToken: () => dispatch(tokenRequestAPI()),
  changeValue: (nextButtonHide) => {
    dispatch(changeButtonNextValue(nextButtonHide));
  },
  changeColors: (colorsButton) => dispatch(changeColorButtons(colorsButton)),
  assert: (assertion) => dispatch(countAssertions(assertion)),
  scoreCount: (score) => dispatch(countScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);
