const mongoose = require('mongoose');
const lyricSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    lyrics: String
});

module.exports = mongoose.model('Lyric', lyricSchema);