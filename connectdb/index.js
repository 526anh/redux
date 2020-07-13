const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { decode } = require('punycode');
app.use(cors());



// Connection URL
const url = 'mongodb://127.0.0.1:27017';

//require('./models/User');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// Database Name
const dbName = 'myproject';
var connect_db;
// Use connect method to connect to the Server
    MongoClient.connect(url, {
        useUnifiedTopology: true,
    }, function (err, client) {
      if (err) {
          console.log('Unable to connect to MongoDB', err);
      } else {
        connect_db = client.db('myproject');
        console.log('connect success');
      //  const user = connect_db.collection('user');
      //  const searchCursor = user.find();

      //  const result = searchCursor.toArray();
      //  console.table(result);
       
      }
    });
        /*
        //get collections
        const collections = await db.collections();
        collections.forEach(c=>console.log(c.collectionName));
        */
      //  const user = connect_db.collection('user');
      //  const searchCursor = user.find();

      //  const result = searchCursor.toArray();
      //  console.table(result);
       //console.log(await searchCursor.hasNext());
        /*
       //insert 

       const insertCursor = await user.insertMany([
           {
             "name" : "anh",
             "password": 123   
           },
           {
             "name" : "an",
             "password": 1234 
           },
           {
            "name" : "hanh",
            "password": 12345 
          }
       ])
       console.log(insertCursor.insertedCount);
       */
      /*
       // update
       const updateCursor = await user.updateOne(
          { "name" : "anh"},
          {"$set":{"password": 12345}}
       )
       console.log(updateCursor.modifiedCount);
       */
      /*
      //detele
      const deleteCursor = await user.deleteOne(
        { "name" : "anh"}
     )
     console.log(deleteCursor.modifiedCount);
     */
    
        
    

// signup router
app.post('/register', function (req, res) {
  var post_data = req.body

  res.send(post_data)

  var name = post_data.name
  var password = post_data.password

  var insertJson = {
      'name': name,
      'password': password
  }

  connect_db.collection('user').find({'name': name}).toArray((error, result) => {
      if (error) {
          res.send("Error")
      } else {
          connect_db.collection('users').insertOne(insertJson, function (err, result) { // res.send('Reg success')
              console.log('Reg success')
          })
      }
  })
})

// router login
app.post('/login', (req, res) => {
  console.log(req.body);
  var data = req.body;
  var username = data.name;
  var userpass = data.password;
  connect_db.collection('user').find({'name': username}).toArray((err, resq) => {
    if(err) {console.log("error" + err);}
    else {
      if (resq[0].name == username && resq[0].password == userpass) { 
        const token = jwt.sign({
          name: username,
          password: userpass
        }, 'test', {
          algorithm: 'HS256',
        });
        //console.log('token: '+ token);
        res.json({access_token: token, "result":1});
        console.log('login success.');
      } else {
        console.log('login fail.');
        res.json({"result":0});
      }
    }
  });
  

//   connect_db.collection('user').find({'name': name}).count(function (err, number) {
//     if (number === 0) {
//         res.json('aaa');
//         console.log('bbbb');
//     } else { // authentication
//         connect_db.collection('user').findOne({
//             'name': name
//         }, function (err, user) {
//             if (user.name == name && user.password == password) { 
//                 console.log('login success.');
//             } else {
//                 console.log('Wrong password');
//             }
//         })
//     }
// })
})
// router submit 
app.post('/submit', function (req, res) {
  var token = req.body.token.data;
  //console.log(token);
  var secret = 'test';
  const decodeToken = jwt.decode(
    token, 
    secret, 
    {
      skipValidation: true 
    }
  )
  var namedes = decodeToken.name;
  var passworddes = decodeToken.password;
  connect_db.collection('user').find({'name': namedes}).toArray((err, resq) => {
    if(err) {console.log("error" + err);}
    else {
      if (resq[0].name == namedes && resq[0].password == passworddes) { 
        res.json({"result":1});
        console.log('kiem tra thanh cong.');
      } else {
        console.log('kiem tra that bai.');
        res.json({"result":0});
      }
    }
  });
})

// app.get('/', (req,res)=>{
//     res.send('hello world')
// })

app.post('/', (req,res)=>{
    console.log(req.body);
    res.send('hello world');
})

app.listen(PORT,()=>{
  console.log("server running " + PORT)})