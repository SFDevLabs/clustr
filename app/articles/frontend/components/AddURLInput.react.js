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
var AutoComplete = require('./AutoComplete.react');

function getState(value) {
  return {
    value: value
  };
}

var AddURLInput = React.createClass({

  propTypes: {
    //onSave: ReactPropTypes.func.isRequired,
    inputNumber: ReactPropTypes.number,
    selectItemID: ReactPropTypes.number,
    holderValue: ReactPropTypes.string,
    onSelect: ReactPropTypes.func,
    excludeItemID: ReactPropTypes.number
  },

  getInitialState: function() {
    return getState('');
  },

  /**
   * @return {object}
   */
  render: function() {

    var valueInput = this.props.holderValue?this.props.holderValue:this.state.value;
    return (
            <li className="columns six">
              <div className="leftBox border url-add-parent">
                <ul className="row sixteen marginZero">
                  <li className="columns four url-input">
                  <input
                    type="text" 
                    placeholder={this.props.placeholder}
                    onChange={this._onChange}
                    onKeyDown={this._onKeyDown}
                    value={valueInput}
                    autoFocus={this.props.autoFocus}
                  />
                  </li>
                </ul>
                <AutoComplete selectItemID={this.props.selectItemID} excludeItemID={this.props.excludeItemID} query={this.state.value} onSelect={this.props.onSelect} inputNumber={this.props.inputNumber} />
              </div>
            </li>
    );
  },

  // /**
  //  * Invokes the callback passed in as onSave, allowing this component to be
  //  * used in different ways.
  //  */
  // _save: function() {
  //   if(this.state.valueOne && this.state.valueTwo){// Success we have both URLS
  //     this.props.onSave(this.state.valueOne, this.state.valueTwo); //We pass them to the save function
  //     // this.setState({//Reset the Front
  //     //   valueOne: '',
  //     //   valueTwo: ''
  //     // });
  //   };
  // },

  /**
  * @param {object} event
  */
  _onChange: function(/*object*/ event, key) {
    // var obj={};
    // var key = event.target.dataset.key;
    // obj[key] = event.target.value;
    this.props.onSelect(null, this.props.inputNumber)
    this.setState(getState(event.target.value));
  },

  /**
   * @param  {object} event
   */
  // _onKeyDown: function(event) {
  //   if (event.keyCode === ENTER_KEY_CODE) {
  //     this.props.onSave();
  //     //this._save();
  //   }
  // }

});

module.exports = AddURLInput;