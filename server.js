const port = process.env.PORT || 5000;

var http = require('http')
var createHandler = require('github-webhook-handler')
var twilio = require('twilio');
var handler = createHandler({ path: '/webhook', secret: 'sans' })


var accountSid = 'ACee5d88a31d7337a2ece33ea5769c6589'; // Your Account SID from www.twilio.com/console
var authToken = '89c55479c58630800bceb4901834e66c';   // Your Auth Token from www.twilio.com/console

var client = new twilio(accountSid, authToken);

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
    var msg = 'GitHub Log: ' + event.event + ' on '
        + event.payload.repository.name + ' by '
        + event.payload.sender.login;
    console.log(msg)

    client.messages.create({
        body: msg,
        to: '+917382978847',  // Text this number
        from: '+12028043580' // From a valid Twilio number
    }).then((message) => console.log(message.sid));
})