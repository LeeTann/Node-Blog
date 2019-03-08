const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const postRoutes = require('./data/postRoutes')
const userRoutes = require('./data/userRoutes')

const server = express()

server.use(express.json(), logger('dev'), helmet(), cors())
server.use('/api', postRoutes, userRoutes)

server.get('/', (req, res) => {
    console.log('working backend with express')
    res.send('Hello world from express')
})

// Global middlware
server.use(function(req, res) {
    res.status(404).send(`Ain't Nobody got time for dat!!! Please enter the right URL request.`)
})

module.exports = server