// require your server and launch it here
const server = require('./api/server')

server.listen(7000, () => {
    console.log('Server running on localhost:7000')
})