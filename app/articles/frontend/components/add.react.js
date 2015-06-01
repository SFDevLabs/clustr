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
var Navigation = require('react-router').Navigation;
var utils = require('../../../main/frontend/utils');

var MainSearch = React.createClass({
	mixins: [Navigation],

	// propTypes: {
	// 	value: ReactPropTypes.string
	// },

	getInitialState: function() {
		if (!utils.isLoggedIn()){utils.loginRedirect('/login')};
		return {
			  valueOne:'',
			  valueTwo:''
			}
		
	},
	

	render: function() {
	var  valueOne = this.state.valueOne;
	var  valueTwo =  this.state.valueTwo;
	var same = (<h4>URLS can not be the same!</h4>)
	var  equals = valueOne.length>0 && valueOne===valueTwo?same:null;
	return (
	  <div className="addPageContainer">
	  
      <ul className="row sixteen marginZero connectionBox">
        <li className="columns three"><img src="img/blank.png" /></li>
        <li className="columns ten">
          {equals}
          <ul className="row sixteen marginZero connection">
			<AddURLInput onSave={this._onSave} onChange={this._onChange} value={valueOne} keyValue="valueOne" />
            <li className="columns three"><img className="connectMetaphor" src="img/connect_metaphor.png" /></li>
            <AddURLInput onSave={this._onSave} onChange={this._onChange} value={valueTwo} keyValue="valueTwo" />
          </ul>
        </li>
        <li className="columns three"><img src="img/blank.png" /></li>
      </ul>
	  </div>
	  )
	},

	/**
	* Invokes the callback passed in as onSave, allowing this component to be
	* used in different ways.
	*/
	_onSave: function() {
		var  valueOne = this.state.valueOne;
		var  valueTwo =  this.state.valueTwo;
		if (valueOne.length>0 && valueTwo.length>0 && valueOne!==valueTwo){

			alert(valueOne+'-'+valueTwo)
      		//ArticleActions.create(valueOne, valueTwo, nodeIDOne, nodeIDTwo);
      		//this.transitionTo('/4',{},{});
		}
    // console.log(text, number);
    // console.log(text, number);
	},

	/**
	* @param {object} event
	*/
	_onChange: function(/*object*/ event, key) {
		var obj={};
		var key = event.target.dataset.key;
		obj[key] = event.target.value;
		this.setState(obj);
	},
	_sameCheck: function() {
		var  valueOne = this.state.valueOne;
		var  valueTwo =  this.state.valueTwo;
		

	}

});

module.exports = MainSearch;
