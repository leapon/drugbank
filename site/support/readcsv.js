var fs = require('fs');
var parse = require('csv-parse');
var transform = require('stream-transform');

var output = [];
var parser = parse({delimiter: '\t'})
var input = fs.createReadStream('../public/data/drugbank/drugs.txt');
var output = fs.createWriteStream('../public/data/drugbank/drugs-output.json');
var fields = null;
var transformer = transform(function(record, callback) {
  //console.log('record:', record);
  if (!fields){
    fields = record;
    console.log('fields:', fields);
  }
  setTimeout(function() {
    var drug = {};
    for (var i = 0; i < fields.length; i++) {
      drug[fields[i]] = record[i];
    }
    callback(null, JSON.stringify(drug) + ',');
  }, 500);
}, { parallel: 10 });
input.pipe(parser).pipe(transformer).pipe(output);
