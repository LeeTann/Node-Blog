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

module.exports = server