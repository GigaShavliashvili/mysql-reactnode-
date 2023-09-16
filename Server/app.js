const express = require('express')
const app = express()
const dotenv = require('dotenv')
const DbService = require('./dbservice')
const cors = require("cors");
const authRouter = require('./Router/router');
const userRouter = require('./Router/userRouter');
const orderRouter = require('./Router/orderRouter');
dotenv.config()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/api/order",orderRouter)
app.use("/api", userRouter)
app.use("/api/auth",authRouter)
/*generate random hex for create sercret key ---->  console.log(require('crypto').randomBytes(64).toString('hex')) */ 
app.listen(process.env.port, (res,err) =>{
console.log(`listening on port : ${process.env.port}`)
})
