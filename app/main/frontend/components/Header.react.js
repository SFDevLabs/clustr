/**
 * @jsx Header.react
 */
"use strict";

var React = require('react');
var Link = require('react-router').Link;
var utils = require('../utils');
var userName =utils.getUserName();


var URLSearchInput = require('../../../articles/frontend/components/URLSearchInput.react');

var loginImg;
if (utils.isLoggedIn()) {
  loginImg = "/img/eoin_profile.jpg";
} else {
  loginImg = "/img/robot.png";
}

var Header = React.createClass({

  render: function () {
    return <header>
      <div className="homeBox">
        <Link to="articles"><img className="homeIcon" src="/img/logo_clustr_icon.png" title="home" /></Link>
        <span><Link to="articles"><img className="homeLogoFont" src="/img/logo_clustr_font.png"/></Link></span>
      </div>
     <div className = "headerSearch">
         <URLSearchInput
          id=""
          placeholder="URL Search..."
          onSave={this._onSave}
          className="queryBox"
          name = "query"
        />
      </div>
      <div className="statusBox .dropdown">
        <Link to="add"><img className="statusBoxAddNode" src="img/circleAddButton.png" title="add a node" /></Link>
        <img className="statusBoxActivity" src="img/activity.png" title="check activity" />
        <img className="statusBoxProfile" title="profile" src={loginImg} />
      </div>
    </header>;
  }
});
module.exports = Header;
