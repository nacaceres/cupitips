let express = require("express");
let router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
// Connection URL
const url = "mongodb://localhost:27017";

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
};

//Router para actualizar los likes de un tip.
router.put("/like", function(req, res,next) {
  function callbackResp(data){
    res.json(data);
  }
  function callbackSearch(data){
    let likesAdd = data[0].likes +1;
    addLike(req.body.tip_id,likesAdd,callbackResp);
  }
  findTipById(req.body.tip_id,callbackSearch);
});
//Funcion encargada de encontrar un tip por id en la BD
function findTipById (id, callback) {
  conn.then(client => {
    client.db(dbName).collection(collCupitips).find({tip_id: id}).toArray((error,data)=> {
      callback(data);
    });
  });
};
//Funcion encargada de buscar al usuario en la BD
function addLike (id,likesAdd,callback) {
  conn.then(client => {
    client.db(dbName).collection(collCupitips).updateOne({tip_id: id},{$set:{ likes : likesAdd}}, (error, data) => {
            if (error) throw error;
            callback(data);
        });
    });
}

module.exports = router;
