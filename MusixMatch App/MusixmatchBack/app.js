const express = require('express');
const app = express();
const mongoose = require('mongoose');

const router = express.Router();
const bodyParser = require('body-parser');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
 require('../MusixmatchBack/nodemon');
const  postsRoutes = require('./routes/posts');

app.use('/posts',postsRoutes);
 app.use(bodyParser.json());

mongoose
    .connect('mongodb+srv://admin:'+process.env.MONGO_ATLAS_PW+'@musixmatch-dgnuy.mongodb.net/test?retryWrites=true&w=majority', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected!'));



app.listen(3000);
