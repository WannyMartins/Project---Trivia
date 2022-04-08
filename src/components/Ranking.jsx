import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const { name, email, score } = this.props;
    // remover esse index depois
    const index = 0;
    const userEmailHash = md5(email).toString();
    return (
      <div>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Home
          </button>
        </Link>
        {
        // englobar em uma lista todos os elementos abaixo para puxar do localStorage
        }
        <img
          src={ `https://www.gravatar.com/avatar/${userEmailHash}` }
          alt={ `Imagem do usuário ${name}` }
          data-testid="header-profile-picture"
        />
        <p data-testid={ `player-name-${index}` }>{name}</p>
        <p data-testid={ `player-score-${index}` }>{score}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

Ranking.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Ranking);
