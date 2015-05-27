// Routes for module
"use strict";

var React = require('react');
var Route = require('react-router').Route;

var ArticleRoutes = (
  <Route handler={require('../../main/frontend/components/App.react')} location="history" strict="false">
     <Route name="articles" path="/" handler={require('./components/Home.react')}/>

     <Route name="add" path="/add" handler={require('./components/Add.react')}/>
     <Route name="article" path="/:id" handler={require('./components/Site.react')}/>
  </Route>
  )
module.exports = ArticleRoutes;

