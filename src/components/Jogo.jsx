import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  changeButtonNextValue,
  changeColorButtons, countAssertions, countScore, tokenRequestAPI,
} from '../actions';
import Header from './Header';
import './Jogo-Style.css';

const randomizeButton = 0.5;
const questionsNumber = 4;

class Jogo extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      assertion: 0,
      funcScore: 0,
      timer: 30,
      click: 0, // Estado de clique para saber se algo foi clicado, utilizado no timer e no botão.
    };
  }

  componentDidMount() {
    this.timerQuestion(); // Invoca a função no DidMount para atualizar
  }

  componentDidUpdate(_prevProps, prevState) {
    const { timer } = this.state;
    if (timer !== prevState.timer) { this.timerQuestion(); }
  }

  renderQuestion = () => {
    const { results, nextButtonHide, colorAnswerButtons } = this.props;
    const { index } = this.state;
    const correctAnswer = results[index].correct_answer;
    const incorrectAnswers = (results[index].incorrect_answers);
    const allAnswers = incorrectAnswers.concat(results[index].correct_answer);
    allAnswers.sort(() => Math.random() - randomizeButton);
    return (
      <div className="Game-Board glass">
        <h1 data-testid="question-category">{results[index].category}</h1>
        <h3 data-testid="question-text">
          {results[index].question
            .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
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
                    className={ colorAnswerButtons ? 'green-border' : 'test' }
                    disabled={ colorAnswerButtons }
                    onClick={ this.selectAnswer }
                  >
                    <span>
                      {
                        answer
                          .replace(/&amp;/g, '&').replace(/&lt;/g, '<')
                          .replace(/&gt;/g, '>').replace(/&quot;/g, '"')
                          .replace(/&#039;/g, '\'')
                      }
                    </span>
                  </button>)
                : (
                  <button
                    type="button"
                    name="incorrect"
                    key={ position }
                    data-testid={ `wrong-answer-${position}` }
                    className={ colorAnswerButtons ? 'red-border' : 'test' }
                    disabled={ colorAnswerButtons }
                    onClick={ this.selectAnswer }
                  >
                    <span>
                      {answer
                        .replace(/&amp;/g, '&').replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>').replace(/&quot;/g, '"')
                        .replace(/&#039;/g, '\'')}
                    </span>
                  </button>)
            ))
          }
        </div>
        { index !== questionsNumber ? (
          <button
            type="button"
            className={ nextButtonHide ? 'btn-next-hide' : 'btn-next' }
            data-testid="btn-next"
            onClick={ this.nextQuestion }
          >
            <span>
              NEXT
            </span>
          </button>)
          : (
            <Link to="/feedback">
              <button
                type="button"
                className={ nextButtonHide ? 'btn-next-hide' : 'btn-next' }
                data-testid="btn-next"
                onClick={ this.nextQuestion }
              >
                <span>
                  NEXT
                </span>
              </button>
            </Link>)}
      </div>
    );
  }

  nextQuestion = () => {
    const { results, changeValue, nextButtonHide, changeColors, colorAnswerButtons,
    } = this.props; const { index } = this.state;
    if (results.length - 1 !== index && this.setState((previousValue) => (
      { index: previousValue.index + 1, timer: 30, click: 0 }))); // Função conjunta para aumentar o valor do ID // e não passa da ultima posição
    changeValue(nextButtonHide); changeColors(colorAnswerButtons);
  };

  selectAnswer = (event) => {
    const oneAssert = 10; const medium = 2; const hard = 3;
    const { index, timer, assertion } = this.state;
    const { results, changeValue, nextButtonHide, changeColors, colorAnswerButtons,
      scoreCount, assert,
    } = this.props;
    let scoreTeste = 0;
    if (event.target.name === 'correct') { // Caso o name do input seja 'correct' entrará nas validações a seguir
      this.setState((prev) => ({ assertion: prev.assertion + 1 })); // Soma as quantidades de acertos
      if (results[index].difficulty === 'easy') { // Caso o nível de dificuldade da questão seja easy, realiza o calculo
        scoreTeste = scoreTeste + oneAssert + timer;
        scoreCount(scoreTeste); assert(assertion);
      } if (results[index].difficulty === 'medium') { // Caso o nível de dificuldade da questão seja medium, realiza o calculo
        scoreTeste = scoreTeste + oneAssert + (timer * medium);
        scoreCount(scoreTeste); assert(assertion);
      } if (results[index].difficulty === 'hard') { // Caso o nível de dificuldade da questão seja hard, realiza o calculo
        scoreTeste = scoreTeste + oneAssert + (timer * hard);
        scoreCount(scoreTeste); assert(assertion);
      }
    }
    changeValue(nextButtonHide);
    changeColors(colorAnswerButtons);

    if (event.target.name === 'correct' || event.target.name === 'incorrect') { // Função para saber se algum dos botões foi clicado
      this.setState({ click: 1 }); // Caso clicado, altera o valor do click para 1, valor será utilizado posteriormente no timerQuestion.
    }
  }

  timerQuestion = () => {
    const { assertion, funcScore, timer, click } = this.state;
    const { changeValue, changeColors, nextButtonHide, colorAnswerButtons,
      scoreCount, assert } = this.props;
    const oneSecond = 1000;
    const timeOut = setTimeout(() => {
      if (click === 0) {
        if (timer === true) { // Após ter o valor do clique alterado para um, ele entrará nessa condição.
          changeValue(nextButtonHide);
          changeColors(colorAnswerButtons);
          clearTimeout(timeOut);
        }
        this.setState({ timer: timer - 1 || timer >= 0 });
      } // Caso o clique tenha valor 0, ele continua no loop
    }, oneSecond);
    assert(assertion); scoreCount(funcScore); // A cada segundo ele atualiza o estado global do redux de score e acertos.
  }

  render() {
    const { timer } = this.state;
    const { results } = this.props;
    return (
      <>
        <Header />
        <p className="timer glass">
          Timer:
          {timer}
          {' '}
        </p>
        {results !== undefined && this.renderQuestion()}
      </>
    );
  }
}
Jogo.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  // assertions: PropTypes.number.isRequired,
  // score: PropTypes.number.isRequired,
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
  timer: state.questions.timer,
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
