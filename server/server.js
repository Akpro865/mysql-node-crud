const express = require('express')
const app = express()
const colors = require('colors')
const mysql2 = require('mysql2')
const cors = require('cors')
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use(express.json())

const db = mysql2.createConnection({
	host: '127.0.0.1',
	user: 'root',
	database: 'posts',
	password: 'pro'
})

app.use(cors({
	origin: "http://localhost:3000",
	methods: "GET,POST,PUT,DELETE",
	credentials: true
}))

app.get('/books', (req, res)=>{
	const sql = 'SELECT * FROM books'

	db.query(sql, (err, result)=>{
		if(err) res.json(err);

		console.log(result)
		return res.json(result)		
	})
})

app.post('/books', (req, res)=>{
	const sql = 'INSERT INTO books (`title`, `des`, `price`, `img`) VALUES(?)';
	const values = [
		req.body.title, req.body.des, req.body.price, req.body.img
	];
	console.log(req.body)
	db.query(sql, [values], (err, result)=>{
		if(err) res.json(err);

		console.log(result)
		return res.json(result)		
	})
})

// get book by id
app.get('/book/:id', (req, res)=>{
	const sql = `SELECT * FROM books WHERE id=${req.params.id}`;

	db.query(sql, (err, result)=>{
		if(err) res.json(err);

		return res.json(result)		
	})
})

app.put('/books/:id', (req, res)=>{
	console.log(req.params.id)
	const bookid = req.params.id
	const sql = 'UPDATE books SET `title`=?, `des`=?, `price`=?, `img`=? WHERE id=?';
	const values = [
		req.body.title, req.body.des, req.body.price, req.body.img
	];

	db.query(sql, [...values, bookid], (err, result)=>{
		if(err) res.json(err);

		//console.log(result)
		return res.json('book updated successfully!')		
	})
})

app.delete('/books/:id', (req, res)=>{
	const bookid = req.params.id;
	const sql = 'DELETE FROM books WHERE id=?';	

	db.query(sql, [bookid], (err, result)=>{
		if(err) res.json(err);

		return res.json('book deleted successfully!')
	})
})

app.listen(5000, ()=>{
	console.log(`app connected`.green)
})