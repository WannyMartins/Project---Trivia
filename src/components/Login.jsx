import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUser, tokenRequestAPI } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
  }

  inputLogin = () => {
    const { token, userName } = this.props;
    const { email, name } = this.state;
    return (
      <form>
        <label id="email" htmlFor="email">
          Email
          <input
            data-testid="input-gravatar-email"
            type="text"
            id="email"
            name="email"
            value={ email }
            onChange={ this.handleInfo }
            required
          />
        </label>
        <label id="name" htmlFor="name">
          Nome
          <input
            data-testid="input-player-name"
            type="text"
            id="name"
            name="name"
            value={ name }
            onChange={ this.handleInfo }
            required
          />
        </label>
        <Link to="/jogo">
          <button
            data-testid="btn-play"
            type="button"
            disabled={ this.validateEmail() }
            onClick={ () => {
              token();
              userName(name, email);
            } }
          >
            Play
          </button>
        </Link>
        <Link to="/configuracoes">
          <button
            data-testid="btn-settings"
            type="button"
          >
            Configurações
          </button>
        </Link>

      </form>
    );
  };

  handleInfo = ({ target }) => {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
    );
  }

  // Fonte do regex https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/

  validateEmail() {
    const { email, name } = this.state;
    // const valueComparationPassword = 6;
    const re = /\S+@\S+\.\S+/;
    if (re.test(email) && name !== '') {
      return false;
    }
    return true;
  }

  render() {
    return (
      <>
        { this.inputLogin() }
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({ // dispatch do User
  token: () => dispatch(tokenRequestAPI()),
  userName: (nameUser, email) => dispatch(setUser(nameUser, email)),

});
Login.propTypes = {
  token: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
