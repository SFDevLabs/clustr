/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var ArticleActions = require('../actions/ArticleActions');
var Link = require('react-router').Link;
var ImageLoader = require('react-imageloader');

var cx = require('react/lib/cx');

var USerStore = require('../stores/UserStore');
var USerAction = require('../actions/UserActions');


var ArticleItem = React.createClass({

  propTypes: {
  
  },

  getInitialState: function() {
    return {
      
    };
  },

  /**
   * @return {object}
   */
  render: function() {
    // var item = this.props.item;
    // var siteToLink="/"+item.siteTo.id;
    // var siteFromLink="/"+item.siteFrom.id;
    // var Col = require('react-bootstrap').Col;
    // var Row = require('react-bootstrap').Row;
    // var user = item.edge.user;
    return (
      <div className="userProfile">
        Jeff Rulz
      </div>
    );
  }

});

module.exports = ArticleItem;
