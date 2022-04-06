import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';

class Jogo extends Component {
  renderQuestion = () => {
    const { results } = this.props;
    console.log(results);
    return (
      results.map((element, index) => (
        <div key={ index }>
          {/* { console.log(element) } */}
          <p data-testid="question-category">{element.category}</p>

          <p data-testid="question-text">{element.question}</p>
          <button
            type="button"
            data-testid="correct-answer"
          >
            {element.correct_answer}
          </button>
          {
            element.incorrect_answers.map((incorrect, position) => (
              <button
                type="button"
                key={ position }
                data-testid={ `wrong-answer-${position}` }
              >
                {incorrect}
              </button>
            ))
          }
        </div>))
    );
  }

  render() {
    const { results } = this.props;
    console.log(results);
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

// const mapDispatchToProps = (dispatch) => ({
//   // requestToken: () => dispatch(tokenRequestAPI()),
// });

export default connect(mapStateToProps, null)(Jogo);
