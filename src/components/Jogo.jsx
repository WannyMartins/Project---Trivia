import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tokenRequestAPI } from '../actions';
import Header from './Header';

class Jogo extends Component {
  constructor() {
    super();

    this.state = {
      index: 0,
    };
  }

  renderQuestion = () => {
    const { results } = this.props;
    const { index } = this.state;
    const testando = document.querySelectorAll('.buttons');
    console.log(testando);
    return (
      <div>
        <h1 data-testid="question-category">{results[index].category}</h1>
        <h3 data-testid="question-text">{results[index].question}</h3>
        {
          results[index].incorrect_answers.map((incorrect, position) => (
            <button
              type="button"
              key={ position }
              data-testid={ `wrong-answer-${position}` }
              onClick={ console.log('ERRADA') }
              className="buttons"
            >
              {incorrect}
            </button>
          ))
        }
        <button
          type="button"
          data-testid="correct-answer"
          className="buttons"
        >
          {results[index].correct_answer}
        </button>
        <button
          type="button"
          data-testid="next-button"
          onClick={ this.test }
        >
          NEXT
        </button>
      </div>
    );
  }

  test = () => {
    const { index } = this.state;
    this.setState((previousValue) => ({ index: previousValue.index + 1 })); // Função conjunta para aumentar o valor do ID
    console.log(index);
  }

  render() {
    const { results } = this.props;
    // console.log(results);
    return (
      <>
        <Header />
        { results !== undefined && this.renderQuestion() }
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
