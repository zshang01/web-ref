const express = require('express');
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// // Connection URL
// const url = 'mongodb://localhost:27017/web-referral-app';

// const dbName = 'referral-app';

// const client = new MongoClient(url);



// // Use connect method to connect to the server
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

//   db.close();
// });



router.get('/home', (req, res) => {
	console.log("home page");
	res.send("hello world");
});

module.exports = router;
