const { response } = require('express');
const express=require('express');
const app=express();
const PORT = 8000;
MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
app.use(express.static('./public'))
app.set('view engine','ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let db,
    dbName = 'social_media',
    collection,
    dbConnectionStr = process.env.DB_STRING
    
MongoClient.connect(dbConnectionStr)
.then(client =>{
    db = client.db(dbName)
    collection = db.collection('users')
    console.log(db)
    console.log(`connected to database`)
})

app.get('/',(request,res) => {
    collection.find().toArray()
    .then(data => {
        res.render('index.ejs', {
            things:data,
        })
    })
    .catch(error=>console.log(error))
})
app.post('/send',(req,res)=>{
    collection.insertOne({
        todo: req.body.thingToDo,
        completed: false
    }
    )
    .then(result =>{
res.redirect('/')
    })
})
app.listen(PORT,()=>{
    console.log(`Listening on post ${PORT}`)
})