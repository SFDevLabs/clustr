
// /**
//  * Module dependencies.
//  */

 var mongoose = require('mongoose');
 var Article = mongoose.model('Articles');
 var utils = require('../../../lib/utils');
 var GraphModel = require('../models/graph');
 var URLParse = utils.URLParse

/**
 * Load
 */

// exports.load = function (req, res, next, id){
//   var User = mongoose.model('User');
//   console.log('next')
//   //res.send('1')
//   next();
//   // Article.load(id, function (err, article) {
//   //   if (err) return next(err);
//   //   if (!article) return next(new Error('not found'));
//   //   req.article = article;
//   //   next();
//   // });
// };


exports.urlsearch = function (req, res){
  var url = URLParse(req.param('url'));
  console.log(url, req.param('url'), 'this is a url')
  if (!url) return res.send(utils.errMsg('No Valid URL to Query.'))

  GraphModel.findByURL(url ,function(err, results){
      console.log(err, results)
      res.send(results);
  });
    
};

/**
 * List
 */
exports.getAll = function (req, res){
  GraphModel.getAll(function(err, results){
    // var responseObj = results.map(function(obj){
    //   var item={};
    //   item = obj.user._data.data;
    //   item.id = obj.user._data.metadata.id;
    //   return item;
    // });
    
    res.send(results);
  });
}



/**
 * Create
 */
exports.create = function (req, res){
  var urlOne = URLParse(req.body.urlOne);
  var urlTwo = URLParse(req.body.urlTwo);

  if (!urlOne || !urlOne){return res.status(204).send(utils.errMsg('Requires Two Valid URLs.'))};
  GraphModel.createConnection({
    url:urlOne,
  },{
    url:urlTwo
  },{

  }, function(err, result){
    console.log(err)
    if (err) {
      return res.status(500).send(result)
    }
    res.send(result);
  })
  
}

/**
 * Get
 */
exports.get = function (req, res){
  var id = Number(req.param('uid'));
  GraphModel.get(id, function(err, result){
    if(err){return res.status(404).send(err); }
    res.send(result);
  });
}

// /**
//  * List
//  */
// exports.index = function (req, res){
//     res.render('verts/views/index', {
//         title: 'Articles'
//       });
    
//   // var page = (req.param('page') > 0 ? req.param('page') : 1) - 1;
//   // var perPage = 30;
//   // var options = {
//   //   perPage: perPage,
//   //   page: page
//   // };

//   // Article.list(options, function (err, articles) {
//   //   if (err) return res.render('500');
//   //   Article.count().exec(function (err, count) {
//   //     res.render('articles/index', {
//   //       title: 'Articles',
//   //       articles: articles,
//   //       page: page + 1,
//   //       pages: Math.ceil(count / perPage)
//   //     });
//   //   });
//   // });
// };


// /**
//  * New article
//  */

// exports.new = function (req, res){
//   res.render('articles/new', {
//     title: 'New Article',
//     article: new Article({})
//   });
// };

// /**
//  * Create an article
//  * Upload an image
//  */

// exports.create = function (req, res) {
//   var article = new Article(req.body);
//   var images = req.files.image
//     ? [req.files.image]
//     : undefined;

//   article.user = req.user;
//   article.uploadAndSave(images, function (err) {
//     if (!err) {
//       req.flash('success', 'Successfully created article!');
//       return res.redirect('/articles/'+article._id);
//     }
//     console.log(err);
//     res.render('articles/new', {
//       title: 'New Article',
//       article: article,
//       errors: utils.errors(err.errors || err)
//     });
//   });
// };

// /**
//  * Edit an article
//  */

// exports.edit = function (req, res) {
//   res.render('articles/edit', {
//     title: 'Edit ' + req.article.title,
//     article: req.article
//   });
// };

// /**
//  * Update article
//  */

// exports.update = function (req, res){
//   var article = req.article;
//   var images = req.files.image
//     ? [req.files.image]
//     : undefined;

//   // make sure no one changes the user
//   delete req.body.user;
//   article = extend(article, req.body);

//   article.uploadAndSave(images, function (err) {
//     if (!err) {
//       return res.redirect('/articles/' + article._id);
//     }

//     res.render('articles/edit', {
//       title: 'Edit Article',
//       article: article,
//       errors: utils.errors(err.errors || err)
//     });
//   });
// };

// /**
//  * Show
//  */

// exports.show = function (req, res){
//   res.render('articles/show', {
//     title: req.article.title,
//     article: req.article
//   });
// };

// /**
//  * Delete an article
//  */

// exports.destroy = function (req, res){
//   var article = req.article;
//   article.remove(function (err){
//     req.flash('info', 'Deleted successfully');
//     res.redirect('/articles');
//   });
// };
