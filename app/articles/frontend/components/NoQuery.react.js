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
var ArticleActions = require('../actions/ArticleActions');
var Item = require('./Item.react');

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



      var search = (
        <div className="mainBody">
          Site Search
        </div>
      );

      for (var key in allPosts) {
        posts.unshift(<Item key={key} item={allPosts[key]} />);
      }
      var home = (
        <div className="mainBody">
          <div className="row sixteen logoArea">
            <span className="columns four"><img src="/img/blank.png" /></span>
            <span className="columns eight mainLogo"><img src="/img/logo_clustr.png" /></span>
            <span className="columns four"><img src="/img/blank.png" /></span>
          </div>

          <div className="row sixteen searchArea">
            <span className="columns four"><img src="/img/blank.png" /></span>
            <span className="columns eight">
              <div className = "queryForm">
                 <ItemInput
                  id=""
                  placeholder="Enter URL"
                  onSave={this._onSave}
                  className="queryBox"
                  name = "query"
                />
              </div>
            </span>
          </div>
          <div className="row recentClustrSearches">
            <div className="recentSearchesTitle">Recent Searches:</div>
            <div className="row sixteen noMarginContainer">
              <div className="columns fourteen clustrSearches">{posts}</div>
            </div>
          </div>
        </div>
      );

      return home
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
      ArticleActions.create(text);
    }
  }

});

module.exports = ArticleApp;