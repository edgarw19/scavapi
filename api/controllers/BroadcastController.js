'use strict';
var request = require('request');
//Authentication URI to Generate AccessToken
var authUri = "https://login.microsoftonline.com/botframework.com/oauth2/v2.0/token"; // to get accesstoken
//Broadcast URI specific to Facebook
var broadcastUri = "https://facebook.botframework.com//v3/conversations/";
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
var botFBName = "PUAMScavengerBot";
//Authentication scope
var scope = "https://api.botframework.com/.default";

var mongoose = require('mongoose'),
    Users = mongoose.model('User');

exports.send_a_broadcast = function (req, res) {
    var bMessage = req.body.message;
    //get Accesstoken
    request({
        url: authUri,
        method: "POST",
        headers: {
            'Host': 'login.microsoftonline.com',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            grant_type: 'client_credentials',
            client_id: clientId,
            client_secret: clientSecret,
            scope: scope
        },
    }, function (error, response, body) {
        if (response && (response.statusCode === 200 || response.statusCode === 201)) {
            var obj = JSON.parse(response.body);
            if (obj != null) {
                var accesstoken = obj.access_token;
                if (accesstoken != "") {
                    //Go through all users with subscribed feature.
                    Users.find({ isSubscribed: true }, function (err, user) {
                        for (var i = 0; i < user.length; i++) {
                            var userObj = user[i];
                            console.log(broadcastUri + userObj.fbMessengerId + "-" + botAppName + "/activities");
                            request({
                                url: broadcastUri + userObj.fbMessengerId + "-" + botAppName + "/activities",
                                method: "POST",
                                json: true,
                                headers: {
                                    'Authorization': 'Bearer ' + accesstoken,
                                    'Content-Type': 'application/json'
                                },
                                body: {
                                    "type": "message",
                                    "from": {
                                        "id": botFBId,
                                        "name": botFBName
                                    },
                                    "conversation": {
                                        "id": userObj.fbMessengerId + "-" + botAppName,
                                        "name": "Convo1"
                                    },
                                    "recipient": {
                                        "id": userObj.fbMessengerId,
                                        "name": userObj.firstName + " " + userObj.lastName
                                    },
                                    "text": bMessage,
                                    "replyToId": botFBId
                                }
                            }, function (error1, response1, body1) {
                                if (response1 && (response1.statusCode === 200 || response1.statusCode === 201)) {
                                    //broadcast sent
                                    if ((user.length - 1) == i) {
                                        res.json(1);
                                    }
                                }
                            });
                        }
                    });
                }
                console.log(accesstoken);
            }
        }
    });
    res.json(1);
};