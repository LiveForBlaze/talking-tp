import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './loginSignupForms/Login';
import Signup from './loginSignupForms/Signup';
import { mapStateToProps } from '../helpers/mapStateToProps';

class Home extends Component {
  render() {
    const { showModal, modalName } = this.props.app;
    return (
      <main className="main">
        This is the main part text. Some logo, some text, etc.
        { showModal &&
          <div id="modal" className="modal">
            {
              (modalName === 'login') ? <Login /> : <Signup />
            }
          </div>
        }
      </main>
    )
  }
}

export default connect(mapStateToProps)(Home);
