# google-home-notifier-sample
sample for google-home notifier

For now, other devices like Google Home is not detected from Docker environment on Macbook.
So please run on local machine.
To expose local environment, [ngrok](https://ngrok.com/) is used.

```
$ make server

# This can send text to Google Home and it speaks.
$ curl -X POST -d "text=Hello Google Home" https://xxxxx.ngrok.io/google-home-notifier
```

## settings for voice control by Slack
#### 1. prepare Google Apps Script as middle server
1. [Publish]-[Deploy as web app...]
2. Execute the app as: Me
3. Who has access to the app: Anyone, even anonymous
4. Copy [Current web app URL] for Slack Settings
5. Click [Update]

#### 2. settings for Slack
1. access https://api.slack.com/apps
2. click [Create New App]
3. click [Add features and functionality] and [Bots] (remember this bot name)
4. click [Save Changes]
5. click [Install your app to your workspace] for installing this app
6. See your local Slack app
7. add new channel and add that new bot user to this channel
8. access [Outgoing WebHooks] e.g. (https://yourname.slack.com/services/281861187927)
9. Integration Settings
9.1. Channel: new created channel 
9.2. Trigger Words: <@XXXXXXX> new bot id (by showing link)
9.3. URL(s): https://xxxxx.ngrok.io/google-home-notifier

#### 3. How this works
![Slack Image](https://raw.githubusercontent.com/hiromaily/google-home-notifier-sample/master/images/slackimage.png "slack image")