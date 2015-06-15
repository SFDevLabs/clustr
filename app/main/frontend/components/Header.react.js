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
    return <Navbar brand='React-Bootstrap' inverse toggleNavKey={0}>
      <Nav right eventKey={0}> {/* This is the eventKey referenced */}
        <NavItem eventKey={1} href='#'>Link</NavItem>
        <NavItem eventKey={2} href='#'>Link</NavItem>
        <DropdownButton eventKey={3} title='Dropdown'>
          <MenuItem eventKey='1'>Action</MenuItem>
          <MenuItem eventKey='2'>Another action</MenuItem>
          <MenuItem eventKey='3'>Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey='4'>Separated link</MenuItem>
        </DropdownButton>
      </Nav>
    </Navbar>
  }
});
module.exports = Header;
