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
var ArticleActions = require('../actions/ArticleActions');
var URLSearchInput = require('./URLSearchInput.react');
var Item = require('./Item.react');

/**
 * Retrieve the current TODO data from the ArticleStore
 */
function getArticleState() {
  return {
    allPosts: ArticleStore.getAll(),
  };
}


var ArticleApp = React.createClass({

  getInitialState: function() {
    return getArticleState();
  },

  componentDidMount: function() {
    ArticleStore.addChangeListener(this._onChange);
    ArticleStore.fetchAll();
  },

  componentWillUnmount: function() {
    ArticleStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  // render: function() {
  // 	return (
  //     <div>
  //       <MainSection
  //       allPosts={this.state.allPosts}
  //       />
  //     </div>
  // 	);
  // },

  render: function() {
      // if (Object.keys(this.props.allPosts).length < 1) {
      //   return null;
      // }

      var allPosts = this.state.allPosts;
      var posts = [];

      var search = (
        <div className="mainBody">
          Site Search
        </div>
      );

      for (var key in allPosts) {
        posts.unshift(<Item key={key} item={allPosts[key]} />);
      }
      var home = (
        <div className="mainBody">
          <div className="row sixteen logoArea">
            <span className="columns four"><img src="/img/blank.png" /></span>
            <span className="columns eight mainLogo"><img className="mainAddButton" src="/img/circleAddButton.png" /></span>
            <span className="columns four"><img src="/img/blank.png" /></span>
          </div>

          <div className="row recentClustrSearches">
            <div className="recentSearchesTitle">Recent Connections:
            </div>


            <ul className="row sixteen marginZero connectionBox">
              <li className="columns three"><img src="img/blank.png" /></li>
              <li className="columns ten">
                <ul className="row sixteen marginZero connection">
                  <li className="columns six">
                    <div className="leftBox">
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
                    <div className="rightBox">
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
                    <div className="leftBox">
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
                    <div className="rightBox">
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


            <ul className="row sixteen marginZero connectionBox">
              <li className="columns three"><img src="img/blank.png" /></li>
              <li className="columns ten">
                <ul className="row sixteen marginZero connection">
                  <li className="columns six">
                    <div className="leftBox">
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
                    <div className="rightBox">
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
                    <div className="leftBox">
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
                    <div className="rightBox">
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
        </div>
      );

      return home
    },

  /**
   * Event handler for 'change' events coming from the ArticleStore
   */
  _onChange: function() {
    this.setState(getArticleState());
  },
  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param {string} text
   */
  _onSave: function(text) {
    if (text.trim()){
      ArticleActions.create(text);
    }
  }

});

module.exports = ArticleApp;
