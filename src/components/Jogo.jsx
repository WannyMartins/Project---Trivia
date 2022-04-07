import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tokenRequestAPI } from '../actions';
import Header from './Header';

const magic = 0.5;

class Jogo extends Component {
  constructor() {
    super();

    this.state = {
      index: 0,
      disableButton: false,
    };
  }

  renderQuestion = () => {
    const { results } = this.props;
    const { index, disableButton } = this.state;
    const correctAnswer = results[index].correct_answer;
    const incorrectAnswers = (results[index].incorrect_answers);
    const allAnswers = incorrectAnswers.concat(results[index].correct_answer);
    allAnswers.sort(() => Math.random() - magic);
    console.log(allAnswers);
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
        <div data-testid="answer-options">
          {
            allAnswers.map((answer, position) => (
              correctAnswer.includes(answer)
                ? (
                  <button
                    type="button"
                    key={ position }
                    data-testid="correct-answer"
                    className="green-border"
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
                    className="red-border"
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
          data-testid="next-button"
          disabled={ disableButton }
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
    if (index === numberQuestion) { this.setState({ disableButton: true }); }
    console.log(index);
  };

  render() {
    const { results } = this.props;
    // console.log(results);
    return (
      <>
        <Header />
        {results !== undefined && this.renderQuestion()}
      </>
    );
  }
}
Jogo.propTypes = {
  // token: PropTypes.string.isRequired,
  // requestQuestion: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};
const mapStateToProps = (state) => ({
  token: state.token,
  results: state.questions.results,
});

const mapDispatchToProps = (dispatch) => ({
  requestToken: () => dispatch(tokenRequestAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);
