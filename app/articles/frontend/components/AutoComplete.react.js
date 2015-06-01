/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var ENTER_KEY_CODE = 13;
var Navigation = require('react-router').Navigation;
var AutoCompleteItem = require('./AutoCompleteItem.react');
var Loader = require('react-loader');
var $ = require('jquery');

// var QueryStore = require('../stores/QueryStore');
// var QueryActions = require('../actions/QueryActions');

var urlBase = '/apigraph/query/'
var errorObj = require('../../../main/frontend/errorHandle');
var utils = require('../../../main/frontend/utils');
var csrfToken = utils.getCsrfToken()

/**
 * Make a stateless ajax call to the search api.
 */
function queryHandler(url, cb) {
  $.ajax({
    method: "GET",
    url: urlBase,
    data: {_csrf:csrfToken, url:url},
  })
  .done(function( results ) {
    cb(null, results.data);
  }).error(errorObj.errHandle);
}

/**
 * Retrieve the current TODO data from the QueryStore
 */
function getQueryState(data, loader) {
  return {
    search: data,
    loader: loader? loader:false
  };
};

var AutoComplete = React.createClass({

  // mixins: [Navigation],
  propTypes: {
    query: ReactPropTypes.string.isRequired,
  },

  getInitialState: function() {
    return getQueryState(null , true);
  },

  // componentDidMount: function() {
  //   //QueryStore.addChangeListener(this._onChange);
  //   //QueryActions.query(this.props.query)
  // },

  // componentWillUnmount: function() {
  //   QueryStore.removeChangeListener(this._onChange);
  // },
  _quearyEfficientFn: utils.debounce(function(q) {
    this._query(q) 
  }, 750),

  componentWillReceiveProps: function(newProps) {
    if (newProps.query.length>0 && newProps.query!==this.props.query){
      // if (this.state.loader){
        
      // };
      this.setState(getQueryState(null, true))
      this._quearyEfficientFn(newProps.query);
    }
  },

  /**
   * @return {object}
   */
  render: function() {
    //var items = [(<AutoCompleteItem/>), (<AutoCompleteItem/>)];
    var loader = this.state.loader;
    var search = this.state.search;
    var query = this.props.query;
    var result;
    
    if (query.length===0){
      result= null;
    } else if (loader===true) {  //Wait for ajax response
      result = this._loader;
    }else if ($.isEmptyObject(search)){ //No response from search api.
      var post={
        url:query
      }
      result = (<AutoCompleteItem post={post} />)
    } else {
      var result=[];
      for (var key in search) {
        result.unshift(<AutoCompleteItem key={key} post={search[key]} />);
      }
    }//end of results

    return (
      <ul className="autoCompleteResults">
        {result}
      </ul>
    );
  },

  /**
   * Event handler for 'change' events coming from the QueryStore
   */
  _onChange: function() {
    this.setState(getQueryState(this.props.query));
  },

  _query: function(q){
    var that= this;
    queryHandler(q, function(err, data){
      that.setState(getQueryState(data));
    });
  },
  _loader: (<Loader/>)

});


module.exports = AutoComplete;