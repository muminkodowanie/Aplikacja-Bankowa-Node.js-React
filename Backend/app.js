const express = require('express');
const cors = require('cors');
const { db } = require('./database/databasemongo');
require('dotenv').config();

const app = express()
const Port = process.env.Port


app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send('Test1234')
})
const server = () =>
{
    db()
    app.listen(Port, () => {
    console.log('Połączono z portem ',Port)
    })

}

server()