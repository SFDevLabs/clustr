// Routes for module
"use strict";

var React = require('react');
var Route = require('react-router').Route;
var Verts = require('./index');
var TodoApp = require('./components/TodoApp.react');
var MainApphandler = require('../../main/frontend/components/App.react');

var VertsRoutes = (
  <Route handler={MainApphandler} location="history" strict="false">
    <Route name="verts" path="/verts" handler={TodoApp}/>
  </Route>
  )

module.exports = VertsRoutes;
