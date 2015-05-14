/**
 * @jsx Home.react
 */
"use strict";

var React = require('react');
var Link = require('react-router').Link;

var Home = React.createClass({
  render: function () {
    return <div><Link to="articles">Dashboard</Link><h2>Home</h2></div>;
  }
});
module.exports = Home;