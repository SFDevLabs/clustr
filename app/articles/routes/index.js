
/*!
 * Module dependencies.
 */

// Note: We can require users, articles and other cotrollers because we have
// set the NODE_PATH to be ./app/controllers (package.json # scripts # start)

var verts = require('../controllers/articles');

var mongoose = require('mongoose')
var crudUtils = require('../../../lib/crudUtils');
var ArticlesModel = mongoose.model('Articles');

var main = require('../../main/controllers/index');
var auth = require('../../../config/middlewares/authorization');

/**
 * Expose routes
 */

module.exports = function (app, passport, auth) {

  /**
   * Route middlewares
   */
  app.get('/articles', main.index);
  app.get('/articles/*', main.index);

  // Holder logic for working with uniqu links per route
  // app.param('id', articles.load);
  // app.get('/vert/:id', articles.show); 
  // app.param('id', articles.load);
  // app.get('/vert/:id', articles.show);

  /**
   * Crud Operations With User Auth
   */
  crudUtils.initRoutesForModel(app, ArticlesModel, auth, '/api/articles')
  
}
