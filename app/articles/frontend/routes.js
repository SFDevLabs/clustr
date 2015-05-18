// Routes for module
"use strict";

var React = require('react');
var Route = require('react-router').Route;

var VertsRoutes = (
  <Route handler={require('../../main/frontend/components/App.react')} location="history" strict="false">

     <Route name="articlestwo" path="/articlestwo" handler={require('./components/SubMainApp.react')}>
   		<Route name="articles" path="/articles" handler={require('./components/ArticlesApp.react')}/>
	    <Route name="article" path="/articles/:id" handler={require('./components/ArticleApp.react')}/>
   	</Route>
  </Route>
  )

module.exports = VertsRoutes;

