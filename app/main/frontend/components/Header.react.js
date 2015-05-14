/**
 * @jsx Header.react
 */
"use strict";

var React = require('react');
var Link = require('react-router').Link;

var Header = React.createClass({
  render: function () {
    return <header>
      <div className="homeBox">
        <Link to="home"><img className="homeIcon" src="/img/logo_clustr_icon.png" /></Link>
        <Link to="home"><img className="homeFont" src="/img/logo_clustr_font.png" /></Link>
      </div>
      <div className="statusBox">
      </div>
    </header>;
  }
});
module.exports = Header;