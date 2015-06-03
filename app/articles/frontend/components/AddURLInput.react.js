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
    inputNumber: ReactPropTypes.number.isRequired,
    selectItemID: ReactPropTypes.number,
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
    return (
            <li className="columns six">
              <div className="leftBox border url-add-parent">
                <ul className="row six marginZero">
                  <li className="columns four url-input">
                  <input
                    type="text" 
                    placeholder={this.props.placeholder}
                    onChange={this._onChange}
                    onKeyDown={this._onKeyDown}
                    value={this.state.value}
                    autoFocus={this.props.autoFocus}
                  />
                  </li>
                </ul>
                <AutoComplete selectItemID={this.props.selectItemID} excludeItemID={this.props.excludeItemID} query={this.state.value} onSelect={this.props.onSelect} inputNumber={this.props.inputNumber} />
              </div>
            </li>
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