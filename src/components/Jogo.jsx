import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tokenRequestAPI } from '../actions';
import Header from './Header';
import './Jogo.css';
import Timer from './Timer';

const magic = 0.5;

class Jogo extends Component {
  constructor() {
    super();

    this.state = {
      index: 0,
    };
  }

  renderQuestion = () => {
    const { results } = this.props;
    const { index, nextButtonHide, disableNextButton, disableAnswerButton } = this.state;
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
                    data-testid="correct-answer"
                    className={ disableAnswerButton ? 'green-border' : '' }
                    disabled={ disableAnswerButton }
                    onClick={ () => this.selectAnswer() }
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
                    className="wrong-answer"
                    disabled={ disableAnswerButton ? 'red-border' : '' }
                    onClick={ () => this.selectAnswer() }
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
          disabled={ disableNextButton }
          onClick={ this.nextQuestion }
        >
          NEXT
        </button>
      </div>

    );
  }

  nextQuestion = () => {
    const { results } = this.props;
    const { index } = this.state;
    const numberQuestion = 3;
    if (results.length - 1 !== index
      && this.setState((previousValue) => ({ index: previousValue.index + 1 }))); // Função conjunta para aumentar o valor do ID // e não passa da ultima posição
    if (index === numberQuestion) { this.setState({ disableNextButton: true }); }
  };

  selectAnswer = () => {
    // const correctButton = document.querySelector('.correct-answer');
    // const wrongButton = document.querySelectorAll('.wrong-answer');
    // wrongButton.forEach((element) => {
    //   element.className = 'red-border';
    // });
    // correctButton.className = 'green-border';
    this.setState({
      disableAnswerButton: true,
      nextButtonHide: false,
    });
  }

  render() {
    const { results } = this.props;
    return (
      <>
        <Header />
        <Timer disableButtons={ this.selectAnswer } />
        {results !== undefined && this.renderQuestion()}
      </>
    );
  }
}
Jogo.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};
const mapStateToProps = (state) => ({
  token: state.token,
  results: state.questions.results.results,
});

const mapDispatchToProps = (dispatch) => ({
  requestToken: () => dispatch(tokenRequestAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);
