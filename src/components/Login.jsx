import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { tokenRequestAPI } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
  }

  inputLogin = () => {
    const { token } = this.props;
    const { email, name } = this.state;
    return (
      <form>
        <label id="email" htmlFor="email">
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
        <button
          data-testid="btn-play"
          type="button"
          disabled={ this.validateEmail() }
          onClick={ token }
        >
          Play
        </button>
        <Link to="/configuracoes">
          <button
            data-testid="btn-settings"
            type="button"
          // disabled={ this.validateEmail() }
          // onClick={ token }
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
        <p>Oi</p>
        { this.inputLogin() }
        <p>Inicio</p>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({ // dispatch do User
  token: () => dispatch(tokenRequestAPI()),
});
Login.propTypes = {
  token: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
