'use strict';
var request = require('request');
//Authentication URI to Generate AccessToken
var authUri = "https://login.microsoftonline.com/botframework.com/oauth2/v2.0/token"; // to get accesstoken
//Broadcast URI specific to Facebook
var broadcastUri = "https://facebook.botframework.com//v3/conversations/";
// Bot Id and pwd
//App Id from Microsoft Bot Framework Account
var clientId = "55be64af-5a2a-4309-9bb8-28b7f5da023d";
//App Pwd from Microsoft Bot Framework Account
var clientSecret = "iOQb3kK3CHGtbb9h55Nhjpn";
//Bot name from Microsoft Bot Framework Account
var botAppName = "botrndscavenger";
// Bot Facebook ID
var botFBId = "1814388888587587";
// Bot Facebook Name
var botFBName = "Scavenger Demo Bot";
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