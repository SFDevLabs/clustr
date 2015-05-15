// Routes for module
"use strict";

var React = require('react');
var Route = require('react-router').Route;

var VertsRoutes = (
  <Route handler={require('../../main/frontend/components/App.react')} location="history" strict="false">
    <Route name="articles" path="/articles" handler={require('./components/TodoApp.react')}/>
  </Route>
  )

module.exports = VertsRoutes;