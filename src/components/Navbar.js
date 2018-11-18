import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link  } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { toggleModal, signOut } from '../actions/index';
import { mapStateToProps } from '../helpers/mapStateToProps';
import { withRouter } from 'react-router';

class Navbar extends Component {
  toggleModal = (e) => {
    const { app, toggleModal, signOut } = this.props;
    (!app.logged) ? toggleModal(e.target.name) :
      (e.target.name === "signup") ? signOut() : this.props.history.push('/profile');
  }
  checkNameLength = (name) => {
    if (name && name.length > 20) {
      return `${name.substring(0,20)} ...`;
    }
    return name;
  }
  render() {
    const { userName, logged } = this.props.app;
    return (
      <div className="navbar">
        <div><h3><Link to="/">Logo</Link></h3></div>
        <div>
          <Button className="login" onClick={this.toggleModal} name="login">{!logged ? 'Log In' : this.checkNameLength(userName)}</Button>
          <Button className="signup" onClick={this.toggleModal} name="signup">{!logged ? 'Sign Up' : 'Log Out'}</Button>
        </div>
      </div>
    )
  }
}

function  mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleModal: toggleModal,
    signOut: signOut
  }, dispatch)
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
