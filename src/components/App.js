import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Navbar from './Navbar';
import Home from './Home';
import Profile from './Profile';
import './App.css';

import { toggleModal } from '../actions/index';

class App extends Component {
  componentDidMount() {
    const content = this;
    window.onclick = function(event) {
      if (event.target === document.getElementById('modal')) {
          content.props.toggleModal();
      }
    }
  }
  render(){
    return (
      <div className="container">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    app: state.appState
  };
};

function  mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleModal: toggleModal,
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
