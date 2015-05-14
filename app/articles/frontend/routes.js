// Routes for module
"use strict";

var App = require('../../main/frontend/index');
var React = require('react');
var Route = require('react-router').Route;
var Verts = require('./index');

var routes = (
  <Route handler={App} location="history" strict="false">
  	<Route name="verts" path="/verts" handler={Verts}/>
  </Route>
);

module.exports = routes;
