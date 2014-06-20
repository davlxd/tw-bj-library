/*
 * books json file CRUD
 */
var fs = require('fs');
var path = require('path');

var data = {};
exports.data = function() {
  return data;
}

var data_file_name = function() {
  return __dirname + '/../tw-bj-books/data.json';
}

exports.load = function() {
  try {
    data = JSON.parse(fs.readFileSync(data_file_name(), 'utf8'));
  } catch (e) {
    console.log(e);
    if (e.code === 'ENOENT' || e instanceof SyntaxError) {
      data = {};
    } else {
      throw e;
    }
  }

  if (data.books === undefined) {
    data.books = {};
  }
  
}

var save = function() {
  fs.writeFile(data_file_name(), JSON.stringify(data, null, 2), 'utf8');
}

exports.sync = function() {
  Object.keys(data).length === 0 ? load() : save();
//  Object.keys(data).length === 0 ? load() : save();
}

