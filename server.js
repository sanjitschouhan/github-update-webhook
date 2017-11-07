const port = process.env.PORT || 5000;

var http = require('http')
var createHandler = require('github-webhook-handler')
const TelegramBot = require('node-telegram-bot-api');

var handler = createHandler({ path: '/webhook', secret: 'sans' })

var chatId = [277107075];
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

    for (var i = 0; i < chatId.length; i++)
        bot.sendMessage(chatId[i], msg);

})

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatIdi = msg.chat.id;
    const resp = match[1]; // the captured "whatever"
    bot.sendMessage(chatIdi, resp);
});

bot.on('message', (msg) => {
    const chatIdi = msg.chat.id;
    var flag = false;
    for (var i = 0; i < chatId.length; i++) {
        if (chatId[i] == chatIdi) {
            flag = true;
            break;
        }
    }
    console.log(chatIdi)
    if (!flag) {
        chatId.push(chatId)

        bot.sendMessage(chatIdi, 'Registered your id ' + chatIdi);
    }
    else {
        bot.sendMessage(chatIdi, 'Your id ' + chatIdi + ' already registered');
    }
});