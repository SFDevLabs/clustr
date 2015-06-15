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
var ArticleActions = require('../actions/ArticleActions');
var URLSearchInput = require('./URLSearchInput.react');
var Item = require('./Item.react');
var Link = require('react-router').Link;

/**
 * Retrieve the current TODO data from the ArticleStore
 */
function getArticleState() {
  return {
    allPosts: ArticleStore.getAllEdges(),
  };
}


var ArticleApp = React.createClass({

  getInitialState: function() {
    return getArticleState();
  },

  componentDidMount: function() {
    ArticleStore.addChangeListener(this._onChange);
    ArticleActions.relationsFetchAll()
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

      var Grid = require('react-bootstrap').Grid;
      var Col = require('react-bootstrap').Col;
      var Row = require('react-bootstrap').Row;

      var home = (
        <Grid className="mainBody">
          <Row>
            <Col md={3} className="leftCol"></Col>
            <Col md={7} className="midCol">
             <div className="homeIconBox" href="articles"><img className="homeIconImg" src="/img/logo_clustr.png"/>
             </div>
              <URLSearchInput
              id=""
              placeholder=""
              onSave={this._onSave}
              className="form-control homeSearch"
              name="query"
            />
            </Col>
            <Col md={2} className="rightCol"></Col>
          </Row>

          <Row className="homeFeeds">
            <Col md={2} className=""></Col>
            <Col md={4} className="recentConnections">{posts}</Col>
            <Col md={1} className=""></Col>
            <Col md={4} className="leaderBoard">LeaderBoard</Col>
            <Col md={1} className=""></Col>
          </Row>
        </Grid>
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
