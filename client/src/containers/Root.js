import React, { Component } from 'react';

import Header from './Header';
import Footer from './Footer';

class Root extends Component {
  render() {
    return (
      <div>
        <div className="Site-content">
          <Header />
          <div className="App">
            {this.props.children}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Root;
