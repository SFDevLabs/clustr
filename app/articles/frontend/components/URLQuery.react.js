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
var ReactPropTypes = React.PropTypes;
var QueryStore = require('../stores/QueryStore');
var Link = require('react-router').Link;
var QueryActions = require('../actions/QueryActions');
var Loader = require('react-loader');
var URLQueryResult = require('./URLQueryResult.react');

/**
 * Retrieve the current TODO data from the QueryStore
 */
function getQueryState(id) {
  return {
    post: QueryStore.getResult()
  };
}


var Query = React.createClass({
  
  propTypes: {
   query: ReactPropTypes.string.isRequired
  },


  getInitialState: function() {
    return getQueryState();
  },

  componentDidMount: function() {
    QueryStore.addChangeListener(this._onChange);
    QueryActions.query(this.props.query);
  },

  componentWillUnmount: function() {
    QueryStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */

  render: function() {
    var post = this.state.post;
    var result;
    if (!post) {  //Empty resonse wait for ajax response
      result = (<Loader/>)
    }else if (!post._id){ //No response from search api.
      result = (<div>No Result</div>)
    }else{ //We got a response.  TODO Abstract this out.
      result = (<URLQueryResult post={post} />)
    }//end of results
    return (
      <div className="row searchResults">
        {result}
      </div>)
    
  },

  /**
   * Event handler for 'change' events coming from the QueryStore
   */
  _onChange: function() {
    this.setState(getQueryState());
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
