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
var ItemInput = require('./ItemInput.react');
var ArticleActions = require('../actions/ArticleActions');




var MainSearch = React.createClass({
  render: function() {
    return (
      <div className="addPageContainer">
        <ul className="row sixteen marginZero connection">
          <li className="columns three"><img src="img/blank.png" /></li>
          <li className="columns four">
            <div className="leftBox">
              <ul className="row sixteen marginZero">
                <li className="columns four addIconBox"><img className="addIcon" src="img/twitter_bird.png" /></li>
                <li className="columns ten nodeTitleBox">
                  <div className="nodeTitle">Twitter.com
                  </div>
                  <div className="nodeUrl">http://Twitter.com</div>
                </li>
                <li className="columns two"><img src="img/blank.png" /></li>
              </ul>
            </div>
          </li>
          <li className="columns two"><img className="connectMetaphor" src="img/connect_metaphor.png" /></li>
          <li className="columns four">
            <div className="rightBox">
              <ul className="row sixteen marginZero">
                <li className="columns four addIconBox"><img className="addIcon" src="img/foursquare.png" /></li>
                <li className="columns ten nodeTitleBox">
                  <div className="nodeTitle">Foursquare.com
                  </div>
                  <div className="nodeUrl">http://foursquare.com</div>
                </li>
                <li className="columns two"><img src="img/blank.png" /></li>
              </ul>
            </div>
          </li>
          <li className="columns three"><img src="img/blank.png" /></li>
        </ul>

        <ul className="row sixteen marginZero connection">
          <li className="columns three"><img src="img/blank.png" /></li>
          <li className="columns four">
            <div className="leftBox">
              <ul className="row sixteen marginZero">
                <li className="columns four addIconBox"><img className="addIcon" src="img/pinkPanther.jpg" /></li>
                <li className="columns ten nodeTitleBox">
                  <div className="nodeTitle">The Pink Panther
                  </div>
                  <div className="nodeUrl">http://www.amazon.com/Pink-Panther-Shawn-Levy/dp/B001ML9LSS/ref=sr_1_1?ie=UTF8&qid=1432189177&sr=8-1&keywords=pink+panther</div>
                </li>
                <li className="columns two"><img src="img/blank.png" /></li>
              </ul>
            </div>
          </li>
          <li className="columns two"><img className="connectMetaphor" src="img/connect_metaphor.png" /></li>
          <li className="columns four">
            <div className="rightBox">
              <ul className="row sixteen marginZero">
                <li className="columns four addIconBox"><img className="addIcon" src="img/OSS_117.jpg" /></li>
                <li className="columns ten nodeTitleBox">
                  <div className="nodeTitle">OSS 117
                  </div>
                  <div className="nodeUrl">http://dvd.netflix.com/Movie/OSS-117-Cairo-Nest-of-Spies/70101687</div>
                </li>
                <li className="columns two"><img src="img/blank.png" /></li>
              </ul>
            </div>
          </li>
          <li className="columns three"><img src="img/blank.png" /></li>
        </ul>

      </div>
      );
    }
});

module.exports = MainSearch;
