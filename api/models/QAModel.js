'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QASchema = new Schema({
    promptResponse: {
        type: String,
        required: "Question is required."
    },
    acceptedAnswer: {
        type: String,
        required: "Answer is required."
    },
    correctResponse: {
        type: String,
        required: "Correct Response is required."
    },
    correctResponseImage: {
        type: String,
    },
    incorrectResponse: {
        type: String,
        required: "Incorrect Response is required."
    },
    incorrectResponseImage: {
        type: String,
    },
    imageUrl: {
        type: String,
        required: "Incorrect Response is required."
    },
    hint: {
        type: String,
    },
    exhibitCategory: {
        type: String,
    },
    level: {
        type: Number,
    },
    successCnt: {
        type: Number
    },
    skipCnt: {
        type: Number
    },
    failCnt: {
        type: Number
    },
    collApiObjId: {
        type: String,
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date
    }
});

module.exports = mongoose.model('QA', QASchema);