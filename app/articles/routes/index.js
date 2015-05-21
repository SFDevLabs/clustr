
/*!
 * Module dependencies.
 */

// Note: We can require users, articles and other cotrollers because we have
// set the NODE_PATH to be ./app/controllers (package.json # scripts # start)
var mongoose = require('mongoose')
var crudUtils = require('../../../lib/crudUtils');
var crudUtilsGraph = require('../../../lib/crudUtilsGraph');
var ArticlesModel = mongoose.model('Articles');

var main = require('../../main/controllers/index');
var articles = require('../controllers/index');
var auth = require('../../../config/middlewares/authorization');

var GraphModel = require('../models/graph');
/**
 * Expose routes
 */

module.exports = function (app, passport, auth) {

  /**
   * Route main middlewares
   */
  app.get('/', main.index);
  app.get('/add', main.index);

  /**
   * Route in local middlewares
   */
  app.get('/api/articles/urlsearch', articles.urlsearch);


  // Holder logic for working with uniqu links per route
  //
  // app.get('/vert/:id', articles.show);
  // app.param('id', articles.load);
  // app.get('/vert/:id', articles.show);

  /**
   * Crud Operations With User Auth
   */
  app.param('id', articles.load);




  crudUtils.initRoutesForModel(app, ArticlesModel, auth, 'id', '/api/articles')
  //crudUtilsGraph.initRoutesForModel(app, GraphModel, auth, '/:id', '/api/articles')

  //crudUtilsGraph.initRoutesForModel(app, ArticlesModel, auth, '/api/articles')

  //Register Catch all after Crud
  app.get('/:id', main.index);

}
