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

  componentDidMount: function() {
    if (this.props.selected){
      this.props.onSelect(this.props.post, this.props.inputNumber);
    }
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
        })+" row six marginZero connectionBox"}>
          <li className="columns sixteen">
            <div className="leftBox">
              <ul className="row  marginZero">
                <li className="columns two addIconBox"><img className="addIcon" src="img/twitter_bird.png" /></li>
                <li className="columns fourteen nodeTitleBox">
                  <div className="nodeTitle truncate">
                  {post.title}
                  </div>
                  <div className="nodeUrl truncate">
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