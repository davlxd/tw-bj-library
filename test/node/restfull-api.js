var request = require('superagent')
var expect = require('expect.js');

var host = 'http://localhost:3000/'
var books = [];
var newly_created_book_id = 0;
var books_after = [];
var isbn_100Y_Solitude = '9787532706907';

describe('GRUD test REST API /api/books', function(){
  it('first request all books should include previous post book', function(done){
    request.get(host + 'api/books')
      .end(function(error, res){
	expect(res.status).to.equal(200);
	books = res.body['books']
	done();
      });
  });

  it('Add a book by POST ISBN(requesting douban API)', function(done){
    request.post(host + 'api/isbn')
      .send({'isbn': isbn_100Y_Solitude})
      .end(function(error, res){
	expect(res.status).to.equal(200);
	done();
      });
  });

  it('Add duplicate book by POST ISBN(requesting douban API)', function(done){
    request.post(host + 'api/isbn')
      .send({'isbn': isbn_100Y_Solitude})
      .end(function(error, res){
	expect(res.status).to.equal(200);
	done();
      });
  });


  it('second request all books should include JUST ONE previous added book', function(done){
    request.get(host + 'api/books')
      .end(function(error, res){
	expect(res.status).to.equal(200);
	books_after = res.body['books'];
	expect(books_after.length - books.length).to.equal(1);
	done();
      });
  });

})
