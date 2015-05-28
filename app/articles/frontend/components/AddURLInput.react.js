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

 

var URLInput = React.createClass({

  mixins: [Navigation],
  propTypes: {
    onSave: ReactPropTypes.func.isRequired,
  },

  getInitialState: function() {
    return {
      value: ''
    };
  },

  /**
   * @return {object}
   */
  render: function() {
    return (

      <ul className="row sixteen marginZero connectionBox">
        <li className="columns three"><img src="img/blank.png" /></li>
        <li className="columns ten">
          <ul className="row sixteen marginZero connection">
            <li className="columns six">
              <div className="leftBox border">
                <ul className="row sixteen marginZero">
                  <li className="columns four url-input">
                  <input
                    type="text" 
                    name={this.props.name}
                    className={this.props.className}
                    id={this.props.id}
                    placeholder={this.props.placeholder}
                    onChange={this._onChangeOne}
                    onKeyDown={this._onKeyDown}
                    value={this.state.valueOne}
                    autoFocus={true}
                  />
                  </li>
                </ul>
              </div>
            </li>
            <li className="columns three"><img className="connectMetaphor" src="img/connect_metaphor.png" /></li>
            <li className="columns six">
              <div className="rightBox border">
                <ul className="row sixteen marginZero">
                  <li className="columns four url-input">
                  <input
                    type="text" 
                    name={this.props.name}
                    className={this.props.className}
                    id={this.props.id}
                    placeholder={this.props.placeholder}
                    onChange={this._onChangeTwo}
                    onKeyDown={this._onKeyDown}
                    value={this.state.valueTwo}
                    autoFocus={true}
                  />
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </li>
        <li className="columns three"><img src="img/blank.png" /></li>
      </ul>
    );
  },

  /**
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways.
   */
  _save: function() {
    if(this.state.valueOne && this.state.valueTwo){// Success we have both URLS
      this.props.onSave(this.state.valueOne, this.state.valueTwo); //We pass them to the save function
      // this.setState({//Reset the Front
      //   valueOne: '',
      //   valueTwo: ''
      // });
    };
  },

  /**
   * @param {object} event
   */
  _onChangeOne: function(event) {
    this.setState({
      valueOne: event.target.value,
    });
  },

  /**
   * @param {object} event
   */
  _onChangeTwo: function(event) {
    this.setState({
      valueTwo: event.target.value
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

module.exports = URLInput;