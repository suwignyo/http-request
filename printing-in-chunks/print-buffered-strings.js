

var https = require('https');

var requestOptions = {
  host: 'sytantris.github.io',
  path: '/http-examples/step2.html'
};

function getAndPrintHTML () {
 https.get(requestOptions, function (response) {
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


console.log(getAndPrintHTML());