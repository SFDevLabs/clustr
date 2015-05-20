// Routes for module
"use strict";

var React = require('react');
var Route = require('react-router').Route;

var ArticleRoutes = (
  <Route handler={require('../../main/frontend/components/App.react')} location="history" strict="false">
     <Route name="articlemain"  handler={require('./components/MainSection.react')}>
   		<Route name="articles" path="/" handler={require('./components/ArticlesApp.react')}/>
   		<Route name="site" path="/site" handler={require('./components/SiteSearch.react')}/>
	    <Route name="article" path="/:id" handler={require('./components/ArticleApp.react')}/>
   	</Route>
  </Route>
  )
module.exports = ArticleRoutes;

