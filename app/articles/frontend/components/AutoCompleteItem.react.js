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

var AutoCompleteItem = React.createClass({

  mixins: [Navigation],

  propTypes: {
    post: ReactPropTypes.object.isRequired,
    onSelect: ReactPropTypes.func.isRequired,
    keyValue: ReactPropTypes.string.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    var post = this.props.post
    return (
        <ul onClick={this._onClick} className="row sixteen marginZero connectionBox">
          <li className="columns six">
            <div className="leftBox">
              <ul className="row sixteen marginZero">
                <li className="columns four addIconBox"><img className="addIcon" src="img/twitter_bird.png" /></li>
                <li className="columns twelve nodeTitleBox">
                  <div className="nodeTitle">
                  </div>
                  <div className="nodeUrl">
                  {post.url}</div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      );
  },
  _onClick:function(event){
    
    var keyValue = this.props.keyValue;
    var url = this.props.post.url;
    this.props.onSelect(url, keyValue)
  }

});

module.exports = AutoCompleteItem;