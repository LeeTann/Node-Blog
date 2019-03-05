const express = require('express')
const postRoutes = require('./data/postRoutes')
const userRoutes = require('./data/userRoutes')
const server = express()

server.use(express.json())
server.use('/api', postRoutes, userRoutes)

server.get('/', (req, res) => {
    console.log('working backend with express')
    res.send('Hello world from express')
})

module.exports = server