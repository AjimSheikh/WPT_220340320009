
const express = require('express');//importing express module
const app = express();

const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');


app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not


const mysql = require('mysql2');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'cdac',
	database: 'pleaserun',
	port: 3306
});
//Above we created connection with our data base


//========================================================
//if blur event occur /pocForBlur uri will be selected here
app.get('/pocForBlur', function (req, res) {

	let result = { status: false, bookdetail: { bookid: 0, bookname: '', price: 0 } };
	// we have assumed the above result that book detail is not found.
	connection.query("select * from book where bookid = ?", [req.query.input], (err, res1) => {
		if (err) {

			console.log("trouble Came");
		} else {
			// if bookid found then we have got one row of our table
			if (res1.length > 0) {
				result.status = true;
				result.bookdetail = res1[0];
				console.log("success" + result)
			}
		}
		res.send(result);
	});
});
//===============================================================

//if click event(i.e on update button) occur /pocForUpdate uri will be selected here
app.get('/pocForUpdate', function (req, res) {
	let result = false;// we assumed that book id is not found.
	connection.query("update book set price = ?  where bookid = ?", [req.query.input.price, req.query.input.bookid], (err, res1) => {
		if (err) {

			console.log("trouble Came");
		} else {
			//if bookid is found then affected row will be 1.
			if (res1.affectedRows > 0) {
				result = true;
				console.log("success" + result)
			}
		}
		res.send(result);
	});


});



// creating server connection on port number 8081
app.listen(8081, function () {
	console.log("server listening at port 8081...");
});