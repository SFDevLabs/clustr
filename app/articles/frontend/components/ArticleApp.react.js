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
var PostItemDetail = require('./PostItemDetail.react');
var Link = require('react-router').Link;
var ArticleActions = require('../actions/ArticleActions');

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
    //var post = this.state.post.id? <PostItemDetail item={this.state.post} />:null;
    var post  = this.state.post;
  	return (
      <div>
        <Link to="articles">Back</Link>
        <span>{post.text}</span>
        <button  className="destroy" onClick={this._onDestroyClick} >Delete</button>
        <span>{post.username}</span>
      </div>
  	);
  },

  /**
   * Event handler for 'change' events coming from the ArticleStore
   */
  _onChange: function() {
    this.setState(getArticleState(this.state.post.id));
  },
  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param  {string} text
   */
  _onSave: function(text) {
    ArticleActions.updateText(this.state.post.id, text);
    this.setState({isEditing: false});
  },

  _onDestroyClick: function() {
    ArticleActions.destroy(this.state.post.id);
  }

});

module.exports = ArticleApp;
