import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

import { AppRoutes } from '../client/AppRouter';

export default class SignUp extends React.Component {
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
          <h1>Join</h1>

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
            <button className="button">Create Account</button>
          </form>

          <Link to={AppRoutes.home.path}>Aready have an account?</Link>
        </div>
      </div>
    );
  }

  onSubmit(e) {
    e.preventDefault();

    const email = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();
    if (password.length < 9) {
      return this.setState({
        error: 'Password must be more than 8 characters long'
      });
    }

    Accounts.createUser({ email, password }, err => {
      err ? this.setState({ error: err.reason }) : this.setState({ error: '' });
    });
  }
}
