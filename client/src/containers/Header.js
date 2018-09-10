import React, { Component } from 'react';

import logo from './logo.svg';

class Header extends Component {
  render() {
    return (
      <div className="Center">
        <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to HomeDB</h2>
        </div>
      </div>
    );
  }
}

export default Header;
