const googlehome = require('google-home-notifier')
const language = 'ja'; //en ja

googlehome.device('Google-Home', language);
var text = "hello guys!";

if (language == "ja"){
    text = "おつかれさまでした";
}else{
    text = "Hello world";
}

googlehome.notify(text, function(res) {
    console.log(res);
});
