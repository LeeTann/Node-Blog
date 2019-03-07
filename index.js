// code away!
require('dotenv').config()

const server = require('./server')

const port = process.env.PORT || 9002

server.listen(port, () => console.log(`Listening to port ${port}`))