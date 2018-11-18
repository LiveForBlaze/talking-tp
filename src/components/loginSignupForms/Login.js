import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';

class Login extends Component {
  render(){
    return (
      <div className="form-modal">
        <h3>Login</h3>
        <Form>
          <Form.Field>
            <input placeholder='Email' className="input" />
          </Form.Field>
          <Form.Field>
            <input type="password" placeholder='Password' />
          </Form.Field>
          <Form.Field inline>
            Support: some email
          </Form.Field>
          <Form.Field inline>
            <Button className="signup">
              Log In
            </Button>
          </Form.Field>
        </Form>
      </div>
    )
  }
}

export default connect()(Login);
