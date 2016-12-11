import React, { Component } from 'react';
import Header from './components/Header';
import Feed from './components/Feed';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app-l">
        <Header />
        <Feed />
      </div>
    );
  }
}

export default App;
