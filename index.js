/**
 * Created by hunter_s70 on 10.12.2016.
 */
var express = require("express");
var app = express();
app.use(express.logger());
var path = require('path');

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/index.html'));
//    response.send('Hello world');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});