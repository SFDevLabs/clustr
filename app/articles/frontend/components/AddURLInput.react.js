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

var Grid = require('react-bootstrap').Grid;
var Col = require('react-bootstrap').Col;
var Row = require('react-bootstrap').Row;

var Input = require('react-bootstrap').Input;

function getState(value) {
  return {
    value: value
  };
}

var AddURLInput = React.createClass({

  propTypes: {
    inputNumber: ReactPropTypes.number.isRequired,
    selectItemID: ReactPropTypes.number,
    onSelect: ReactPropTypes.func,
    excludeItemID: ReactPropTypes.number,
    clearInputs: ReactPropTypes.func
  },

  getInitialState: function() {
    return getState('');
  },

  componentWillReceiveProps: function(newProps) {
    if  ( newProps.clearInputs &&  newProps.clearInputs() ){
      this.setState(getState(''));
    }
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
              <div className="midCol inputBox">
                <Input
                    className="addURLInput"
                    type="text"
                    placeholder={this.props.placeholder}
                    onChange={this._onChange}
                    onKeyDown={this._onKeyDown}
                    value={this.state.value}
                    autoFocus={this.props.autoFocus}
                  />
                <AutoComplete
                  className="responseBox"
                  selectItemID={this.props.selectItemID}
                  excludeItemID={this.props.excludeItemID}
                  query={this.state.value}
                  onSelect={this.props.onSelect}
                  inputNumber={this.props.inputNumber}
                  />
              </div>
    );
  },

  /**
  * @param {object} event
  */
  _onChange: function(/*object*/ event, key) {
    this.setState(getState(event.target.value));
  }

});

module.exports = AddURLInput;