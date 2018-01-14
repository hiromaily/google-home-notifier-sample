//For Slack
function doPost(e) {
    var token = "token";

    if (token != e.parameter.token) {
        return;
    }
    var text = e.parameter.text.replace(/<@[a-zA-Z0-9].*?>/, '').slice(0, 50);
    var user_name = e.parameter.user_name;

    return request(text);
}

//For Test
function doGet(e) {
    var params = JSON.stringify(e);
    //return HtmlService.createHtmlOutput(params);
    return ContentService.createTextOutput(JSON.stringify(params))
        .setMimeType(ContentService.MimeType.JSON);
}

function request(text) {
    var url = 'https://xxxxx.ngrok.io/google-home-notifier';
    var urlFetchOption = {
        'method' : 'post',
        'contentType' : 'application/x-www-form-urlencoded',
        'payload' : { 'text' : text}
    };

    var response = UrlFetchApp.fetch(url, urlFetchOption);
    return response;
}
