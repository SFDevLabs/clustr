var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;

//Import the modules of the different app components
var VertsRoutes = require('../../articles/frontend/routes');
var MainRoutes = require('./routes');


Router.run([MainRoutes,VertsRoutes], Router.HistoryLocation, function(Root){
  React.render(<Root/>, document.getElementById('todoapp'));
});