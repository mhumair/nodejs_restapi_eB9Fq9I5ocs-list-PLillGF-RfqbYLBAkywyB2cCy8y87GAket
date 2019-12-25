var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/p1');

var db = mongoose.connection

Genre = require('./models/genre');
Book = require('./models/book.js');

app.use(bodyParser.json());
// HOME
app.get('/',function(req,res){
	res.send('Hello World');
});

// GET ALL GENRES
app.get('/api/genres',function(req,res){
	Genre.getGenres(function(err,genres){
		if(err){
			throw err;
		}
		res.json(genres);
	});
});
// ADD GENRES

app.post('/api/genres',function(req,res){
	var genre = req.body;
	Genre.addGenre(genre, function(err, genres){
		if(err){
			throw err;
		}
		res.json(genres);
	});
});
// GET BOOKS
app.get('/api/books',function(req,res){
	Book.getBooks(function(err,books){
		if(err){
			throw err;
		}
		res.json(books);
	});
});
// ADD BOOK
app.post('/api/books', function(req,res){
	var book = req.body;
	Book.addBook(book, function(err, books){
		if(err){
			throw err;
		}
		res.json(books);
	});
});
// GET GENRE BY ID
app.get('/api/genres/:_id',function(req,res){
	Genre.getGenreById(req.params._id,function(err,genres){
		if(err){
			throw err;
		}
		res.json(genres);
	});
});

// GET BOOK BY ID
app.get('/api/books/:_id',function(req,res){
	Book.getBookById(req.params._id,function(err,books){
		if(err){
			throw err;
		}
		res.json(books);
	});
});
// UPDATE GENRE
app.put('/api/genres/:_id',function(req,res){
	var id = req.params._id;
	var genre = req.body;
	Genre.updateGenre(id , genre, {}, function(err,genres){
		if(err){
			throw err;
		}
		res.json(genres);
	});
});
// UPDATE BOOK
app.put('/api/books/:_id', function(req,res){
	var id = req.params._id;
	var book = req.body;
	Book.updateBook(id, book, {}, function(err,books){
		if(err){
			throw err;
		}
		res.json(books);
	});
});
// DELETE GENRE
app.delete('/api/genres/:_id',function(req,res){
	var id = req.params._id;
	Genre.removeGenre(id,function(err,genres){
		if(err){
			throw err;
		}
		res.json(genres);
	});
});
// DELETE BOOK
app.delete('/api/books/:_id',function(req,res){
	var id = req.params._id;
	Book.removeBook(id, function(err, book){
		if(err){
			throw err
		}
		res.json(book);
	});
});
app.listen(3000);
console.log('Running on Port 3000...');
