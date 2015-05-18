/**
 * @jsx App.react
 */
"use strict";

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;

// Execute the app
var App = React.createClass({
  render:function() {
    return (
      <div>
      	<h2>Sub Menu</h2>
        <RouteHandler/>
      </div>
    )
  }
});
module.exports = App;