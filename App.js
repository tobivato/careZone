/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import Routes from './src/Routes';
import firebaseAuth from './src/firebase';

export default class App extends Component {
  constructor(props) {
    super(props);
    firebaseAuth.init();
  }

  render() {
    console.disableYellowBox = true;
    return (
      <Routes />
    );
  }
}
