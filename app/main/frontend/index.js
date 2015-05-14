/**
npm * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;

//Import the modules of the different app components
var Verts = require('../../articles/frontend/app');

var Home = React.createClass({
  render: function () {
    return <div><Link to="verts">Dashboard</Link><h2>Home</h2></div>;
  }
});

var Header = React.createClass({
  render: function () {
    return <header>

      <img src="/img/logo_clustr_font.png" />
      <h2>Clustr</h2>
      <Link to="home">Home</Link>
    </header>;
  }
});

var App = React.createClass({
  render:function() {
    return (
      <div>
        <Header />
        <RouteHandler/>
      </div>
    )
  }
});

// declare our routes and their hierarchy
var routes = (
  <Route handler={App} location="history" strict="false">
    <Route name="verts" path="/verts" handler={Verts}/>
    <Route name="home" path="/" handler={Home}/>
  </Route>
);

// Execute the app
var RouteHandler = Router.RouteHandler;





Router.run(routes, Router.HistoryLocation, function(Root){
  React.render(<Root/>, document.getElementById('todoapp'));
});