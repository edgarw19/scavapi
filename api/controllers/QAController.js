'use strict';


var mongoose = require('mongoose'),
  QAs = mongoose.model('QA');

exports.list_all_QA = function (req, res) {
  QAs.find({}, function (err, qa) {
    if (err)
      res.send(err);
    res.json(qa);
  });
};

exports.list_all_QA_By_Category = function (req, res) {
  QAs.find({exhibitCategory: req.params.caId }, function (err, qa) {
    if (err)
      res.send(err);
    res.json(qa);
  });
};

exports.create_a_QA = function (req, res) {
  var new_qa = new QAs(req.body);
  new_qa.save(function (err, qa) {
    if (err)
      res.send(err);
    res.json(qa);
  });
};


exports.read_a_QA = function (req, res) {
  QAs.findById(req.params.qaId, function (err, qa) {
    if (err)
      res.send(err);
    res.json(qa);
  });
};


exports.update_a_QA = function (req, res) {
  QAs.findOneAndUpdate({ _id: req.params.qaId }, req.body, { new: true }, function (err, qa) {
    if (err)
      res.send(err);
    res.json(qa);
  });
};

exports.delete_a_QA = function (req, res) {
  // QAs.findOneAndUpdate({ _id: req.params.qaId }, { isActive: false }, { multi: true }, function (err, qa) {
  //   if (err)
  //     res.send(err);
  //   res.json({ message: 'QA successfully deleted' });
  // });
  QAs.remove({
    _id: req.params.qaId
  }, function (err, qa) {
    if (err)
      res.send(err);
    res.json({ message: 'QA successfully deleted' });
  });
};

exports.list_all_QA_Analytics = function (req, res) {
  QAs.find({ 'isActive': true }, function (err, qa) {
    if (err)
      res.send(err);

    var data = [];
    for (var i = 0; i < qa.length; i++) {
      var successCnt = 0, skipCnt = 0, failCnt = 0, totalCnt = 0;
      var obj = qa[i];
      if (obj.successCnt != undefined)
        successCnt += obj.successCnt;
      if (obj.skipCnt != undefined)
        skipCnt += obj.skipCnt;
      if (obj.failCnt != undefined)
        failCnt += obj.failCnt;
      totalCnt = successCnt + skipCnt + failCnt;
      var d = {
        _id: obj._id,
        quTitle: obj.promptResponse,
        totalAsked: totalCnt,
        success: successCnt,
        skip: skipCnt,
        missed: failCnt,
      };
      data.push(d);
    }
    res.json(data);
  });
};
