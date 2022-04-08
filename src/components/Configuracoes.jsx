import React from 'react';
import { Link } from 'react-router-dom';

class Configuracoes extends React.Component {
  render() {
    return (
      <header>
        <h1 data-testid="settings-title">Configurações</h1>
        <Link to="/">
          <button
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
