const express = require('express')
const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    console.log('working backend with express')
    res.send('Hello world from express')
})

module.exports = server