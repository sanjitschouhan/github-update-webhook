const port = process.env.PORT || 5000;

var http = require('http')
var createHandler = require('github-webhook-handler')
var twilio = require('twilio');
const TelegramBot = require('node-telegram-bot-api');

var handler = createHandler({ path: '/webhook', secret: 'sans' })
var accountSid = 'ACee5d88a31d7337a2ece33ea5769c6589'; // Your Account SID from www.twilio.com/console
var authToken = '89c55479c58630800bceb4901834e66c';   // Your Auth Token from www.twilio.com/console
var client = new twilio(accountSid, authToken);

var chatId = 277107075;
const token = '463223344:AAFlZetXUIJR75O9QCh1vNL7OXKpy2BO3ds';
const bot = new TelegramBot(token, { polling: true });

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
    if (chatId != 0)
        bot.sendMessage(chatId, msg);

})

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
    chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"
    bot.sendMessage(chatId, resp);
});

bot.on('message', (msg) => {
    chatId = msg.chat.id;

    console.log(chatId)
    bot.sendMessage(chatId, 'Registered your id ' + chatId);
});