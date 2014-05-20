/*
 * Serve JSON to our AngularJS client
 */
var fs = require('fs');
var path = require('path');


var data = {};
exports.inspect_data = function() {
  return data;
}

var data_file_name = function() {
  return __dirname + '/../tw-bj-books/data.json';
}
var load = function() {
  data = JSON.parse(fs.readFileSync(data_file_name(), 'utf8'));
}
var save = function() {
  fs.writeFile(data_file_name(), JSON.stringify(data), 'utf8');
}
var sync = function() {
  Object.keys(data).length === 0 ? load() : save();
}

exports.name = function (req, res) {
  res.json({
    name: 'Bob'
  });
};

//GET
exports.books = function (req, res) {
  //sync();
  load();
  var books = [];
  data.books.forEach(function (book, i) {
    book.id = i;
    books.push(book);
  });
  res.json({
    books: books
  });
};

//GET
exports.book = function (req, res) {
  sync();
  var id = req.params.id;
  if (id >= 0 && id < data.books.length) {
    res.json({
      book: data.books[id]
    });

  } else {
    res.json(false);
  }
};

//POST
exports.addBook = function(req, res) {
  sync();
  data.books.push(req.body);
  res.json(data.books.length - 1);
  sync();
};

//PUT
exports.editBook = function(req, res) {
  sync();
  var id = req.params.id;
  if (id >= 0 && id < data.books.length) {
    data.books[id] = req.body;
    res.json(true);

  } else {
    res.json(false);
  }
  sync();
};


//DELETE
exports.deleteBook = function (req, res) {
  sync();
  var id = req.params.id;
  if (id >=0 && id < data.books.length) {
    data.books.splice(id, 1)
    res.json(true);
  } else {
    res.json(false);
  }
  sync();
};
