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
app.put('/completeItem',(req,res)=>{
    console.log(req.body)
    collection.updateOne({todo: req.body.itemFromJS},{
        $set: {
            completed: true
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked completed : true')
        res.json('Marked completed : true')
    })
    .catch(error => console.error(error))
})


app.put('/undoItem',(req,res)=>{
    console.log(req.body)
    collection.updateOne({todo: req.body.itemFromJS},{
        $set: {
            completed: false
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked completed : false')
        res.json('Marked completed : false')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteItem',(req,res)=>{
    console.log(req.body)
    collection.deleteOne({todo:req.body.itemFromJS})
    .then(result => {
        res.json('Deleted')
    })
    .catch(error => console.error(error))
})

app.listen(PORT,()=>{
    console.log(`Listening on post ${PORT}`)
})