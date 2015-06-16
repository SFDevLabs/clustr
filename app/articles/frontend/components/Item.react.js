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

var ArticleItem = React.createClass({

  propTypes: {
   item: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      isEditing: false
    };
  },
  _imageLoadError : function(e){
    e.target.src="img/fallback.ico"
  },

  /**
   * @return {object}
   */
  render: function() {
    var item = this.props.item;
    var siteToLink="/"+item.siteTo.id;
    var siteFromLink="/"+item.siteFrom.id;
    var Col = require('react-bootstrap').Col;
    var Row = require('react-bootstrap').Row;
    var user = item.edge.user;
    return (
      <div className="recentConnectionsDiv">
        <Row className="siteToRow">
          <div className="siteToFaviconBox"><Link to={siteToLink}><ImageLoader className="siteToFaviconImg" src={item.siteTo.favicon} onError={this._imageLoadError} /></Link></div>
          <Link to={siteToLink}><div className="siteToTitle">{item.siteTo.title}</div></Link>
          <Link to={siteToLink}><div className="siteToURL">{item.siteTo.url}</div></Link>
        </Row>
        <Row className="siteFromRow">
          <div className="siteFromFaviconBox"><Link to={siteFromLink}><ImageLoader className="siteFromFaviconImg" src={item.siteFrom.favicon} onError={this._imageLoadError} /></Link></div>
          <Link to={siteFromLink}><div className="siteFromTitle">{item.siteFrom.title}</div></Link>
          <Link to={siteFromLink}><div className="SiteFromURL">{item.siteFrom.url}</div></Link>
        </Row>
        <div className="pull-right">{user.username}</div>
      </div>
    );
  },


  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param  {string} text
   */
  _onSave: function(text) {
    ArticleActions.updateText(this.props.item.id, text);
    this.setState({isEditing: false});
  },

  _onDestroyClick: function() {
    ArticleActions.destroy(this.props.item.id);
  }

});

module.exports = ArticleItem;
