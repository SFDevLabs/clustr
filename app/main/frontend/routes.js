// Routes for module
"use strict";

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var App = require('./components/App.react');


var Home = React.createClass({
  render: function () {
    return <div><Link to="verts">Dashboard</Link><h2>Home</h2></div>;
  }
});

// declare our routes and their hierarchy
var routes = (
  <Route handler={App} location="history" strict="false">
  	<Route name="home" path="/" handler={Home}/>
  </Route>
);

module.exports = routes;
