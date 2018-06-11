var https = require('https');


module.exports = function getHTML (options, callback) {
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
};