var request = require('request');
var token = require('./secrets');
require('dotenv').config();
var fs = require('fs');

var owner = process.argv[2];
var repo = process.argv[3];

/*
GetRepoContributors takes repo owner, repo name and a callback function
that will get and parse the JSON file into an array of objects
*/
function getRepoContributors(repoOwner, repoName, cb) {
  if (repoOwner == null || repoName == null) {
    return null;
  } else {
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': 'request',
        'Authorization': 'token ' + process.env.DB_TOKEN,
      }
    };
    request(options, function(err, res, body) {
      var obj = JSON.parse(body);
      cb(err, obj);
    });
  }
}

/*
downloadImageByURL takes 2 arguments, URL and filePath,
where URL is the location of the picture and filePath is
the location of output after image is downloaded
*/
function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function(err) {
      throw err;
    })
    .on('response', function(response) {
      console.log('Response Status Code: ', response.statusCode);
      console.log('Response content-type: ', response.headers['content-type']);
    })
    .pipe(fs.createWriteStream(filePath));

}

console.log('Welcome to the GitHub Avatar Downloader!');


/*
Calling the getRepoContributor function by taking the owner and repo from
arguments inputted in command line
*/
console.log(getRepoContributors(owner, repo, function(err, result) {
  console.log("Errors:", err);
  for (i = 0; i < result.length; i++) {
    downloadImageByURL(result[i].avatar_url, ('./avatars/' + result[i].login + ".jpg"));
  }
}))