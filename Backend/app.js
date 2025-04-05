const express = require('express');
const cors = require('cors');
const { db } = require('./database/databasemongo');
const {readdirSync} = require('fs');
const { route } = require('./routes/transakcje');
require('dotenv').config();

const app = express()
const Port = process.env.Port


app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send('Test1234')
})

readdirSync('./routes').map((route) => app.use('/api/v1',require('./routes/' + route)))
const server = () =>
{
    db()
    app.listen(Port, () => {
    console.log('Połączono z portem ',Port)
    })

}

server()