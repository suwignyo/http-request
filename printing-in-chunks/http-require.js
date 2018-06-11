
var getHTML = require('./http-functions');

var requestOptions = {
  host: 'sytantris.github.io',
  path: '/http-examples/step5.html'
};

console.log(getHTML(requestOptions, printHTML));

function printHTML (html) {
  console.log(html);
}
