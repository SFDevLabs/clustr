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
var ReactPropTypes = React.PropTypes;

/**
 * Retrieve the current TODO data from the ArticleStore
 */

var TodoApp = React.createClass({

  propTypes: {
    postData: ReactPropTypes.object.isRequired,
  },


  /**
   * @return {object}
   */
  render: function() {
    var postItem = this.props.postData;

  	return (
      <div>
        <h1>{postItem.text}</h1>
      </div>
  	);
  },

  /**
   * Event handler for 'change' events coming from the ArticleStore
   */
  _onChange: function() {
    this.setState(getTodoState());
  }

});

module.exports = TodoApp;
