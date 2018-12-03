var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    language: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0.0,
        max: 5.0,
        required: true
    },
    comment: {
        type: String
    },
    experience_level: {
        type: Number,
        min: 1.0,
        max: 25.0,
        required: true
    },
    duolingo_username: {
        type: String,
        required: true
    }
});

var Review = mongoose.model('Review', reviewSchema);

module.exports = Review;