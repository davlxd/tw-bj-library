/*
 * Serve JSON to our AngularJS client
 */
var fs = require('fs');
var path = require('path');
var http = require('http');


var data = {};
exports.inspect_data = function() {
  return data;
}

var data_file_name = function() {
  return __dirname + '/../tw-bj-books/data.json';
}

var load = function() {
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
    data.books = []
  }
  
}
var save = function() {
  fs.writeFile(data_file_name(), JSON.stringify(data, null, 2), 'utf8');
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

//Here extract info we need
realAddBook = function (json) {
  sync();
  var book = {};

  book.isbn = json.isbn13;
  book.title = json.title;
  book.author = json.author;
  book.holder = '';
  book.douban_url = json.alt;
  
  data.books.push(book);
  sync();
  
  return book;
}


//Request Douban API
exports.reqDouban = function(req, res) {
  var url = 'http://api.douban.com/v2/book/isbn/' + req.body.isbn;
  http.get(url, function(response) {
    var js = '';
    response.on('data', function(chunk) {
      js += chunk
    });
    response.on('end', function(chunk) {
      var j = JSON.parse(js, 'utf-8');
      res.json(realAddBook(j));
    });
  }).on('error', function(e){
    res.json(false);
  });
};


//PUT

//DELETE
