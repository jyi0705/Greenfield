import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import App from './src/App';
import Home from './src/Home';
import Callback from './Auth/Callback/Callback.js';
import Auth from './Auth/Auth.js';
import history from './src/history';
import Create from './src/createTripPageComponent/Create'

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
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Home auth={auth} {...props} /> 
          }}/>
          <Route path="/create" render={(props) => <Create auth={auth} {...props}/>}/>
        </div>
      </BrowserRouter>
  );
}