import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Label } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';

import { mapStateToProps } from '../../helpers/mapStateToProps';
import { signupUser, toggleModal } from '../../actions/index';
import { API_URL } from '../../constants';

class Signup extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    formValid: false,
    emailValid: true,
    passwordValid: true,
  }
  formValidation = (email, password) => {
    const { emailValid, passwordValid } = this.state;
    if (email.length === 0) {
      document.getElementById('email').classList.add('error');
      this.setState({emailValid: false});
    }
    if (password.length === 0) {
      document.getElementById('password').classList.add('error');
      this.setState({passwordValid: false});
    }
    (emailValid && passwordValid) ? this.setState({formValid: true}) :  this.setState({formValid: false})
  }
  handleSignup = () => {
    const { name, email, password, formValid } = this.state;
    this.formValidation(email, password);
    console.log(formValid);
    if (formValid) {
      let fetchData = {
        method: 'POST',
        body: new URLSearchParams(`name=${name}&email=${email}&password=${password}`),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        }
      }
      fetch(`${API_URL}/signup`, fetchData)
        .then((resp) => resp.json())
        .then(user => {
          const { signupUser, toggleModal } = this.props;
          signupUser(user);
          toggleModal();
        });
    }
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    let removeError = `${name}Valid`;
    document.getElementById(name).classList.remove('error');
    this.setState({[removeError]: true}, () => console.log(this.state));
  }
  render(){
    const { emailValid, passwordValid } = this.state;
    return (
      <div className="form-modal">
        <h3>Sign Up</h3>
        <Form>
          <Form.Field>
            <input id="name" placeholder='Full name' className="input" name="name" onChange={this.handleChange}/>
          </Form.Field>
          <Form.Field>
            <input id="email" placeholder='* Email' name="email" onChange={this.handleChange}/>
          </Form.Field>
          {!emailValid && <div className="error-label"><Label basic color='red' pointing>Email field can't be empty</Label></div>}
          <Form.Field>
            <input id="password" type="password" placeholder='* Password' name="password" onChange={this.handleChange}/>
          </Form.Field>
          {!passwordValid && <div className="error-label"><Label basic color='red' pointing>Password field can't be empty</Label></div>}
          <Form.Field inline>
            Support: some email
          </Form.Field>
          <Form.Field inline>
            <Button className="signup" onClick={this.handleSignup}>
              Sign Up
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
    toggleModal: toggleModal
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
