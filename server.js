var express = require('express');
var googlehome = require('google-home-notifier');
var ngrok = require('ngrok');
var bodyParser = require('body-parser');
var app = express();

//Config ----------------------------------------------------------------------
const serverPort = 8888 // default port

var deviceName = 'Google-Home';
var ip = '10.0.0.132'; // default IP of Google Home

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var language = 'en'; // default language code: en ja //TODO: it should be changed by parameter

//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
// POST
//-----------------------------------------------------------------------------
app.post('/google-home-notifier', urlencodedParser, function (req, res) {

    if (!req.body) return res.sendStatus(400)
    console.log(req.body);

    var text = req.body.text;

    if (req.query.ip) {
        ip = req.query.ip;
    }

    if (req.query.language) {
        language;
    }

    //googlehome.ip(ip, language);
    googlehome.device(deviceName, language).accent(language).ip(ip);

    if (text){
        try {
            if (text.startsWith('http')){
                console.log(1, text);
                var mp3_url = text;
                googlehome.play(mp3_url, function(notifyRes) {
                    console.log(notifyRes);
                    res.send(deviceName + ' will play sound from url: ' + mp3_url + '\n');
                });
            } else {
                console.log(2, text);
                googlehome.notify(text, function(notifyRes) {
                    console.log(notifyRes);
                    res.send(deviceName + ' will say: ' + text + '\n');
                });
            }
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
            res.send(err);
        }
    }else{
        res.send('Please GET "text=Hello Google Home"');
    }
})


//-----------------------------------------------------------------------------
// GET //TODO:for not, it's not used.
//-----------------------------------------------------------------------------
app.get('/google-home-notifier', function (req, res) {

    console.log(req.query);

    var text = req.query.text;

    if (req.query.ip) {
        ip = req.query.ip;
    }

    if (req.query.language) {
        language;
    }

    googlehome.ip(ip, language);

    if (text) {
        try {
            if (text.startsWith('http')){
                var mp3_url = text;
                googlehome.play(mp3_url, function(notifyRes) {
                    console.log(notifyRes);
                    res.send(deviceName + ' will play sound from url: ' + mp3_url + '\n');
                });
            } else {
                googlehome.notify(text, function(notifyRes) {
                    console.log(notifyRes);
                    res.send(deviceName + ' will say: ' + text + '\n');
                });
            }
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
            res.send(err);
        }
    }else{
        res.send('Please GET "text=Hello+Google+Home"');
    }
})


//-----------------------------------------------------------------------------
// Listen
//-----------------------------------------------------------------------------
app.listen(serverPort, function () {
    ngrok.connect(serverPort, function (err, url) {
        console.log('Endpoints:');
        console.log('    http://' + ip + ':' + serverPort + '/google-home-notifier');
        console.log('    ' + url + '/google-home-notifier');
        console.log('GET example:');
        console.log('curl -X GET ' + url + '/google-home-notifier?text=Hello+Google+Home');
        console.log('POST example:');
        console.log('curl -X POST -d "text=Hello Google Home" ' + url + '/google-home-notifier');
    });
})