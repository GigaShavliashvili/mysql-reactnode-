const express = require('express')
const app = express()
const dotenv = require('dotenv')
const DbService = require('./dbservice')
const cors = require("cors");
dotenv.config()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/api/', (req,res) => {
DbService.getAllData().then(dbres => res.json({item1:dbres, item2:dbres.length})).catch(err => console.log(err))
})


app.post('/api/add', (req, res) => {
    const body = req.body;
    DbService.postdata(body).then((dbres) =>{
        res.json(dbres.insertId)
    }).catch(err => console.log(err))
})

app.delete('/api/delete', (req, res) => {
    const {id} = req.query
    DbService.deleteData(id).then((dbres) =>res.json(dbres.deleteId)).catch(err => console.log(err))
})

app.put('/api/put', (req, res) => {
    const body = req.body;
    DbService.putdata(body).then((dbres) => res.json(dbres.putId)).catch(err => console.log(err))
})

app.listen(process.env.port, (res,err) =>{
console.log(`listening on port : ${process.env.port}`)
})
