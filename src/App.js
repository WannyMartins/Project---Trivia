import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Configuracoes from './components/Configuracoes';
import Feedback from './components/Feedback';
import Jogo from './components/Jogo';
import Login from './components/Login';
import Ranking from './components/Ranking';
import logo from './trivia.png';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
      </header>
      <main className="App-main">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/jogo" component={ Jogo } />
          <Route exact path="/configuracoes" component={ Configuracoes } />
          <Route exact path="/ranking" component={ Ranking } />
          <Route exact path="/feedback" component={ Feedback } />
        </Switch>
      </main>
    </div>
  );
}
