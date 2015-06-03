/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var cx = require('classnames');

var ReactPropTypes = React.PropTypes;



var AutoCompleteItem = React.createClass({
  propTypes: {
    post: ReactPropTypes.object.isRequired,
    onSelect: ReactPropTypes.func.isRequired,
    inputNumber: ReactPropTypes.number,
  },

  /**
   * @return {object}
   */
  render: function() {
    var post = this.props.post
    return (
      <a href="javascript:void(0);" onClick={this._onClick} >
        <ul  className={cx({
          selected:this.props.selected
        })+" row sixteen marginZero connectionBox"}>
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
      </a>
      );
  },

  _onClick:function(event){
    var inputNumber = this.props.inputNumber;
    var url = this.props.post.url;

    if (this.props.post.id){
      this.props.onSelect(this.props.post, this.props.inputNumber);
    }
    
    // this.props.setSelected(this.props.post.id)
  }

});

module.exports = AutoCompleteItem;