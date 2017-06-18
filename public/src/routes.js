import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './Home/Home';
import Callback from './Callback/Callback';
import Auth from '../Auth/Auth';
import history from './history';
// const path = require('path');
const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
      <BrowserRouter history={history} component={App}>
        <div>
          <Route path="/" render={(props) => <App auth={auth} {...props} />} />
          <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
          <Route path ="/callback" render={(props) => {
            handleAuthentication(props);
            return <App {...props}/>
            }}/>
        </div>
      </BrowserRouter>
  );
}

          // {/*<Route path="/callback" render={(props) => {
          //   handleAuthentication(props);
          //   return <Callback {...props} /> 
          // }}/>*/}