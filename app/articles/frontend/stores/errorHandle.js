/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoStore
 */

var $ = require('jquery');

var errorObj={};

errorObj.errHandle = function(errObj,type,status){
  if (errObj.responseJSON && errObj.responseJSON.redirect){loginRedirect()};
}

errorObj.loginRedirect = function(){
  var returnURL = window.location.pathname
  $.ajax({
    method: "POST",
    url: "returnto",
    data: {returnURL:returnURL,_csrf:csrfToken}
  })
  .done(function( result ) {
    window.location.href=errObj.responseJSON.redirect;
  })
  .error(function( result ) {
    window.location.href=errObj.responseJSON.redirect;
  });
}


module.exports = errorObj;