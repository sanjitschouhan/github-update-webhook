const port = process.env.PORT || 5000;

var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/webhook', secret: 'sans' })

http.createServer(function (req, res) {
    handler(req, res, function (err) {
        res.statusCode = 404
        res.end('no such location')
    })
}).listen(port)

handler.on('error', function (err) {
    console.error('Error:', err.message)
})

handler.on('*', function (event) {
    console.log('Received a push event for %s to %s',
        event.payload.repository.name,
        event.payload.ref)
    console.log(event)
})