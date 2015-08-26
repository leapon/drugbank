var fs = require('fs');
var parse = require('csv-parse');
var transform = require('stream-transform');

var output = [];
var parser = parse({delimiter: ':'})
var input = fs.createReadStream('/etc/passwd');
var transformer = transform(function(record, callback) {
  console.log('record:', record);
  setTimeout(function(){
    callback(null, record.join('|')+'\n');
  }, 500);
}, { parallel: 10 });
input.pipe(parser).pipe(transformer).pipe(process.stdout);
