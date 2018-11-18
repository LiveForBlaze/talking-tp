import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';

import { mapStateToProps } from '../../helpers/mapStateToProps';
import { signupUser, toggleModal } from '../../actions/index';
import { API_URL } from '../../constants';

class Login extends Component {
  state = {
    email: '',
    password: ''
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }
  handleLogin = () => {
    const { email, password } = this.state;
    let fetchData = {
      method: 'POST',
      body: new URLSearchParams(`email=${email}&password=${password}`),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      }
    }
    fetch(`${API_URL}/token`, fetchData).then((resp) => resp.json()).then(user => {
      user.name && this.props.signupUser(user);
      this.props.toggleModal();
    })
  }
  render(){
    return (
      <div className="form-modal">
        <h3>Login</h3>
        <Form>
          <Form.Field>
            <input name="email" placeholder='Email' className="input"  onChange={this.handleChange}/>
          </Form.Field>
          <Form.Field>
            <input name="password" type="password" placeholder='Password' onChange={this.handleChange}/>
          </Form.Field>
          <Form.Field inline>
            Support: some email
          </Form.Field>
          <Form.Field inline>
            <Button className="signup" onClick={this.handleLogin}>
              Log In
            </Button>
          </Form.Field>
        </Form>
      </div>
    )
  }
}

function  mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signupUser: signupUser,
    toggleModal: toggleModal,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
