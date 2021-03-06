import React, { Component } from 'react';
import UserHome from './userHomePageComponent/UserHome'
import { Route, BrowserRouter as Router} from 'react-router-dom'

class Home extends Component {
  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      
      <div className="container">
        {
          isAuthenticated() && (
              <div>
                <UserHome {...this.props} />
              </div>
            )
        }
        {
          !isAuthenticated() && (
              <h4>
                You are not logged in! Please{' '}
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}
                >
                  Log In
                </a>
                {' '}to continue.
              </h4>
            )
        }
      </div>
    );
  }
}

export default Home;
