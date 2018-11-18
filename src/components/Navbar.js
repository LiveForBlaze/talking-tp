import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect  } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { toggleModal, signOut } from '../actions/index';
import { mapStateToProps } from '../helpers/mapStateToProps';

class Navbar extends Component {
  state = {
    re: false,
  }
  toggleModal = (e) => {
    const { app, toggleModal, signOut } = this.props;
    (!app.logged) ? toggleModal(e.target.name) :
      (e.target.name === "signup") ? signOut() : this.setState({re:true});
  }
  checkNameLength = (name) => {
    if (name.length > 20) {
      return `${name.substring(0,20)} ...`;
    }
    return name;
  }
  render() {
    const { app } = this.props;
    const { re } = this.state;
    return (
      <div className="navbar">
        <div><h3>Logo</h3></div>
        {re && <Redirect to="/profile" />}
        <div>
          <Button className="login" onClick={this.toggleModal} name="login">{!app.logged ? 'Log In' : this.checkNameLength(app.name)}</Button>
          <Button className="signup" onClick={this.toggleModal} name="signup">{!app.logged ? 'Sign Up' : 'Log Out'}</Button>
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


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
