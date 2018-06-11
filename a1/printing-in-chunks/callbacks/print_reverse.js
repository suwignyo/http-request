var getHTML = require('./http-functions');

var requestOptions = {
  host: 'sytantris.github.io',
  path: '/http-examples/step6/reverse.html'
};

console.log(getHTML(requestOptions, printReverse));

function printHTML (html) {
  console.log(html);
}

function printReverse (html) {
  console.log(html.split("").reverse().join(""));
}