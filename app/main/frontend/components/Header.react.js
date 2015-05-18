/**
 * @jsx Header.react
 */
"use strict";

var React = require('react');
var Link = require('react-router').Link;

var userNameDiv = document.getElementById("user-name");
var userName = userNameDiv.dataset.name


var Header = React.createClass({
  render: function () {
    return <header>
      <div className="homeBox">
        <Link to="articles"><img className="homeIcon" src="/img/logo_clustr_icon.png" title="home" /></Link>
        <span>{userName}</span>
      </div>
      <div className="statusBox">
        <img className="statusBoxAddNode" src="img/circleAddButton.png" title="add a node" />
        <img className="statusBoxActivity" src="img/activity.png" title="check activity" />
        <img className="statusBoxProfile" title="profile" src="/img/eoin_profile.jpg" />
      </div>
    </header>;
  }
});
module.exports = Header;