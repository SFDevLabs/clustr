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
var AutoComplete = require('./AutoComplete.react');

var AddURLInput = React.createClass({

  mixins: [Navigation],
  propTypes: {
    onSave: ReactPropTypes.func.isRequired,
    onChange: ReactPropTypes.func.isRequired,
    value: ReactPropTypes.string.isRequired,
    keyValue: ReactPropTypes.string.isRequired
  },


  /**
   * @return {object}
   */
  render: function() {
    return (
            <li className="columns six">
              <div className="leftBox border url-add-parent">
                <ul className="row sixteen marginZero">
                  <li className="columns four url-input">
                  <input
                    type="text" 
                    placeholder={this.props.placeholder}
                    onChange={this.props.onChange}
                    onKeyDown={this._onKeyDown}
                    value={this.props.value}
                    autoFocus={true}
                    data-key = {this.props.keyValue}
                  />
                  </li>
                </ul>
                <AutoComplete query={this.props.value}/>
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
  _onChangeOne: function(event) {
    // debugger
    // this.setState({
    //   valueOne: event.target.value,
    // });
  },

  /**
   * @param {object} event
   */
  _onChangeTwo: function(event) {
    // this.setState({
    //   valueTwo: event.target.value
    // });
  },

  /**
   * @param  {object} event
   */
  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this.props.onSave();
      //this._save();
    }
  }

});

module.exports = AddURLInput;