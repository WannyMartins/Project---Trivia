import React from 'react';
import { Link } from 'react-router-dom';

class Feedback extends React.Component {
  render() {
    return (
      <header>
        <h1 data-testid="feedback-text">Feedback</h1>
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

export default Feedback;