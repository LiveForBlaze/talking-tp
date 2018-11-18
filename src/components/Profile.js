import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { mapStateToProps } from '../helpers/mapStateToProps';
import { changeName, signupUser, toggleModal } from '../actions/index';
import { API_URL } from '../constants';

class Profile extends Component {
  state = {
    userName: '',
    password: '',
    passwordCheck: '',
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    }, () => console.log(this.state));
  }
  changeData = (data) => {
    const { userName, password } = data;
    const { passwordCheck } = this.state;
    const { changeName, toggleModal, app } = this.props;
    const newData = userName ? `name=${userName}` : `password=${password}`;
    if (password && password !== passwordCheck ){
      return alert('Пароли не совпадают');
    }
    let fetchData = {
      method: 'PUT',
      body: new URLSearchParams(newData),
      headers: {
        'Authorization': `Bearer ${app.token}`,
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      }
    }
    fetch(`${API_URL}/profile`, fetchData)
      .then((resp) => resp.json())
      .then(user => {
        if (userName) {
          changeName(userName);
          toggleModal();
        }
      })
      .then(() => {
        let input,check;
        if (!!userName) {
          input = 'userName';
        } else {
          input = 'password';
          check = 'passwordCheck'
        }
        console.log(input);
        this.setState({[input]: '', [check]: ''})
      }
      );
  }

  render() {
    const { app } = this.props;
    const { userName, password, passwordCheck } = this.state;
    return (
      <div>
      {!app.logged && <Redirect to="/" />}
      <div className="form-container ">
        <h3>Change Name </h3>
        <Form>
          <Form.Field>
            <input placeholder='Full name' className="input" name="userName" value={userName} onChange={this.handleChange}/>
          </Form.Field>
          <Form.Field inline>
            <Button onClick={this.changeData.bind(this, { userName })} className="signup">
              Change Name
            </Button>
          </Form.Field>
        </Form>
      </div>
      <div className="form-container ">
        <h3>Change Password</h3>
        <Form>
          <Form.Field>
            <input type="password" placeholder='Password' name="password" value={password} onChange={this.handleChange}/>
          </Form.Field>
          <Form.Field>
            <input type="password" placeholder='Repeat Password' name="passwordCheck" value={passwordCheck} onChange={this.handleChange}/>
          </Form.Field>
          <Form.Field inline>
            <Button className="signup" onClick={this.changeData.bind(this, { password })}>
              Change
            </Button>
          </Form.Field>
        </Form>
      </div>
      </div>
    )
  }
}

function  mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeName: changeName,
    toggleModal: toggleModal,
    signupUser: signupUser
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
