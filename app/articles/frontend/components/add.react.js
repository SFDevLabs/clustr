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
var utils = require('../../../main/frontend/utils');
var Immutable = require('immutable');
var _inputs = Immutable.OrderedMap();
var cx = require('classnames');

var Navigation = require('react-router').Navigation;


function setInput(data, inputNumber){
	_inputs = _inputs.set(inputNumber, new InputRecord(data) );
}

function clearInput(){
	_inputs = _inputs.set(0, new InputRecord({}) );
	_inputs = _inputs.set(1, new InputRecord({}) );
}

function destroy(id) {
  _inputs = _inputs.delete(id);
}

var InputRecord = Immutable.Record({
  id : null,
  url : null,
  title: null
});

function getInputState(){
	return _inputs.toObject();
}

var Add = React.createClass({
	mixins: [Navigation],
	// propTypes: {
	// 	value: ReactPropTypes.string
	// },

	getInitialState: function() {
		if (!utils.isLoggedIn()){utils.loginRedirect('/login')};
		return getInputState();
	},

	componentDidMount: function() {
	 	ArticleStore.addSaveListener(this._saveComplete);
	},

	componentWillUnmount: function() {
		clearInput();
	    ArticleStore.removeSaveListener(this._saveComplete);
	},

	render: function() {
	//move this logix to the back end
	//var same = (<h4>URLS can not be the same!</h4>)
	//var  equals = valueOne.length>0 && valueOne===valueTwo?same:null;
	
	var inputs = this.state;
	var selectItemIdOne = !inputs[0]?null:inputs[0].id;
	var selectItemIdTwo = !inputs[1]?null:inputs[1].id;
	return (
	  <div className="addPageContainer">
	      <ul className="row sixteen marginZero connectionBox">
	        <li className="columns three"><img src="img/blank.png" /></li>
	        <li className="columns ten">
	          <ul className="row eight marginZero connection">
				<AddURLInput onSelect={this._onSelect} onSave={this._onSave} selectItemID={selectItemIdOne} excludeItemID={selectItemIdTwo} inputNumber={0} autoFocus={true} />
	            <li className="columns three"><img className="connectMetaphor" src="img/connect_metaphor.png" /></li>
	            <AddURLInput onSelect={this._onSelect} onSave={this._onSave} selectItemID={selectItemIdTwo} excludeItemID={selectItemIdOne} inputNumber={1} />
	            <li className="columns one url-submit">
		        	<a href="javascript:void(0);" onClick={this._onClick} className="querySubmit" type="submit" value="Submit" >
	                	<ul className={cx({active:this._canCreateEdge()})+" row sixteen marginZero"}>
		                	Connect
	                	</ul>
	                </a>
	             </li>
	          </ul>
	        </li>
	        <a onClick={this._clearInputs}>clear</a>

	      </ul>
	  </div>
	  )
	},

	/**
	* Invokes save to the server 
	*/
	_onSave: function(valueOne, valueTwo) {
      	ArticleActions.create(valueOne, valueTwo);
	},

	/**
	* Invokes save to the server 
	*/
	_clearInputs: function() {
      	clearInput();
      	this.setState(getInputState());
	},

	/**
	* Invokes the callback passed in as onSave, allowing this component to be
	* used in different ways.
	*/
	_onClick: function(valueOne, valueTwo) {
		if (this._canCreateEdge()){
			this._onSave(getInputState()[0].url, getInputState()[1].url)
		}
	},
	/**
	* Invokes the callback passed in as onSave, allowing this component to be
	* used in different ways.
	*/
	_canCreateEdge: function() {

		return this.state[0]!==undefined && this.state[1]!==undefined && this.state[0].url!==null && this.state[0].url!==null
	},

	/**
	* Event handler for 'change' events coming from the ArticleStore
	*/
	_saveComplete: function() {
		//var id = getInputState()[0].id
		this.transitionTo('articles',{},{});
	},

	/**
	* @param {object} event
	*/
	_onSelect: function(data, inputNumber) {

		setInput(data, inputNumber);
		this.setState(getInputState());
	}

});

module.exports = Add;
