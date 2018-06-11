var request = require('request');
var token = require('./secrets');
var fs = require('fs');

var owner = process.argv[2];
var repo = process.argv[3];

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization' : 'token ' + token.GITHUB_TOKEN,
    }
  };
  request(options, function(err, res, body) {
    var obj = JSON.parse(body);
    // console.log(obj);
    cb(err, obj);
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
   .on('error', function (err) {
     throw err;
   })
   .on('response', function (response) {
     console.log('Response Status Code: ', response.statusCode);
     console.log('Response content-type: ', response.headers['content-type']);
   })
   .pipe(fs.createWriteStream(filePath));
}

console.log('Welcome to the GitHub Avatar Downloader!');
console.log(getRepoContributors(owner, repo, function(err, result) {
  console.log("Errors:", err);
  // var arr = []
  for (i = 0; i < result.length; i++){
    downloadImageByURL(result[i].avatar_url,  ('./avatars/' + result[i].login + ".jpg"));
    // arr.push(result[i].avatar_url); checking output
  }
  // console.log(arr);
}))