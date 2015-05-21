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
var ReactPropTypes = React.PropTypes;


var MainSearch = React.createClass({
  
	propTypes: {
		value: ReactPropTypes.string
	},

	getInitialState: function() {
		return {
		  value: this.props.value || ''
		};
	},


	render: function() {
	return (
	  <div>
	    <input
	      type="text" 
	      placeholder="Input a URL"
	      onChange={this._onChange}
	      onKeyDown={this._onKeyDown}
	      value={this.state.value}
	      autoFocus={true}
	    />
	  </div>
	  );
	},

	/**
	* Invokes the callback passed in as onSave, allowing this component to be
	* used in different ways.
	*/
	_save: function() {
		if (this.state.value && this.state.value.length>0){
		//here is where I bounce.
		  //this.transitionTo('articles',{},{q: this.state.value});
		};
	},


	/**
	* @param {object} event
	*/
	_onChange: function(/*object*/ event) {
	this.setState({
	  value: event.target.value
	});
	},

	/**
	* @param  {object} event
	*/
	_onKeyDown: function(event) {
	if (event.keyCode === ENTER_KEY_CODE) {
	  this._save();
	}
	}

});

module.exports = MainSearch;
