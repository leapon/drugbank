var fs = require('fs');
var parse = require('csv-parse');
var transform = require('stream-transform');

var output = [];
var parser = parse({delimiter: '\t'})
var input = fs.createReadStream('../public/data/drugbank/drugs.txt');
var fields = null;
var transformer = transform(function(record, callback) {
  //console.log('record:', record);
  if (!fields){
    fields = record;
    console.log('fields:', fields);
  }
  setTimeout(function(){
    //callback(null, record.join('|')+'\n');
    callback(null, '');
  }, 500);
}, { parallel: 10 });
input.pipe(parser).pipe(transformer).pipe(process.stdout);
