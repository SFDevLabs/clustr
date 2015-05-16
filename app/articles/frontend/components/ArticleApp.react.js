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
var MainSection = require('./MainSection.react');
/**
 * Retrieve the current TODO data from the ArticleStore
 */
function getArticleState() {
  return {
    allPosts: ArticleStore.getAll(),
  };
}


var ArticleApp = React.createClass({

  // getInitialState: function() {
  //   return getArticleState();
  // },

  // componentDidMount: function() {
  //   ArticleStore.addChangeListener(this._onChange);
  //   ArticleStore.fetchAll();
  // },

  // componentWillUnmount: function() {
  //   ArticleStore.removeChangeListener(this._onChange);
  // },

  /**
   * @return {object}
   */
  render: function() {
    console.log(this.props.params.id)
  	return (
      <div>
        <h1>App</h1>
        <h2>{this.props.params.id}</h2>
      </div>
  	);
  },

  /**
   * Event handler for 'change' events coming from the ArticleStore
   */
  _onChange: function() {
    this.setState(getArticleState());
  }

});

module.exports = ArticleApp;
