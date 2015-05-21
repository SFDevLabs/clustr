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
        <RouteHandler/>
      </div>
    )
  }
});
module.exports = App;