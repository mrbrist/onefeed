var express = require('express');
var router = express.Router();
var socket = require('socket.io');
var http = require('http').createServer();
let RssFeedEmitter = require('rss-feed-emitter');
let feeder = new RssFeedEmitter();

http.listen(8080);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

var io = socket(http)
io.on('connect', function (socket) {
    console.log('Connected to socket')
    feeder.add({
        url: 'http://reddit.com/new/.rss',
        refresh: 100
    });
    // feeder.add({
    //     url: 'http://lorem-rss.herokuapp.com/feed?unit=second&interval=5',
    //     refresh: 100
    // });
    // feeder.add({
    //     url: 'http://reddit.com/r/news/new/.rss',
    //     refresh: 100
    // });
    feeder.on('new-item', function(item) {
        socket.emit('article', item)
    })
});

module.exports = router;
