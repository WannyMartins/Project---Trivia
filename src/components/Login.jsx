import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { questionRequestAPI, setUser, tokenRequestAPI } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      redirect: false,
    };
  }

  componentDidMount() {
    const { tokenDispatch } = this.props;
    tokenDispatch();
  }

  inputLogin = () => {
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
        <button
          data-testid="btn-play"
          type="button"
          disabled={ this.validateEmail() }
          onClick={ this.redirectPage }
        >
          Play
        </button>
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

  redirectPage = async () => {
    const { token, userName, requestQuestion } = this.props;
    const { name, email } = this.state;

    const tokenState = await requestQuestion(token);
    userName(name, email);

    if (tokenState.results.length > 0) {
      this.setState({ redirect: true });
    }
  }

  // Fonte do regex https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/

  validateEmail() {
    const { email, name } = this.state;
    const re = /\S+@\S+\.\S+/;
    if (re.test(email) && name !== '') {
      return false;
    }
    return true;
  }

  render() {
    const { redirect } = this.state;
    return (
      redirect ? <Redirect to="/jogo" /> : this.inputLogin()
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  results: state.questions.results,
});

const mapDispatchToProps = (dispatch) => ({ // dispatch do User
  tokenDispatch: () => dispatch(tokenRequestAPI()),
  userName: (nameUser, email) => dispatch(setUser(nameUser, email)),
  requestQuestion: (token) => dispatch(questionRequestAPI(token)),
});

Login.propTypes = {
  token: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
