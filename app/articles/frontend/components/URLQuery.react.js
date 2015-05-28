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


var QueryStore = require('../stores/QueryStore');
var QueryActions = require('../actions/QueryActions');
/**
 * Retrieve the current TODO data from the QueryStore
 */
function getQueryState(q) {
  return {
    search: QueryStore.getResult(q)
  };
}

var Query = React.createClass({
  
  getInitialState: function() {
    QueryActions.clearAllQueries();
    return getQueryState(this.props.query);
  },

  componentDidMount: function() {
    QueryStore.addChangeListener(this._onChange);
    QueryActions.query(this.props.query)
  },

  componentWillUnmount: function() {
    QueryStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */

  render: function() {
    var search = this.state.search;
    var result;
    

    // var result;
    if (search.length===0) {  //Empty resonse wait for ajax response
      result = (<Loader/>)
    }else if (search[0]===null){ //No response from search api.
      result = (<div>No Result</div>)
    }else{
      var result=[];
      for (var key in search) {
        result.unshift(<URLQueryResult post={search[key]} />);
      }
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
    this.setState(getQueryState(this.props.query));
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
