const express = require("express")

const app = express()

app.set('port', (process.env.PORT || 5000));

var logs = ['test', 'test1']

app.get("/", function (req, res) {
    // res.write("<html></html>")
    // res.write("<h2>Webhook Running</h2>")
    // res.write("<h4>Logs</h4><ul>")
    // for (var i = 0; i < logs.length; i++) {
    // res.write("<li>" + JSON.stringify(logs[i]) + "</li>")
    // }
    // res.end("</ul>EOF")
    res.send(logs[logs.length - 1])
})

app.post("/webhook/", function (req, res) {
    console.log(req)
    logs.push(req)
    res.sendStatus(200)
})

app.listen(app.get('port'), function () {
    console.log("Your application is listening on " + app.get('port'));
});