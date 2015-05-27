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
var AddURLInput = require('./AddURLInput.react');
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
	  <div className="addPageContainer">
      <AddURLInput onSave={this._onSave} />
	    

	  </div>
	  )
	},


	/**
	* Invokes the callback passed in as onSave, allowing this component to be
	* used in different ways.
	*/
	_onSave: function(valueOne, valueTwo) {
		if (valueOne.length>0 && valueTwo.length>0){
      ArticleActions.create(valueOne, valueTwo);
		}
    // console.log(text, number);
    // console.log(text, number);
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
