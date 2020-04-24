const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const router = express.Router();
const env = require('dotenv').config();
const app = express();


const uri = "mongodb+srv://fzea01:activeme@cluster0-bolzh.azure.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
const dbName = 'dcw';
let information = {};

app.use( cors() );
app.use('/api', bodyParser.urlencoded({ extended: true }), router);
app.use('/api', bodyParser.json(), router);
app.use( session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


(async () => {
    try {
      await client.connect();
      console.log("Connected correctly to server");
      const db = client.db(dbName);
      const col0 = db.collection('users');
      const col1 = db.collection('session');
      const col2 = db.collection('img_cover');
      const col3 = db.collection('post');

      information.users = await col0.find({}).toArray();   //Users
      information.session = await col1.find({}).toArray();   //Session
      information.coverpage = await col2.find({}).toArray();   //Cover Pages
      information.post = await col3.find({}).toArray();   //All Post

      console.log('Query data dont!');
  
      // Close connection
      client.close();
    } catch(err) {
      console.log(err.stack);
    }
  })();

router.route('/auth')
    .get((req,res) => {
        res.json({message:'auth'});
    })
    .post((req,res) => {
    console.log('post auth');
    let username = req.body.username;
    let password = req.body.password;
    console.log(username +'-'+password);
    // if(username && password){
    //     req.session.loggedin = true;
    //     req.session.username = username;
    // } else {
    //     req.session.loggedin = false;
    // }
    // res.json({message:'Login Success'});
})
router.route('/users')
    .get((req,res) => {
        information.users && information.users.length != 0 ? res.json(information.users):res.json({message:'Data Not Found'});
        res.end();
    })

router.route('/session')
    .get((req,res) => {
        session.loggedin == true ? res.json({username:'Nat', message:'true'}):res.json({username:'null', message:'false'});
        // information[1] && information[1].length != 0  ? res.json(information[1]):res.json({message:'Data Not Found'});
        res.end();
    })

router.route('/cover_pages')
    .get((req,res) => {
        information.coverpage && information.coverpage.length != 0 ? res.json(information.coverpage):res.json({message:'Data Not Found'});
        res.end();
    });

router.route('/posts')
    .get((req,res) => {
        information.post && information.post.length != 0 ? res.json(information.post):res.json({message:'Data Not Found'});
        res.end();
    });

app.use("*", (req, res) => res.status(404).send('404 Not found'));

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!!!')
})

app.listen(process.env.PORT , () => {
    console.log('Starting server on port ' + process.env.PORT)
});