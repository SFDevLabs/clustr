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


var MainSearch = React.createClass({

	propTypes: {
		value: ReactPropTypes.string
	},

	getInitialState: function() {
		return {
		  value: this.props.value || ''
		};
	},

	render: function() {
	return (
	  <div className="addPageContainer">

      <ul className="row sixteen marginZero connectionBox">
        <li className="columns three"><img src="img/blank.png" /></li>
        <li className="columns ten">
          <ul className="row sixteen marginZero connection">
            <li className="columns six">
              <div className="leftBox border">
                <ul className="row sixteen marginZero">
                  <li className="columns four url-input">
                    <AddURLInput
                    onSave={this._onSave}
                    type="text"
                    placeholder="Input a URL"
                    onChange={this._onChange}
                    onKeyDown={this._onKeyDown}
                    value={this.state.value}
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
                    <AddURLInput
                    onSave={this._onSave}
                    type="text"
                    placeholder="Input a URL"
                    onChange={this._onChange}
                    onKeyDown={this._onKeyDown}
                    value={this.state.value}
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


	    <ul className="row sixteen marginZero connectionBox">
	      <li className="columns three"><img src="img/blank.png" /></li>
        <li className="columns ten">
          <ul className="row sixteen marginZero connection">
            <li className="columns six">
              <div className="leftBox border">
                <ul className="row sixteen marginZero">
                  <li className="columns four addIconBox"><img className="addIcon" src="img/twitter_bird.png" /></li>
                  <li className="columns twelve nodeTitleBox">
                    <div className="nodeTitle">Twitter.com
                    </div>
                    <div className="nodeUrl">http://Twitter.com</div>
                  </li>
                </ul>
              </div>
            </li>
            <li className="columns three"><img className="connectMetaphor" src="img/connect_metaphor.png" /></li>
            <li className="columns six">
              <div className="rightBox border">
                <ul className="row sixteen marginZero">
                  <li className="columns four addIconBox"><img className="addIcon" src="img/foursquare.png" /></li>
                  <li className="columns twelve nodeTitleBox">
                    <div className="nodeTitle">Foursquare.com
                    </div>
                    <div className="nodeUrl">http://foursquare.com</div>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </li>
	      <li className="columns three"><img src="img/blank.png" /></li>
	    </ul>

      <ul className="row sixteen marginZero connectionBox">
        <li className="columns three"><img src="img/blank.png" /></li>
        <li className="columns ten">
          <ul className="row sixteen marginZero connection">
            <li className="columns six">
              <div className="leftBox border">
                <ul className="row sixteen marginZero">
                  <li className="columns four addIconBox"><img className="addIcon" src="img/pinkPanther.jpg" /></li>
                  <li className="columns twelve nodeTitleBox">
                    <div className="nodeTitle">The Pink Panther
                    </div>
                    <div className="nodeUrl">http://www.amazon.com/Pink-Panther-Shawn-Levy/dp/B001ML9LSS/ref=sr_1_1?ie=UTF8&qid=1432189177&sr=8-1&keywords=pink+panther</div>
                  </li>
                </ul>
              </div>
            </li>
            <li className="columns three"><img className="connectMetaphor" src="img/connect_metaphor.png" /></li>
            <li className="columns six">
              <div className="rightBox border">
                <ul className="row sixteen marginZero">
                  <li className="columns four addIconBox"><img className="addIcon" src="img/OSS_117.jpg" /></li>
                  <li className="columns twelve nodeTitleBox">
                    <div className="nodeTitle">OSS 117
                    </div>
                    <div className="nodeUrl">http://dvd.netflix.com/Movie/OSS-117-Cairo-Nest-of-Spies/70101687</div>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </li>
        <li className="columns three"><img src="img/blank.png" /></li>
      </ul>


      <ul className="row sixteen marginZero connectionBox">
        <li className="columns three"><img src="img/blank.png" /></li>
        <li className="columns ten">
          <ul className="row sixteen marginZero connection">
            <li className="columns six">
              <div className="leftBox">
                <ul className="row sixteen marginZero">
                  <li className="columns four addIconBox"><img className="addIcon" src="img/britneymadonna.png" /></li>
                  <li className="columns twelve nodeTitleBox">
                    <div className="nodeTitle">Britney Spears Madonna Kiss
                    </div>
                    <div className="nodeUrl">http://mewarnai.us/486442-britney-spears-madonna-kiss</div>
                  </li>
                </ul>
              </div>
            </li>
            <li className="columns three"><img className="connectMetaphor" src="img/connect_metaphor.png" /></li>
            <li className="columns six">
              <div className="rightBox">
                <ul className="row sixteen marginZero">
                  <li className="columns four addIconBox"><img className="addIcon" src="img/kanyekanye.png" /></li>
                  <li className="columns twelve nodeTitleBox">
                    <div className="nodeTitle">Kanye West Kissing Himself
                    </div>
                    <div className="nodeUrl">http://firsttoknow.com/kanye-west-kissing-himself-photo/</div>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </li>
        <li className="columns three"><img src="img/blank.png" /></li>
      </ul>

	  </div>
	  )
	},


	/**
	* Invokes the callback passed in as onSave, allowing this component to be
	* used in different ways.
	*/
	_onSave: function(text) {
		if (text.trim()){
		  ArticleActions.create(text);
		}
	},

	/**
	* @param {object} event
	*/
	_onChange: function(/*object*/ event) {
		debugger
		this.setState({
		  value: event.target.value
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

module.exports = MainSearch;
