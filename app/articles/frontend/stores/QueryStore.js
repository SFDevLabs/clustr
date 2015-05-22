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
var urlBase = '/api/query/'
var errorObj = require('./errorHandle');
var _result = Immutable.Map()
var QueryRecord = Immutable.Record({
  id : null,
  title : null,
  username: null,
  url: null,
  description:null,
  user: null,
  tags:null
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
  .done(function( result ) {
    result.username=result.user?result.user.username:null;
    _result = _result.merge(result);
    QueryStore.emitChange();
  }).error(errorObj.errHandle);

}

function destroyWithHistory(id) {
  addHistoryEntry();
  destroy(id);
}

var QueryStore = assign({}, EventEmitter.prototype, {


  /**
   * @param {function} callback
   */
  getResult : function () {
    return _result.toObject();
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


    default:
      // no op
  }
});


module.exports = QueryStore;