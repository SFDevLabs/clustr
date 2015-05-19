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

  /**
   * @return {object}
   */
  render: function() {
    var item = this.props.item;
    return (
      <li
        className={cx({
          'completed': item.complete,
          'editing': this.state.isEditing
        })}
        key={item.id}>
        <span>{item.url}</span>
        <button  className="destroy" onClick={this._onDestroyClick} >Delete</button>
        <span>{item.username}</span>
        <Link to="article" params={{id: item.id}} >Link</Link>
      </li>
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
