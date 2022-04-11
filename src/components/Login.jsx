import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { questionRequestAPI, setUser, tokenRequestAPI } from '../actions';
import './Login-Style.css';

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
      <section className="card">
        <form className="card__content">
          <section className="Input-Login">
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
          </section>
          <section className="Input-Login">
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
          </section>
          <div className="buttons-login">
            <button
              className="button-login"
              data-testid="btn-play"
              type="button"
              disabled={ this.validateEmail() }
              onClick={ this.redirectPage }
            >
              Play
            </button>
            <Link to="/configuracoes">
              <button
                className="button-login"
                data-testid="btn-settings"
                type="button"
              >
                Configurações
              </button>
            </Link>
          </div>
        </form>
      </section>
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
