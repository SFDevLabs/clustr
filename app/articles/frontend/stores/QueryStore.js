/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * QueryStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var QueryConstants = require('../constants/QueryConstants');
var assign = require('object-assign');
var Immutable = require('immutable');
var $ = require('jquery');
var csrfTag = document.getElementById("csrf-token");
var csrfToken = csrfTag ? csrfTag.dataset.csrf:null;
var CHANGE_EVENT = 'change';
var _history = [];
var urlBase = '/apigraph/query/'
var errorObj = require('./errorHandle');
var _results = Immutable.Map()
var QueryRecord = Immutable.Record({
  id : null,
  url: null
});


function addHistoryEntry() {
  _history.push(_result);
}

function goToHistory(index) {
  _result = _history[index];
}

/**
 * Make a Query.
 * @param  {string} id
 */
function query(url) {
  $.ajax({
    method: "GET",
    url: urlBase,
    data: {_csrf:csrfToken, url:url}
  })
  .done(function( results ) {
    //result.username=result.user?result.user.username:null;
    results.forEach(function(result){
      _results = _results.set(result.id, new QueryRecord(result))
    });
    QueryStore.emitChange();
  }).error(errorObj.errHandle);
}

function destroyWithHistory(id) {
  addHistoryEntry();
  destroy(id);
}

function clearAll () {
    _results = _results.clear();
}

var QueryStore = assign({}, EventEmitter.prototype, {


  /**
   * @param {function} callback
   */
  getResult : function () {
    return _results.toObject();
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

    case QueryConstants.QUERY:
      text = action.text.trim();
      if (text !== '') {
        query(text);
      }
      break;
    case QueryConstants.CLEAR_ALL:
      clearAll();
      break;


    default:
      // no op
  }
});


module.exports = QueryStore;