const mongoose = require('mongoose');
const ratingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    artists: mongoose.Schema.Types.Array
});

module.exports = mongoose.model('rating', ratingSchema);