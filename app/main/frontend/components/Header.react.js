/**
 * @jsx Header.react
 */
"use strict";

var React = require('react');
var Link = require('react-router').Link;
var utils = require('../utils');
var userName =utils.getUserName();

var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var MenuItem = require('react-bootstrap').MenuItem;
var DropdownButton = require('react-bootstrap').DropdownButton;


var URLSearchInput = require('../../../articles/frontend/components/URLSearchInput.react');

var loginImg;
if (utils.isLoggedIn()) {
  loginImg = "/img/eoin_profile.jpg";
} else {
  loginImg = "/img/robot.png";
}

var Header = React.createClass({

  render: function () {
    return <Navbar className="navBar" brand='' toggleNavKey={0}>
      <Nav left>
        <NavItem className="homeBox" href="articles"><img className="homeLogoFont" src="/img/logo_clustr_font.png"/></NavItem>
      </Nav>
      <Nav middle>
        <NavItem className = "headerSearch">
           <URLSearchInput
              id=""
              placeholder="URL Search..."
              onSave={this._onSave}
              className="queryBox"
              name = "query"
            />
          </NavItem>
        </Nav>
      <Nav right eventKey={0}> {/* This is the eventKey referenced */}
        <NavItem eventKey={1} href='add'><img className="statusBoxAddNode" src="img/circleAddButton.png" title="add a node" /></NavItem>
        <NavItem eventKey={2} href='login'><img className="statusBoxProfile" title="profile" src={loginImg} /></NavItem>
      </Nav>
    </Navbar>

  }
});
module.exports = Header;
