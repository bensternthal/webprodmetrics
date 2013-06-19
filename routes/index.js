
/*
 * 
 */
'use strict';

var github = require('../lib/github');
var qs = require('querystring');
var async = require('async');

module.exports = function(app) {
  // Repo Must Be Specified in URL
  app.get('/', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Specify a repo in the url: http://foo/repo'); 
  });

  // Main View
  app.get('/:repo', function (req, res) {  
    var contributors = {};
    var members = {};

    // TODO : refactor html vs csv
    if (req.params.repo) {
      var repo = escape(req.params.repo);
    } else {
      var repo = 'bedrock';
    }

    // You can pass csv to get a csv view
    if (req.query.csv) {
      var csv = true;
    } else {
      var csv = false;
    }        

    async.series([
      function(callback) {
        //Get Contributors
        github.getContributors(repo, function(err, response) {
          if (err || !response) {
            console.log('Error fetching contributors:' + err);
            return callback(err);
          }

          contributors = response;
          callback(null);

        });                 
      },
      function(callback) {
        //Get Members  
        github.getMembers(function(err, response) {
          if (err || !response) {
            console.log('Error fetching members:' + err);
            return callback(err);
          }

          members = response;
          callback(null);
        });         
      },
      function(callback) {
        //Test For Members  
        contributors.forEach(function (value, index) {
          var login = value.login;
          var count = index;
          var contributor = value;
          
          members.forEach(function(value, index, self) {
            if (value.login == login) {
              contributor.member = true;
            }

          });

        });   
        callback(null); 
      }      
    ],
    function(err){
      // Error
      if(err) {
        res.json({ 'status': 500, 'error': err });
      } 
      if(csv) {
        res.render('csv', { 
          contributors: contributors,
          repository: repo,
          totalContributors: contributors.length
        });
      } else {
        res.render('index', { 
          contributors: contributors,
          repository: repo,
          totalContributors: contributors.length
        });        
      }

    });

  });


  // Detail View
  app.get('/stats/repo/:repo/user/:user', function (req, res) {
    var user = escape(req.params.user);
    var repo = escape(req.params.repo);

    github.getContributionsPerUser (repo, user, function(err, response) {
      if (err || !response) {
        res.json({ 'status': 500, 'error': err });
      }

      res.json({
        'contributions': response
      });

    });
  });

};
