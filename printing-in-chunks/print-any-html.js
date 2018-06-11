var requestOptions = {
  host: 'sytantris.github.io',
  path: '/http-examples/step3.html'
};

var https = require('https');

function getAndPrintHTML (options) {
  https.get(options, function (response) {
      var body = '';
      response.setEncoding('utf8');

      response.on('data', function (data) {


        for (i = 0; i < data.length; i++){
          body += data[i];
        }

      });
      response.on('end', function() {
        console.log('Response stream complete.');
        console.log(body);
      });

    });

  }



console.log(getAndPrintHTML(requestOptions));