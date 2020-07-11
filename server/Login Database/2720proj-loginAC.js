var express = require('express');

var app = express();

var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}))

var mongoose = require('mongoose');
mongoose.connect('mongodb://thcheng6:x79714@localhost/thcheng6');

var db = mongoose.connection;
//upon connection failure
db.on('error', console.error.bind(console, 'Connection error'));
//upon opening database successfully
db.once('open', function() {
    console.log("Connected succesfully");
});

var userSchema = mongoose.Schema({
    userID: {
        type: Number,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    favoriteEvent: {
        type: [Number],
        required: true
    },
    icon: {
        data: Buffer,
        contentType: String
    }
});

userSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'userID'
})


//image insert
module.exports = new mongoose.model('icon', userSchema);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var fs = require('fs');
var multer = require('multer');
var path = require('path');

var storage = multer.diskstorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname)
    }
});

var imgModel = require('./model');

app.get('/', (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
        } else {
            res.render('app', { items: item });
        }
    });
});




//code to create user account
var user = mongoose.model('User, userSchema');

app.use(multer({
    dest: './2720proj-icons/',
    rename: function(fieldname, filename) {
        return filename;
    }
}))

app.post('/insertUser', function(req, res) {

    var e = new user({
        username: req.body['username'],
        password: req.body['password'],
        $push: { favoriteEvent: -1 },
        icon: {
            data = fs.readfileSync(req.files.userphoto.path),
            contentType = 'image/png'
        }
    })

});