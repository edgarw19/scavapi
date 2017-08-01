'use strict';
var request = require('request');
//Authentication URI to Generate AccessToken
var authUri = "https://login.microsoftonline.com/botframework.com/oauth2/v2.0/token"; // to get accesstoken
//Broadcast URI specific to Facebook
var broadcastUri = "https://facebook.botframework.com/v3/conversations/";
// Bot Id and pwd
//App Id from Microsoft Bot Framework Account
var clientId = "a80650b1-7896-42c9-a7f6-bf03febb6d0a";
//App Pwd from Microsoft Bot Framework Account
var clientSecret = "1a0Hp6vL2zkrMKoqKLeRjPv";
//Bot name from Microsoft Bot Framework Account
var botAppName = "pubot";
// Bot Facebook ID
var botFBId = "1902223490088036";
// Bot Facebook Name
var botFBName = "ScavengerBot";
//Authentication scope
var scope = "https://api.botframework.com/.default";

var mongoose = require('mongoose'),
    Users = mongoose.model('User');

exports.send_a_broadcast = function (req, res) {
    var bMessage = req.body.message;
    //get Accesstoken
    Users.find({ isSubscribed: true }, function (err, user) {
        for (var i = 0; i < user.length; i++) {
            var userObj = user[i];
            request({
                url: "https://graph.facebook.com/v2.6/me/messages?access_token=EAAbCDZBtoZCGQBAJ93PEGrZBFAeBsvfHhcdoqwJ3f4o6JH9CcP8yQQqE61tqiUK6UEyEZBnSoCf7vXwDbIGy81y0CIOA8tejdGcl5qU0RFAKJcwusXZAD1iJOOYqSjC7xeZCuOh7FAPk2R8ys3MnZBOniMdI8Ai99UbeDFTsOmz1gZDZD",
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                form: {
                    recipient: {"id": userObj.fbMessengerId},
                    message: {"text": bMessage}
                },
            }, function (error, response, body) {
                if (response && (response.statusCode === 200 || response.statusCode === 201)) {
                    console.log("SUCCESS")
                }
            });

        }
    })  
    res.json(1);
};