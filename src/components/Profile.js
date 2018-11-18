import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { mapStateToProps } from '../helpers/mapStateToProps';
import { changeName } from '../actions/index';

class Profile extends Component {
  state = {
    name: ''
  }
  handleChange = (e) => {
    console.log(e.target.value)
    this.setState({
      name: e.target.value
    });
  }
  handleChangeName = () => {
    this.props.changeName(this.state.name);
  }
  render() {
    const { app } = this.props
    return (
      <div>
      {!app.logged && <Redirect to="/" />}
      <div className="form-container ">
        <h3>Change Name </h3>
        <Form>
          <Form.Field>
            <input placeholder='Full name' className="input" name="name" onChange={this.handleChange}/>
          </Form.Field>
          <Form.Field inline>
            <Button onClick={this.handleChangeName} className="signup">
              Change Name
            </Button>
          </Form.Field>
        </Form>
      </div>
      <div className="form-container ">
        <h3>Change Password</h3>
        <Form>
          <Form.Field>
            <input type="password" placeholder='Password' name="password" onChange={this.handleChange}/>
          </Form.Field>
          <Form.Field>
            <input type="password" placeholder='Repeat Password' name="passwordCheck" onChange={this.handleChange}/>
          </Form.Field>
          <Form.Field inline>
            <Button className="signup" onClick={this.handleGet}>
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
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
