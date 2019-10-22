const express = require('express');
const router = express.Router();
const Lyric = require('../models/Lyric');
const rating = require('../models/rating');
const promise = require('promise');
const promiseRetry = require('promise-retry');
const mongoose = require('mongoose');
const cors = require('cors');
const Request = require("request");

const getChart = require('../app');
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
const baseURL = 'https://api.musixmatch.com/ws/1.1';
const apiKey = 'b2ee2340090a9c2340c5e1666242d357';
router.use(cors());
function chartGet() {
    return new Promise(function (fulfill, reject){
        const url = `${baseURL}/chart.artists.get?page=1&page_size=3&country=it&apikey=${apiKey}`;

        express.request.get(url, function(error, response, body) {

            if (!error) {

                if (body.message.body) {
                    fulfill(body.message.body);
                } else { reject('Item not found'); }
            } else { reject(error); }
        });
    });
}

function SChart(){
Request.get(`${baseURL}/chart.artists.get?page=1&page_size=3&country=it&apikey=${apiKey}`, (error, response, bod) => {
    if(error) {
        return console.dir(error);
    }
    //console.log(JSON.parse(body.message.body));
    const ratingg = new rating ({
        _id: new mongoose.Types.ObjectId(),
        artist_rating: JSON.parse(bod)


    });
    ratingg.save().then(result=>{
        console.log(result);
    })
});}
router.get('/chart',SChart);
function getall(){
rating.find({}, function(err, art) {
    if (err) throw err;
    console.log(art);
});}
router.get('/find',getall);
router.get('/findall',function (req,res) {
    rating.find({}, function(err, data) {
        if (err) throw err;
       res.send(data);
        console.log(data);
    });
    
});
router.get('/findall2',function (req,res) {
    //   ce block sert a  consommer le rest api et sauvgarder la reponse dans la bdd/////////////
   /* Request.get(`${baseURL}/chart.artists.get?page=1&page_size=3&country=us&apikey=${apiKey}`, (error, response, bod) => {
        if(error) {
            return console.dir(error);
        }
        //console.log(JSON.parse(body.message.body));
        ok =JSON.parse(bod);
        const ratingg = new rating ({
            _id: new mongoose.Types.ObjectId(),
            artists: ok.message.body.artist_list
        });
        ratingg.save().then(result=>{
        })
    });*/
   ///////////////////ce block sert à recuperer les donnée enregistrée dans la BDD
    rating.find({}, function(err, data) {
        if (err) throw err;
        res.send(data);
        console.log(data);
    });

});
router.get('/findall2',function (req,res) {
    //   ce block sert a  consommer le rest api et sauvgarder la reponse dans la bdd/////////////
    /* Request.get(`${baseURL}/chart.artists.get?page=1&page_size=3&country=us&apikey=${apiKey}`, (error, response, bod) => {
         if(error) {
             return console.dir(error);
         }
         //console.log(JSON.parse(body.message.body));
         ok =JSON.parse(bod);
         const ratingg = new rating ({
             _id: new mongoose.Types.ObjectId(),
             artists: ok.message.body.artist_list
         });
         ratingg.save().then(result=>{
         })
     });*/
    ///////////////////ce block sert à recuperer les donnée enregistrée dans la BDD
    rating.find({}, function(err, data) {
        if (err) throw err;
        res.send(data);
        console.log(data);
    });

});
//   ce block sert a  consommer le rest api et sauvgarder la reponse dans la bdd/////////////
router.get('/saveSearch',function (req,res) {

     Request.get(`${baseURL}/chart.artists.get?page=1&page_size=3&country=us&apikey=${apiKey}`, (error, response, bod) => {
         if(error) {
             return console.dir(error);
         }
         //console.log(JSON.parse(body.message.body));
         ok =JSON.parse(bod);
         const ratingg = new rating ({
             _id: new mongoose.Types.ObjectId(),
             artists: ok.message.body.artist_list
         });
         ratingg.save().then(result=>{
         })
         res.send(ok);
     });




});



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