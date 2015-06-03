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
var ArticleActions = require('../actions/ArticleActions');
var Link = require('react-router').Link;

var cx = require('react/lib/cx');

var ArticleItem = React.createClass({

  propTypes: {
   item: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      isEditing: false
    };
  },

  /**
   * @return {object}
   */
  render: function() {
    var item = this.props.item;
    var siteToLink="/"+item.siteTo.id;
    var siteFromLink="/"+item.siteFrom.id;
    return (
      <div>
          <ul className="row sixteen marginZero connectionBox">
              <li className="columns three"><img src="img/blank.png" /></li>
              <li className="columns ten">
                <ul className="row sixteen marginZero connection">
                  <Link to={siteToLink}>
                    <li className="columns six">
                      <div className="leftBox">
                        <ul className="row sixteen marginZero">
                          <li className="columns four addIconBox"><img className="addIcon" src={item.siteTo.favicon} /></li>
                          <li className="columns twelve nodeTitleBox">
                            <div className="nodeTitle">{item.siteTo.title}
                            </div>
                            <div className="nodeUrl">{item.siteTo.url}</div>
                            
                          </li>
                        </ul>
                      </div>
                    </li>
                  </Link>
                  <li className="columns three"><img className="connectMetaphor" src="img/connect_metaphor.png" /></li>
                  <Link to={siteFromLink}>
                    <li className="columns six">
                      <div className="rightBox">
                        <ul className="row sixteen marginZero">
                          <li className="columns four addIconBox"><img className="addIcon" src={item.siteFrom.favicon}  /></li>
                          <li className="columns twelve nodeTitleBox">
                            <div className="nodeTitle">{item.siteFrom.title}
                            </div>
                            <div className="nodeUrl">{item.siteFrom.url}</div>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </Link>
                </ul>
              </li>
              <li className="columns three"><img src="img/blank.png" /></li>
          </ul>
      </div>
    );
  },


  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param  {string} text
   */
  _onSave: function(text) {
    ArticleActions.updateText(this.props.item.id, text);
    this.setState({isEditing: false});
  },

  _onDestroyClick: function() {
    ArticleActions.destroy(this.props.item.id);
  }

});

module.exports = ArticleItem;
