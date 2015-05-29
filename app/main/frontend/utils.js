// Routes for module
"use strict";

var userNameDiv = document.getElementById("user");
var csrfTag = document.getElementById("csrf-token");
var $ = require('jquery');

var utils ={}

utils.getUserName=function(){
	return userNameDiv.dataset.name;
}
utils.isLoggedIn=function(){
	return userNameDiv.dataset.auth==="true"?true:false;
}

utils.loginRedirect = function(redirect){
  var returnURL = window.location.pathname
  $.ajax({
    method: "POST",
    url: "returnto",
    data: {returnURL:returnURL,_csrf:utils.getCsrfToken()}
  })
  .done(function( result ) {
    window.location.href=redirect;
  })
  .error(function( result ) {
    window.location.href=redirect;
  });
}


utils.getCsrfToken=function(){
	return csrfTag ? csrfTag.dataset.csrf:null;
}



module.exports = utils;
