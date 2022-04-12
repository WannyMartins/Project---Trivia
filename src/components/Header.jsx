import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import charadaAvatar from '../photos/ImagemCortada.jpg';
import './Header-Style.css';

class Header extends Component {
  render() {
    const { name, email, score } = this.props;
    const userEmailHash = md5(email).toString();
    return (
      <div className="Header-Board glass">
        <img
          className="gravatar-icon"
          src={ `https://www.gravatar.com/avatar/${userEmailHash}` }
          // src={ charadaAvatar }
          alt={ `Imagem do usuário ${name}` }
          data-testid="header-profile-picture"
        />
        <div className="Info-Board">
          <p data-testid="header-player-name">{name}</p>
          <p data-testid="header-score">
            Score:
            {' '}
            {score}
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
