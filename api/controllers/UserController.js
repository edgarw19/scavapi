'use strict';

var mongoose = require('mongoose'),
    Users = mongoose.model('User');

exports.list_all_User = function (req, res) {
    Users.find({}, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.create_a_User = function (req, res) {
    var new_user = new Users(req.body);
    new_user.save(function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.read_a_User = function (req, res) {
    Users.findById(req.params.userId, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.update_a_User = function (req, res) {
    Users.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};