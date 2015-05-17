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
 * the ArticleStore and passes the new data to its children.
 */

var React = require('react');
var ArticleStore = require('../stores/ArticleStore');
var PostItem = require('./PostItem.react');
var Link = require('react-router').Link;
/**
 * Retrieve the current TODO data from the ArticleStore
 */
function getArticleState(id) {
  return {
    post: ArticleStore.getOneById(id),
  };
}


var ArticleApp = React.createClass({

  getInitialState: function() {
    return getArticleState(this.props.params.id);
  },

  componentDidMount: function() {
    ArticleStore.addChangeListener(this._onChange);
    ArticleStore.fetchOne(this.props.params.id);
  },

  componentWillUnmount: function() {
    ArticleStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    var post = this.state.post.id? <PostItem item={this.state.post} />:null;
  	return (
      <div>
        <h1>App</h1>
        <Link to="articles">Back</Link>
        {post}
      </div>
  	);
  },

  /**
   * Event handler for 'change' events coming from the ArticleStore
   */
  _onChange: function() {
    this.setState(getArticleState(this.props.params.id));
  }

});

module.exports = ArticleApp;
