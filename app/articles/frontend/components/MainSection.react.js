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
var ReactPropTypes = React.PropTypes;
var PostItem = require('./PostItem.react');
/**
 * Retrieve the current TODO data from the ArticleStore
 */

var MainSection = React.createClass({

  propTypes: {
    allPosts: ReactPropTypes.object.isRequired,
  },

  // getInitialState: function() {
  //   return ArticleStore.getAll()
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
    if (Object.keys(this.props.allPosts).length < 1) {
      return null;
    }

    var allPosts = this.props.allPosts;
    var posts = [];


    for (var key in allPosts) {
      posts.push(<PostItem postData={allPosts[key]}/>);
    }

    return (
      <div>
        <PostItem/>
        <ul id="todo-list">{posts}</ul>
      </div>
    );
  },


});

module.exports = MainSection;
