/**
 * @jsx Header.react
 */
"use strict";

var React = require('react');
var Link = require('react-router').Link;

var userNameDiv = document.getElementById("user-name");
var userName = userNameDiv.dataset.name;

var URLSearchInput = require('../../../articles/frontend/components/URLSearchInput.react');

var Header = React.createClass({

  render: function () {
    return <header>
      <div className="homeBox">
        <Link to="articles"><img className="homeIcon" src="/img/logo_clustr_icon.png" title="home" /></Link>
        <span><img className="homeLogoFont" src="/img/logo_clustr_font.png"/></span>
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
      <div className="statusBox">
        <Link to="add"><img className="statusBoxAddNode" src="img/circleAddButton.png" title="add a node" /></Link>
        <img className="statusBoxActivity" src="img/activity.png" title="check activity" />
        <img className="statusBoxProfile" title="profile" src="/img/eoin_profile.jpg" />
      </div>
    </header>;
  }
});
module.exports = Header;
