import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import PrivateRoute from './PrivateRoute';
import HomePage from './homepage/Homepage';
import Login from './login/Login';
import Signup from './login/Signup';
import PsuLogin from './login/PsuLogin';
import CoronaPage from './corona/corona';
import InputPost from './blogtemplate/InputForm';
import ViewPost from './blogtemplate/ViewPost';
import Policy from './policy/privacy__policy';
import About from './about/About';
import './App.css';

axios.defaults.withCredentials = true;

const App =  ({ authenticated, checked }) => {
 
  return (
      <Router>
      { checked &&
        <div>
          <PrivateRoute exact path="/" component={HomePage} authenticated={authenticated} />
          <PrivateRoute exact path="/covid" component={CoronaPage} authenticated={authenticated} />
          <PrivateRoute exact path="/post" component={InputPost} authenticated={authenticated} />
          <PrivateRoute exact path="/view" component={ViewPost} authenticated={authenticated} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/psuauth" component={PsuLogin} />
          <Route exact path="/policy" component={Policy} />
          <Route exact path="/about" component={About} />
        </div>
      }
    </Router>
)}

const { bool } = PropTypes;

App.propTypes = {
  authenticated: bool.isRequired,
  checked: bool.isRequired
};

const mapState = ({ session }) => ({
  checked: session.checked,
  authenticated: session.authenticated
});

export default connect(mapState)(App);

