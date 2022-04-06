import React, { Component } from 'react';
import { connect } from 'react-redux';
import { questionRequestAPI, tokenRequestAPI } from '../actions';
// import { questionAPI } from '../actions/API';
import Header from './Header';

class Jogo extends Component {
  constructor() {
    super();

    this.state = {
      results: [],
    };
  }

  componentDidMount = () => {
    const { token, requestQuestion } = this.props;

    const questionAPI = async (toke) => {
      const request = await fetch(`https://opentdb.com/api.php?amount=5&${toke}`);
      const response = await request.json();
      console.log(response);
      return response;
    };

    this.setState = ({
      results: questionAPI(token),
    });
  }

  render() {
    const { token, requestQuestion } = this.props;
    const { results } = this.state;
    return (
      <>
        {results.map((element, index) => (
          <div key={ index }>
            <p data-testid="question-category">{element.category}</p>

            <p data-testid="question-text">{element.question}</p>
            <button
              type="button"
              data-testid="correct-answer"
            >
              {element.correct_answer}

            </button>
            <button
              type="button"
              data-testid={ `wrong-answer-${index}` }
            >
              {element.incorrect_answers[0]}

            </button>
          </div>))}
        {/* <button
          data-testid="btn-settings"
          type="button"
          onClick={ questionAPI(token) }
        >
          teste
        </button>
 */}
        <Header />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  requestQuestion: (token) => dispatch(questionRequestAPI(token)),
  requestToken: () => dispatch(tokenRequestAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);
