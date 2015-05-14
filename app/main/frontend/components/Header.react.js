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
        <img className="statusBoxAddNode" src="img/addIcon_Color.png" />
        <img className="statusBoxActivity" src="img/activity.png" />
        <img className="statusBoxProfile" src="/img/eoin_profile.jpg" />
      </div>
    </header>;
  }
});
module.exports = Header;