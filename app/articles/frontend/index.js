// Index for module.All starts here
"use strict";

var React = require('react');
var TodoApp = require('./components/TodoApp.react');

var TodoAppClass = React.createClass({
  render: function () {
    return <div>
    		<TodoApp />
    	   </div>;
  }
});

module.exports = TodoAppClass;
