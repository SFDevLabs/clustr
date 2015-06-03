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

var Navigation = require('react-router').Navigation;


function setInput(inputNumber, data){
	_inputs = _inputs.set(inputNumber, new InputRecord(data));
}

function clearInput(inputNumber, data){
	_inputs = _inputs.clear();
}

var InputRecord = Immutable.Record({
  id : null,
  url : null,
});

function getState(){
	return _inputs.toObject();
}

var Add = React.createClass({
	mixins: [Navigation],
	// propTypes: {
	// 	value: ReactPropTypes.string
	// },

	getInitialState: function() {
		if (!utils.isLoggedIn()){utils.loginRedirect('/login')};
		return getState();
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
	var holderValueOne = !inputs[0]?null:inputs[0].url;
	var holderValueTwo = !inputs[1]?null:inputs[1].url;

	return (
	  <div className="addPageContainer">
	  
      <ul className="row sixteen marginZero connectionBox">
        <li className="columns three"><img src="img/blank.png" /></li>
        <li className="columns ten">
          <ul className="row sixteen marginZero connection">
			<AddURLInput holderValue={holderValueOne} onSelect={this._onSelect} onSave={this._onSave} selectItemID={selectItemIdOne} excludeItemID={selectItemIdTwo} inputNumber={0} autoFocus={true} />
            <li className="columns three"><img className="connectMetaphor" src="img/connect_metaphor.png" /></li>
            <AddURLInput holderValue={holderValueTwo} onSelect={this._onSelect} onSave={this._onSave} selectItemID={selectItemIdTwo} excludeItemID={selectItemIdOne} inputNumber={1} />
          	 <input onClick={this._onClick} className="querySubmit" type="submit" value="Search" />
          </ul>
        </li>
        <li className="columns three"><img src="img/blank.png" /></li>
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
	* Invokes the callback passed in as onSave, allowing this component to be
	* used in different ways.
	*/
	_onClick: function(valueOne, valueTwo) {

		if (!this.state[1] && !this.state[2]){
			
		} else{
			this._onSave(getState()[0].url, getState()[1].url)
		}

		
	},
	/**
	* Event handler for 'change' events coming from the ArticleStore
	*/
	_saveComplete: function() {
		var id = getState()[0].id
		this.transitionTo('article',{id:id},{});
	},

	// /**
	// * @param {object} event
	// */
	// _onChange: function(/*object*/ event, key) {
	// 	var obj={};
	// 	var key = event.target.dataset.key;
	// 	obj[key] = event.target.value;
	// 	this.setState(obj);
	// },

	/**
	* @param {object} event
	*/
	_onSelect: function(data, inputNumber) {
		setInput(inputNumber, data);
		this.setState(getState());
	}

});

module.exports = Add;
