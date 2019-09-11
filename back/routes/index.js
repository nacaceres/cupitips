let express = require("express");
let router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "cupitips";

// Create a new MongoClient
const client = new MongoClient(url);

/* GET home page. */
router.get("/data", function(req, res, next) {

  const tweets = [
  {id:1, text: "Holi", user:{screen_name: "John"}},
  {id:2, text: "Holi", user:{screen_name: "John"}},
  {id:3, text: "Holi", user:{screen_name: "John"}},
  ];

  res.json(tweets)
});


router.get("/prueba", function(req, res, next) {
  client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    findDocuments(db, function(data) {
      res.json(data);
      client.close();
    });
  });
});
const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });
};

// const insertDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection('documents');
//   // Insert some documents
//   collection.insertMany([
//     {a : 1}, {a : 2}, {a : 3}
//   ], function(err, result) {
//     assert.equal(err, null);
//     assert.equal(3, result.result.n);
//     assert.equal(3, result.ops.length);
//     console.log("Inserted 3 documents into the collection");
//     callback(result);
//   });
// }

// Use connect method to connect to the server
// client.connect(function(err) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

//   const db = client.db(dbName);

//   insertDocuments(db, function() {
//     client.close();
//   });
// });

module.exports = router;
