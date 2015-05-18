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
var ItemInput = require('./ItemInput.react');
var ArticleAction = require('../actions/ArticleActions');
var PostItem = require('./PostItem.react');

/**
 * Retrieve the current TODO data from the ArticleStore
 */
function getArticleState() {
  return {
    allPosts: ArticleStore.getAll(),
  };
}


var ArticleApp = React.createClass({

  getInitialState: function() {
    return getArticleState();
  },

  componentDidMount: function() {
    ArticleStore.addChangeListener(this._onChange);
    ArticleStore.fetchAll();
  },

  componentWillUnmount: function() {
    ArticleStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  // render: function() {
  // 	return (
  //     <div>
  //       <MainSection
  //       allPosts={this.state.allPosts}
  //       />
  //     </div>
  // 	);
  // },

  render: function() {
      // if (Object.keys(this.props.allPosts).length < 1) {
      //   return null;
      // }

      var allPosts = this.state.allPosts;
      var posts = [];

      for (var key in allPosts) {
        posts.push(<PostItem key={key} item={allPosts[key]} />);
      }

      return (
        <div>
          <ItemInput
            id="new-todo"
            placeholder="What needs to be done?"
            onSave={this._onSave}
          />
          <ul id="todo-list">{posts}</ul>
        </div>
      );
    },

  /**
   * Event handler for 'change' events coming from the ArticleStore
   */
  _onChange: function() {
    this.setState(getArticleState());
  },
  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param {string} text
   */
  _onSave: function(text) {
    if (text.trim()){
      ArticleAction.create(text);
    }
  }

});

module.exports = ArticleApp;
