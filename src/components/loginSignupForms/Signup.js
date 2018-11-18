import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Label } from 'semantic-ui-react';

const API_URL = "https://penxy-mock-api.herokuapp.com/signup";


class Signup extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    formValid: true,
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
    if (formValid) {
      let fetchData = {
          method: 'POST',
          body: JSON.stringify({
            name,
            email,
            password
          }),
          headers: {
            'Authorization': 'Bearer random_string',
            'Accept': 'application/json',
          }
      }
    fetch('https://api.stackexchange.com/2.2/search?pagesize=10&order=desc&sort=votes&intitle=js&site=stackoverflow').then(res => console.log(res));
    //working
    fetch(API_URL, fetchData).then((res) => console.log(res));
    //not working
  }
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    let removeError = `${name}Valid`;
    console.log(removeError);
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

export default connect()(Signup);
