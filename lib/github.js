'use strict';

var request = require('request');
var base_url = 'https://api.github.com/repos/mozilla/';
var useragent = {'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13'};

exports.getContributors = function (repo, callback) {
  var repo_url = base_url + repo + '/contributors';
  
  request.get({url:repo_url, headers:useragent, json:true}, function (error, response, body) {
    if (error) {
      return callback(error);
    } 
      return callback(null, body);
  });  
};

exports.getContributionsPerUser = function (repo, username, callback) {
  var repo_url = base_url + repo + '/commits?author=' + username;

  request.get({url:repo_url, headers:useragent, json:true}, function (error, response, body) {
    if (error) {
      return callback(error);
    } 
      return callback(null, body);
  });    
};

exports.getMembers = function (callback) {
  var repo_url = 'https://api.github.com/orgs/mozilla/public_members';
  
  request.get({url:repo_url, headers:useragent, json:true}, function (error, response, body) {
    if (error) {
      return callback(error);
    } 
      return callback(null, body);
  }); 
};

