/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the QueryStore and passes the new data to its children.
 */

var React = require('react');
var Link = require('react-router').Link;
var Loader = require('react-loader');
var URLQueryResult = require('./URLQueryResult.react');
var Item = require('./Item.react');

var ArticleStore = require('../stores/ArticleStore');
var ArticleActions = require('../actions/ArticleActions');
/**
 * Retrieve the current TODO data from the QueryStore
 */
function getQueryState(id) {
  return {
    post: ArticleStore.getOneById(id)
  };
}

var Query = React.createClass({
  
  getInitialState: function() {
    return getQueryState(this.props.params.id);
  },

  componentDidMount: function() {
    ArticleStore.addChangeListener(this._onChange);
    ArticleActions.fetch(this.props.params.id);
  },

  componentWillUnmount: function() {
    ArticleStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */

  render: function() {
    var post = this.state.post;
    var item = post.USEREDGE?(<Item item={post} />):null;  ///Check that we have a full response.
    return (
      <div className="row searchResults">
        {item}
      </div>)
    
  },

  /**
   * Event handler for 'change' events coming from the QueryStore
   */
  _onChange: function() {
    this.setState(getQueryState(this.props.params.id));
  },
  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param  {string} text
   */
  // _onSave: function(text) {
  //   ArticleActions.updateText(this.props.query, text);
  // },

  // _onDestroyClick: function() {
  //   ArticleActions.destroy(this.props.query);
  // }

});

module.exports = Query;
