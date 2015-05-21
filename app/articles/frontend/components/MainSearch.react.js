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
var NoQuery = require('./NoQuery.react');
var Query = require('./Query.react');



var MainSearch = React.createClass({
  render: function() {
    var Render = this.props.query.q? Query:NoQuery;
    return (<Render query={this.props.query} />)
    }
});

module.exports = MainSearch;
