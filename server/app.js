require('dotenv').config()
const express = require("express")
const mysql = require("mysql2")
const path = require('path')
const router=require('./router/router')
const cors=require('cors')

const app = express()
app.use(cors())

// const connectDB = require('./connectionDB/connectionDB')
const { link } = require("fs")

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/',router)




//main-page
app.get('/mainpage', (req, res) => {
    return res.status(200).redirect('./main-page/index1.html')
})



app.listen(5000, () => {
    console.log("the server is listening at 5000")
})