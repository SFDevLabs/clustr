/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * ArticleStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/ArticleConstants');
var assign = require('object-assign');
var Immutable = require('immutable');
var $ = require('jquery');
var CHANGE_EVENT = 'change';
var SAVE_EVENT = 'save';
var _history = [];
var _nodes = Immutable.OrderedMap();
var _edges = Immutable.OrderedMap();
var urlBase = '/apigraph/articles/';
var errorObj = require('../../../main/frontend/errorHandle');
var utils = require('../../../main/frontend/utils');
var csrfToken = utils.getCsrfToken()




var EdgeRecord = Immutable.Record({
  siteFromId: null,
  siteToId: null,
  id:null
});

var NodeRecord = Immutable.Record({
  id:null,
  url:null,
  title:null,
  favicon:null
});

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function create(urlOne, urlTwo, nodeIDOne, nodeIDTwo) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // Using the current timestamp + random number in place of a real id.
  $.ajax({
    method: "POST",
    url: urlBase,
    data: {
      urlOne:urlOne,
      urlTwo:urlTwo,
      nodeIDOne:nodeIDOne, 
      nodeIDTwo:nodeIDTwo, 
      _csrf:csrfToken}
  })
  .done(function( result ) {
    //_nodes = _nodes.set(result._id, new ArticleRecord({id : result._id, url : result.url, username: 'userHolder'}));

    ArticleStore.emitSave(result);
  }).error(errorObj.errHandle);
}

function addHistoryEntry() {
  _history.push(_nodes);
}

function goToHistory(index) {
  _nodes = _history[index];
}

/**
 * Update a TODO item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
  var postupdates = $.extend({_csrf:csrfToken}, updates);
  $.ajax({
    method: "PUT",
    url: urlBase+id,
    data: postupdates
  })
  .done(function( result ) {
    var id = result._id;
    delete result._id
    delete result.__v
    _nodes = _nodes.set(id, _nodes.get(id).merge(result));
    ArticleStore.emitChange();
  }).error(errorObj.errHandle);
}

function updateWithHistory(id, updates) {
  addHistoryEntry();
  update(id, updates);
}

/**
 * Update all of the TODO items with the same object.
 *     the data to be updated.  Used to mark all TODOs as completed.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.

 */
function updateAll(updates) {
  addHistoryEntry();
  for (var id in _nodes.toObject()) {
    update(id, updates);
  }
}
/**
 * Delete a TODO item.
 * @param  {string} id
 */
function destroy(id) {
  $.ajax({
    method: "DELETE",
    url: urlBase+id,
    data: {_csrf:csrfToken}
  })
  .done(function( msg ) {
    _nodes = _nodes.delete(id);
    ArticleStore.emitChange();
  }).error(errorObj.errHandle);
}

function destroyWithHistory(id) {
  addHistoryEntry();
  destroy(id);
}

/**
 * Delete all the completed TODO items.
 */
function destroyCompleted() {
  addHistoryEntry();
  for (var id in _nodes.toObject()) {
    if (_nodes.getIn([id, 'complete'])) {
      destroy(id);
    }
  }
};

  /**
   * Get the entire collection of from server.
   * @return {object}
   */
function fetchAllRelations() {
      $.ajax({
        method: "GET",
        url: urlBase,
      })
      .done(function( results ) {
        results.USEREDGE.forEach(function(item){
          _edges = _edges.set(item.id, new EdgeRecord(item) );
        });

        results.Sites.forEach(function(item){
          
          item.favicon = 'http://'+url_domain(item.url)+'/favicon.ico'
          
          _nodes = _nodes.set(item.id, new NodeRecord(item) );        
        });
                
        ArticleStore.emitChange();
      }).error(errorObj.errHandle);
};

function fetchOne(id) {
    var that= this
    if (!id) return {}; ///return nothing if there is not record.
    $.ajax({
        method: "GET",
        url: urlBase+id,
    })
    .done(function( results ) {
      results.USEREDGE.forEach(function(item){
        _edges = _edges.set(item.id, new EdgeRecord(item) );
      });

      results.Sites.forEach(function(item){
          item.favicon = 'http://'+url_domain(item.url)+'/favicon.ico'
          _nodes = _nodes.set(item.id, new NodeRecord(item) );        
      });

      ArticleStore.emitChange();
    })
}

function url_domain(data) {
  var    a      = document.createElement('a');
         a.href = 'https://'+data;
         debugger
  return a.hostname.replace(/^[^.]+\./g, "");
}

var ArticleStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAllEdges: function() {
    var mappedEdges = _edges.map(function(obj){
      var item = {};
      item.siteFrom = ArticleStore.getOneNodeById(obj.siteFromId) 
      item.siteTo = ArticleStore.getOneNodeById(obj.siteToId) 
      return item;
    });
    return mappedEdges.toObject();
  },
  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getOneNodeById: function(id) {
    var record = _nodes.get(id)
    if (!id || !record ) return {}; ///return nothing if there is not record.
    return record.toObject();
  },

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getOneNodeById: function(id) {
    var record = _nodes.get(id)
    if (!id || !record ) return {}; ///return nothing if there is not record.
    return record.toObject();
  },

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getOneNodeRelationsById: function(id) {
    var record = _nodes.get(id)
    if (!id || !record ) return {}; ///return nothing if there is not record.
    var NODE_USEREDGE = _edges.filter(function(obj){
      return id===obj.siteFromId;
    }).map(function(obj){
      var item = {};
      item.siteTo = ArticleStore.getOneNodeById(obj.siteToId);
      return item
    });

    return NODE_USEREDGE.toObject();;
  },

  getHistory : function () {
    return _history;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  emitSave: function(edgeId) {
    this.emit(SAVE_EVENT,edgeId);
  },


  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  addSaveListener: function(callback) {
    this.on(SAVE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeSaveListener: function(callback) {
    this.removeListener(SAVE_EVENT, callback);
  }

});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case TodoConstants.TODO_CREATE:
      var urlOne = action.urlOne.trim();
      var urlTwo = action.urlTwo.trim();
      if (urlOne !== '' && urlTwo !== '') {
        create(urlOne, urlTwo);
      }
      break;

    case TodoConstants.TODO_HISTORY_SET:
      goToHistory(action.index);
      ArticleStore.emitChange();
      break;

    case TodoConstants.TODO_UPDATE:
      text = action.text.trim();
      if (text !== '') {
        updateWithHistory(action.id, {text: text});
      }
      break;

    case TodoConstants.TODO_DESTROY:
      destroyWithHistory(action.id);
      break;

    case TodoConstants.RELATIONS_FETCHALL:
      fetchAllRelations(action.id);
      break;

    case TodoConstants.TODO_FETCH:
      fetchOne(action.id);
      break;

    default:
      // no op
  }
});


module.exports = ArticleStore;