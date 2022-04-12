import React from 'react';
import { Link } from 'react-router-dom';
import './Feedback-Style.css';

class Configuracoes extends React.Component {
  render() {
    return (
      <header className="board-feedback">
        <h1 data-testid="settings-title">Configurações</h1>
        <Link to="/">
          <button
            className="buttons-feedback"
            type="button"
          >
            Inicio
          </button>
        </Link>
      </header>
    );
  }
}

export default Configuracoes;
