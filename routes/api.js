/*
 * Serve JSON to our AngularJS client
 */
var http = require('http');
var booksjs = require('./books.js');


exports.name = function (req, res) {
  res.json({
    name: 'Bob'
  });
};

//GET
exports.books = function (req, res) {
  //sync();
  booksjs.load();
  var books = [];
  
  for (var isbn in booksjs.data().books) {
    var book = booksjs.data().books[isbn];
    book.isbn = isbn;
    books.push(book);
  }
  res.json({
    books: books
  });
};

//GET
exports.book = function (req, res) {
  booksjs.sync();
  var id = req.params.id;
  if (id >= 0 && id < booksjs.data().books.length) {
    res.json({
      book: booksjs.data().books[id]
    });

  } else {
    res.json(false);
  }
};

//POST

//Here extract info we need
realAddBook = function (json) {
  booksjs.sync();
  var book = {};

  book.title = json.title;
  book.author = json.author;
  book.holder = '';
  book.douban_url = json.alt;

  booksjs.data().books[json.isbn13] = book;
  booksjs.sync();
  
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
exports.editBook = function (req, res) {
  booksjs.sync();
  var id = req.params.id;
  if (id >= 0 && id < booksjs.data().books.length) {
    res.json({
      book: booksjs.data().books[id]
    });

  } else {
    res.json(false);
  }
};


//DELETE
