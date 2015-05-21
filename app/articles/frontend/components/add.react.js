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
    return (<div>placeHolder Add<div>)
    }
});

module.exports = MainSearch;
