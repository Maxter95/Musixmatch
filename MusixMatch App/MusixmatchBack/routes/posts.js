const express = require('express');
const router = express.Router();
const Lyric = require('../models/Lyric');
const mongoose = require('mongoose');
const cors = require('cors');
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.use(cors());



router.post('/lyric',(req,res,next)=>{
    const lyric = new Lyric ({
        _id: new mongoose.Types.ObjectId(),
        lyrics: req.body.lyrics
    });
    lyric.save().then(result=>{
        console.log(result);
    }).catch(err => console.log(err));
    res.status(201).json({
        message: "handling Post request to /lyric",
        createdLyric: lyric
    });
});

module.exports = router;