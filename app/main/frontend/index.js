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
var VertsRoutes = require('../../articles/frontend/routes');

var Home = React.createClass({
  render: function () {
    return <div><Link to="verts">Dashboard</Link><h2>Home</h2></div>;
  }
});

var Header = React.createClass({
  render: function () {
    return <header>
      <div className="homeBox">
        <Link to="home"><img className="homeIcon" src="/img/logo_clustr_icon.png" /></Link>
        <Link to="home"><img className="homeFont" src="/img/logo_clustr_font.png" /></Link>
      </div>
      <div className="statusBox">
        <img className="statusBoxAddNode" src="img/addIcon_Color.png" />
        <img className="statusBoxActivity" src="img/activity.png" />
        <img className="statusBoxProfile" src="/img/eoin_profile.jpg" />
      </div>
    </header>;
  }
});

var App = React.createClass({
  render:function() {
    return (
      <div>
        <Header/>
        <RouteHandler/>
      </div>
    )
  }
});

// declare our routes and their hierarchy
var routes = (
  <Route handler={App} location="history" strict="false">
    <Route name="home" path="/" handler={Home}/>
  </Route>
);

// Execute the app
var RouteHandler = Router.RouteHandler;


Router.run([routes,VertsRoutes], Router.HistoryLocation, function(Root){
  React.render(<Root/>, document.getElementById('todoapp'));
});

module.exports = App;
