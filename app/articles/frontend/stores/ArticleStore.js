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
var csrfTag = document.getElementById("csrf-token");
var csrfToken = csrfTag ? csrfTag.dataset.csrf:null;
var CHANGE_EVENT = 'change';
var _history = [];
var _todos = Immutable.OrderedMap();
var urlBase = '/apigraph/articles/';
var errorObj = require('./errorHandle');

var ArticleRecord = Immutable.Record({
  id : null,
  title : null,
  username: null,
  url: null,
  description:null,
  user: null,
  tags:null
});

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function create(url) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // Using the current timestamp + random number in place of a real id.
  $.ajax({
    method: "POST",
    url: urlBase,
    data: {url:url,_csrf:csrfToken}
  })
  .done(function( result ) {
    _todos = _todos.set(result._id, new ArticleRecord({id : result._id, url : result.url, username: 'userHolder'}));
    ArticleStore.emitChange();
  }).error(errorObj.errHandle);
}

function addHistoryEntry() {
  _history.push(_todos);
}

function goToHistory(index) {
  _todos = _history[index];
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
    _todos = _todos.set(id, _todos.get(id).merge(result));
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
  for (var id in _todos.toObject()) {
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
    _todos = _todos.delete(id);
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
  for (var id in _todos.toObject()) {
    if (_todos.getIn([id, 'complete'])) {
      destroy(id);
    }
  }
}

/**
 * Get the entire collection of from server.
 * @return {object}
 */
function fetchOne(id) {
    var that= this
    if (!id) return {}; ///return nothing if there is not record.
    $.get(urlBase+id, function(result) {
      _todos = _todos.set(id, new ArticleRecord(result));
      ArticleStore.emitChange();
    })
};

var ArticleStore = assign({}, EventEmitter.prototype, {


  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _todos.toObject();
  },
  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getOneById: function(id) {
    var record = _todos.get(id)
    if (!id || !record ) return {}; ///return nothing if there is not record.
    return record.toObject()
  },

  /**
   * Get the entire collection of from server.
   * @return {object}
   */
  fetchAll: function() {
      var that= this
      $.ajax({
        method: "GET",
        url: urlBase,
      })
      .done(function( results ) {
        results.forEach(function(item){
                item.username=item.user?item.user.username:null; /// Copy over _id to id.
                _todos = _todos.set(item.id, new ArticleRecord(item));
        });           
        ArticleStore.emitChange();
      }).error(errorObj.errHandle);
  },


  getHistory : function () {
    return _history;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
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
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case TodoConstants.TODO_CREATE:
      url = action.url.trim();
      if (url !== '') {
        create(url);
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

    case TodoConstants.TODO_FETCH:
      fetchOne(action.id);
      break;

    default:
      // no op
  }
});


module.exports = ArticleStore;