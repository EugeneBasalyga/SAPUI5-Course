const express = require("express");
const app = express();
const dotenv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require("body-parser");
var ObjectID = require('mongodb').ObjectID;

app.listen(8000, function(req , res){
    console.log("Server is working on port 8000");
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const url = `mongodb+srv://${process.env.login}:${process.env.password}@cluster-xxdef.mongodb.net/test?retryWrites=true&w=majority`;

MongoClient.connect(url, (err, client)=>{
    if(err){
        console.log(url);
        return console.log(err);
    }
    app.post("/books", (req, res)=>{
        const db = client.db("book");
        const obj = {
            author: req.body.author,
            title: req.body.title,
            pages: req.body.pages
        };
        db.collection("books").insertOne(obj, (err, item)=>{
            if(err){
                return console.log(err);
            }
            else {
                res.send(item.ops[0]);
            }
        })
    });

    app.get("/books/:id", (req, res) => {
        const id = req.params.id;
        const path = {
            "_id": new ObjectID(id)
        };
        const db = client.db("book");
        db.collection("books").findOne(path, (err, item) => {
            if (err) {
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                res.send(item);
            }
        })
    });

    app.get("/books/", (req, res) => {
            
        const db = client.db("book");
        db.collection("books").find().toArray((err, result)=>{
            res.send(result);
        });
    });

    app.delete('/books/:id', (req,res)=>{
        const id = req.params.id;
        const p = {
            "_id": new ObjectID(id)
        };
        const db = client.db("book");
        db.collection("books").remove(p, (err, item)=>{
            if(err){
                res.send({
                    'error': 'An error has occurred'
                })
            }else {
            res.send(item);
            }
        })
    })

    app.put ('/books/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { 
            author: req.body.author, 
            title: req.body.title,
            pages: req.body.pages
         };
        const db = client.db("book");
        db.collection('books').update(details, note, (err, result) => {
          if (err) {
              res.send({'error':'An error has occurred'});
          } else {
              res.send(note);
          } 
        });
      });

});