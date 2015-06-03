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
var SiteConnections = require('./SiteConnections.react');

var ArticleStore = require('../stores/ArticleStore');
var ArticleActions = require('../actions/ArticleActions');
/**
 * Retrieve the current TODO data from the ArticleStore
 */
function getQueryState(id) {
  id = Number(id);
  if (isNaN(id))return {};
  return {
    post: ArticleStore.getOneNodeById(id),
    relations: ArticleStore.getOneNodeRelationsById(id)
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

  componentWillReceiveProps: function(newProps) {
    ArticleActions.fetch(newProps.params.id);
  },

  /**
   * @return {object}
   */

  render: function() {
    var post = this.state.post;
    var relations = this.state.relations;
    var relation= [];
    for (var key in relations) {
      relation.unshift(<SiteConnections key={key} post={relations[key]} />);
    }
    //var item = post.USEREDGE?(<Item item={post} />):null;  ///Check that we have a full response.
    return (
      <div className="row searchResults">
        <div className="searchResultBox">
          <ul className="row marginZero">
            <li className="columns four marginZero"><img src="img/blank.png" /></li>
            <li className="columns eight searchResult">
              <div className="columns sixteen">
                <ul className="row sixteen marginZero">
                  <li className="columns three"><img className="searchResultImg" src={post.favicon} />
                  </li>
                  <li className="columns eleven searchResultText">
                    <div className="searchResultTitle">{post.title}</div>
                    <div className="searchResultURL">{post.url}</div>
                  </li>
                  <li className="columns two userSubmission"><img className="userSubmissionImg" src="/img/eoin_profile.jpg"/>{post.username}</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <hr/>
        {relation}
      </div>)
    
  },

  /**
   * Event handler for 'change' events coming from the ArticleStore
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
