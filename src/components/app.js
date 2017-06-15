import React, { Component } from 'react';
import Header from './header';

export default class App extends Component {
  render() {
    return (
      // this.props.children
      // if App Component ever has any children Route and the user visits a route that matches with path
      // children needs to be responsible for showing those children as well
      <div>
        <Header />
        {this.props.children} 
      </div>
    );
  }
}