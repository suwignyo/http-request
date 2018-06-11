var requestOptions = {
  host: 'sytantris.github.io',
  path: '/http-examples/step4.html'
};

var https = require('https');

function getHTML (options, callback) {
  https.get(options, function (response) {
      var body = '';
      response.setEncoding('utf8');
      response.on('data', function (data) {
        for (i = 0; i < data.length; i++){
          body += data[i];
        }
      });
      response.on('end', function(){
        callback(body);
    });
  });
}


function printHTML (html) {
  console.log(html);
}



console.log(getHTML(requestOptions, printHTML));