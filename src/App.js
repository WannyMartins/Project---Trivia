import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Configuracoes from './components/Configuracoes';
import Login from './components/Login';
import logo from './trivia.png';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/configuracoes" component={ Configuracoes } />

        </Switch>
      </header>
    </div>
  );
}
