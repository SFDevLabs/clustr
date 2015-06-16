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
 * the QueryStore and passes the new data to its children.
 */

var React = require('react');
var Link = require('react-router').Link;
var Loader = require('react-loader');
var URLQueryResult = require('./URLQueryResult.react');
var SiteConnections = require('./SiteConnections.react');
var ImageLoader = require('react-imageloader');
var AddURLInput = require('./AddURLInput.react');

var ArticleStore = require('../stores/ArticleStore');
var ArticleActions = require('../actions/ArticleActions');

var utils = require('../../../main/frontend/utils');
var Immutable = require('immutable');
var _inputs = Immutable.OrderedMap();
var Navigation = require('react-router').Navigation;
var cx = require('classnames');

/**
 * Retrieve the current TODO data from the ArticleStore
 */
function getQueryState(id) {
  id = Number(id);
  if (isNaN(id))return {};
  return {
    post: ArticleStore.getOneNodeById(id),
    relations: ArticleStore.getOneNodeRelationsById(id),
    inputs: getInputState()
  };
}

function setInput(data, inputNumber){
  _inputs = _inputs.set(inputNumber, new InputRecord(data) );
}

function clearInput(){
  _inputs = _inputs.set(0, new InputRecord({}) );
  _inputs = _inputs.set(1, new InputRecord({}) );
}

function destroy(id) {
  _inputs = _inputs.delete(id);
}

var InputRecord = Immutable.Record({
  id : null,
  url : null,
  title: null
});

function getInputState(){
  return _inputs.toJSON();
}


var Query = React.createClass({
  
  getInitialState: function() {
    if (!utils.isLoggedIn()){utils.loginRedirect('/login')};
    return getQueryState(this.props.params.id);
  },

  componentDidMount: function() {
    ArticleStore.addChangeListener(this._onChange);
    ArticleStore.addSaveListener(this._onChange);
    ArticleActions.fetch(this.props.params.id);
  },

  componentWillUnmount: function() {
    ArticleStore.removeChangeListener(this._onChange);
    ArticleStore.removeSaveListener(this._onChange);
  },

  componentWillReceiveProps: function(newProps) {
    ArticleActions.fetch(newProps.params.id);
  },

  _imageLoadError : function(e){
    e.target.src="img/fallback.ico"
  },

  /**
   * @return {object}
   */

  render: function() {
    var post = this.state.post;
    var relations = this.state.relations;
    var relation= [];
    for (var key in relations) {
      relation.unshift(<SiteConnections key={key} post={relations[key]} />);
    }
    var item = this.state.inputs[1];
    var selectItemIdOne = post.id? post.id:null;
    var selectItemIdTwo = item? item.id:null;
    //var item = post.USEREDGE?(<Item item={post} />):null;  ///Check that we have a full response.
    return (
      <div className="row searchResults">
        <div className="searchResultBox">
          <ul className="row marginZero">
            <li className="columns four marginZero"><img src="img/blank.png" /></li>
            <li className="columns eight searchResult">
              <div className="columns sixteen">
                <ul className="row sixteen marginZero">
                  <li className="columns three"><ImageLoader className="searchResultImg" src={post.favicon} onError={this._imageLoadError} />
                  </li>
                  <li className="columns eleven searchResultText">
                    <div className="searchResultTitle">{post.title}</div>
                    <div className="searchResultURL">{post.url}</div>
                  </li>
                  <li className="columns two userSubmission"><ImageLoader className="userSubmissionImg" src="/img/eoin_profile.jpg" onError={this._imageLoadError}/>{post.username}</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <hr/>
        <AddURLInput onSelect={this._onSelect} selectItemID={selectItemIdTwo} excludeItemID={selectItemIdOne} inputNumber={1} autoFocus={false} clearInputs={this._clearInputs} />
        <li className="columns one url-submit">
        <a href="javascript:void(0);" onClick={this._onClick} className="querySubmit" type="submit" value="Submit" >
              <ul className={cx({active:this._canCreateEdge()})+" row sixteen marginZero"}>
                Connect
              </ul>
            </a>
         </li>
        {relation}
      </div>)
    
  },

  /**
  * Tells the AddURLInput to clear its inputs inside the componentWillReceiveProps function
  * * @param {boolean} User to set the clear to true for the next render pass. Flipped to false automaitcally after values are cleared
  */
  _clearInputs:function(val){
    if (val) { // Set the clear bool for the next render pass
      this._clearBool=true
    }else if (this._clearBool){ // return true for the clear and set the 
      this._clearBool=false
      return true
    } else { // return false no need to clear the inputs
      return this._clearBool
    }
  },
  _clearBool: false, //hard coded
  /**
   * Event handler for 'change' events coming from the ArticleStore
   */
  _onChange: function() {
    this.setState(getQueryState(this.props.params.id));
  },

  /**
  * Invokes save to the server 
  */
  _onSave: function(inputs) {
        ArticleActions.create(inputs);
        this._clearInputs(true);
  },

  /**
  * Invokes the callback passed in as onSave, allowing this component to be
  * used in different ways.
  */
  _onClick: function() {
    //if (this._canCreateEdge()){
      var inputs = {
        0: this.state.post,
        1: getInputState()[1]
      };
      this._onSave(inputs)
    //}
  },
  /**
  * Invokes the callback passed in as onSave, allowing this component to be
  * used in different ways.
  */
  _canCreateEdge: function() {
    return this.state[0]!==undefined && this.state[1]!==undefined && this.state[0].url!==null && this.state[0].url!==null
  },

  /**
  * Event handler for 'change' events coming from the ArticleStore
  */
  _saveComplete: function() {
    //var id = getInputState()[0].id
    this.transitionTo('articles',{},{});
  },
  /**
  * @param {object} event
  */
  _onSelect: function(data, inputNumber) {
    setInput(data, inputNumber);
    this.setState(getQueryState(this.props.params.id));
  }
  // _onSave: function(text) {
  //   ArticleActions.updateText(this.props.query, text);
  // },

  // _onDestroyClick: function() {
  //   ArticleActions.destroy(this.props.query);
  // }

});

module.exports = Query;
