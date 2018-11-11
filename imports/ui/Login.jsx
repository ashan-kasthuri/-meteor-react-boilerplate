import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import { AppRoutes } from '../client/AppRouter';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Login</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form
            className="boxed-view__form"
            onSubmit={this.onSubmit.bind(this)}
            noValidate
          >
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input
              type="password"
              ref="password"
              name="password"
              placeholder="Password"
            />
            <button className="button">Login</button>
          </form>
          <Link to={AppRoutes.signup.path}>Don't have an account?</Link>
        </div>
      </div>
    );
  }

  onSubmit(e) {
    e.preventDefault();

    const email = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();

    Meteor.loginWithPassword({ email }, password, err => {
      err
        ? this.setState({ error: 'Unable to login. Check email and password' })
        : this.setState({ error: '' });
    });
  }
}
