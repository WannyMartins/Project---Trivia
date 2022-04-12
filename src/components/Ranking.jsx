import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeButtonNextValue, changeColorButtons, resetPlayer } from '../actions';
import charadaAvatar from '../photos/ImagemCortada.jpg';
import './Feedback-Style.css';

class Ranking extends Component {
  constructor() {
    super();

    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    this.saveScore();
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

  resetButtons = () => {
    const { changeValue, nextButtonHide, changeColors, colorAnswerButtons } = this.props;
    changeValue(nextButtonHide);
    changeColors(colorAnswerButtons);
    this.resetProfile();
  }

  saveScore = () => {
    const { name, email, score } = this.props;
    if (localStorage.getItem('ranking') === null) {
      localStorage.setItem('ranking', JSON.stringify([{ score, email, name }]));
    } else {
      const storageLocal = JSON.parse(localStorage.getItem('ranking'));
      storageLocal.forEach((element) => {
        console.log(element);
      });
      const newRanking = storageLocal.concat({ score, email, name });
      localStorage.setItem('ranking', JSON.stringify(newRanking));
    }
    this.sortRanking();
  }

  sortRanking = () => {
    const storageLocal = JSON.parse(localStorage.getItem('ranking'));
    this.setState({
      ranking: storageLocal.sort((first, second) => second.score - first.score),
    });
  }

  render() {
    // const { name, email, score } = this.props;
    const { ranking } = this.state;
    // const userEmailHash = md5(email).toString();
    return (
      <div className="board-ranking">
        <h3 data-testid="ranking-title">
          Ranking
        </h3>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
            className="buttons-feedback marginButton"
            onClick={ this.resetButtons }
          >
            Home
          </button>
        </Link>
        <ul>
          {
            // englobar em uma lista todos os elementos abaixo para puxar do localStorage
            ranking.map((element, index) => (
              <li key={ index }>
                <img
                  // src={ `https://www.gravatar.com/avatar/${md5(element.email).toString()}` }
                  src={ charadaAvatar }
                  alt={ `Imagem do usuário ${element.name}` }
                  data-testid="header-profile-picture"
                  width="100px"
                />
                <p data-testid={ `player-name-${index}` }>{element.name}</p>
                <p data-testid={ `player-score-${index}` }>{element.score}</p>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
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

Ranking.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  resetInfoPlayer: PropTypes.func.isRequired,
  changeValue: PropTypes.func.isRequired,
  nextButtonHide: PropTypes.bool.isRequired,
  changeColors: PropTypes.func.isRequired,
  colorAnswerButtons: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
