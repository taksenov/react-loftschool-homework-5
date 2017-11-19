import React, {Component} from 'react';
import './App.css';
import {addListener, removeListener, isAuthorized} from './AuthorizeApi';

class App extends Component {
  state = {
    isAuthorized
  };

  componentDidMount() {
    addListener(this.handleAuthorize);
  }

  componentWillUnmount() {
    removeListener(this.handleAuthorize);
  }

  handleAuthorize = isAuthorized => {
    this.setState({isAuthorized});
  };

  render() {
    return null;
  }
}

export default App;
