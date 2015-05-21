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
        <div className="row searchResults">
          <div className="columns sixteen resultsFor">{post.url}</div>
          <div className="resultsText">results:</div>
          <div>By: {post.username} post.username not working</div>
          <span>{post.username}</span>

          <div className="searchResultBox">
            <ul className="row marginZero">
              <li className="columns four marginZero"><img src="img/blank.png" /></li>
              <li className="columns eight searchResult">
                <div className="columns sixteen">
                  <ul className="row sixteen marginZero">
                    <li className="columns three"><img className="searchResultImg" src="img/fender.jpg" />
                    </li>
                    <li className="columns eleven searchResultText">
                      <div className="searchResultTitle">Result Title Goes Here</div>
                      <div className="searchResultURL">Result URL Goes Here</div>
                    </li>
                    <li className="columns two userSubmission"><img className="userSubmissionImg" src="/img/eoin_profile.jpg"/></li>
                  </ul>
                </div>
              </li>
              <li className="columns four"><img src="img/blank.png" /></li>
            </ul>
          </div>
        </div>
  	);
  },

  /**
   * Event handler for 'change' events coming from the ArticleStore
   */
  _onChange: function() {
    this.setState(getArticleState(this.props.params.id));
  },
  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param  {string} text
   */
  _onSave: function(text) {
    ArticleActions.updateText(this.props.params.id, text);
    this.setState({isEditing: false});
  },

  _onDestroyClick: function() {
    ArticleActions.destroy(this.props.params.id);
  }

});

module.exports = ArticleApp;