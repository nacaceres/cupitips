let express = require("express");
let router = express.Router();
var ObjectId = require('mongodb').ObjectID;
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
// Connection URL
const url = process.env.MONGOLAB_URI;
// Database Name
const dbName = "cupitips";

// Database collection
const collCupitips ="tips";

// Database collection
const collUsers ="users";

// Define una promesa de conexión.
var conn = MongoClient.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//Ejemplo para conectar el front con el back borrar al final!!
router.get("/data", function(req, res, next) {

  const tweets = [
    {id:1, text: "Holi", user:{screen_name: "John"}},
    {id:2, text: "Holi", user:{screen_name: "John"}},
    {id:3, text: "Holi", user:{screen_name: "John"}},
  ];

  res.json(tweets);
});

//Retorna en el res los usuarios con el username dado en el body del req
router.post("/auth", function(req, res,next) {
  function callback(data){
    res.json(data);
  }
  findUser(req.body.username,callback);
});

//Funcion encargada de buscar al usuario en la BD
function findUser (username,callback) {
  conn.then(client => {
    client.db(dbName).collection(collUsers).find({"username": username}).toArray((error,data)=> {
      callback(data);
    });
  });
}

//Router para obtener todos los tips disponibles en la coleccion tips
router.get("/tips", function(req, res, next) {
  function callback(data){
    res.json(data);
  }
  findTips(callback);
});
//Funcion encargada de encontrar los tips en la BD
function findTips (callback) {
  conn.then(client => {
    client.db(dbName).collection(collCupitips).find().toArray((error,data)=> {
      callback(data);
    });
  });
}

//Router para actualizar los likes de un tip.
router.put("/like", function(req, res,next) {
  function callbackResp(data){
    res.json(data);
  }
  mongoId = new ObjectId(req.body._id);
  function callbackSearch(data){
    let likesAdd = data[0].likes +1;
    addLike(mongoId,likesAdd,callbackResp);
  }
  findTipById(mongoId,callbackSearch);
});
//Funcion encargada de encontrar un tip por id en la BD
function findTipById (mongoId, callback) {
  conn.then(client => {
    client.db(dbName).collection(collCupitips).find({_id:mongoId}).toArray((error,data)=> {
      callback(data);
    });
  });
}
//Funcion encargada de buscar al usuario en la BD
function addLike (mongoId,likesAdd,callback) {
  conn.then(client => {

    client.db(dbName).collection(collCupitips).updateOne({_id: mongoId},{$set:{ likes : likesAdd}}, (error, data) => {
      if (error) throw error;
      callback(data);
    });
  });
}
//Retorna en el res si se puede ingresar el comentario al tip correspondiente.
router.post("/comment", function(req, res,next) {
  function callbackResp(data){
    res.json(data);
  }
  mongoId = new ObjectId(req.body._id);
  function callbackSearch(data){
    let comments = data[0].comentarios;
    comments.push(req.body.comentario);
    addComment(mongoId,comments,callbackResp);
  }
  findTipById(mongoId,callbackSearch);
});

//Funcion encargada de adicionar un comentario a un tip
function addComment (mongoId,comments,callback) {
  conn.then(client => {

    client.db(dbName).collection(collCupitips).updateOne({_id: mongoId},{$set:{ comentarios : comments}}, (error, data) => {
      if (error) throw error;
      callback(data);
    });
  });
}
//Retorna en el res si se puede ingresar el comentario al tip correspondiente.
router.post("/addtip", function(req, res,next) {
  function callback(data){
    res.json(data);
  }
  tip = req.body;
  tip.aprobado = false;
  tip.comentarios = [];
  tip.likes = 0;
  addTip(tip,callback);
});

//Funcion encargada de adicionar un comentario a un tip
function addTip (tip,callback) {
  conn.then(client => {
        client.db(dbName).collection(collCupitips).insertOne(tip, (error, data) => {
            callback(data);
        });
    });
}

module.exports = router;
