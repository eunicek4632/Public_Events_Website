var express = require('express');
var app = express();
const path = require('path');

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
    } //,
    //     //icon: {
    //     //data: Buffer,
    //     //contentType: String
    //     //}
});


//code to create user account
var user = mongoose.model('user', userSchema);

//app.get('/', function(req, res) {
//    res.sendFile(path.join(__dirname + "/index.html"));
//    console.log(__dirname);
//});

// router.get('/', function(req,res){
//     res.sendFile(path.join(__dirname+"/../src/index.html"));
// });

// router.get('/createAccount',function(req,res){
//     res.sendFile(path.join(__dirname+"../src/createAC.html"))
// });


// app.use('/',router);
// app.listen(process.env.port || 2009);


app.post('/insertUser', function(req, res) {

    var idMax;
    user.findOne()
        .sort('-userID')
        .exec(function(err, e) {
            if (e == null) {
                idMax = 0;
            } else {
                idMax = e.userID;
            }
            console.log(idMax);
            var f = new user({
                userID: idMax + 1,
                username: req.body['username'],
                password: req.body['password'],
                $push: {
                    favoriteEvent: 0
                }
                //icon: {
                //data = fs.readfileSync(req.files.userphoto.path),
                //contentType = 'image/png'
                //}
            })
            f.save(function(err) {
                if (err)
                    res.send(err);
                res.send("User inserted with ID = " + f.userID);
            });
        });
});

//listen to port x
var server = app.listen(2019);


function verify(){
    var user = document.getElementById("username").value;
    var pass = document.getElementById("pw").value;
    if(user == '' || pass == '')
        alert("You cannot leave any of the fields empty");
    else{
        //initiate HTTP request to verify user
        $.ajax({
            url: "",
            type: "POST"
        })
        .done(function(txt) { // run if request is completed successfully
            $("#text").html(txt);
        })
    }
}

//image insert
//module.exports = new mongoose.model('icon', userSchema);

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

//var fs = require('fs');
//var multer = require('multer');
//var path = require('path');

//var storage = multer.diskstorage({
//destination: (req, file, cb) => {
//cb(null, 'uploads')
//},
//filename: (req, file, cb) => {
//cb(null, file.fieldname)
//}
//});

//var imgModel = require('./model');

//app.get('/', (req, res) => {
//imgModel.find({}, (err, items) => {
//if (err) {
//console.log(err);
//}
//else {
//res.render('app', { items: item });
//}
//});
//});

//app.use(multer({
//dest: './2720proj-icons/',
//rename: function(fieldname, filename) {
//return filename;
//}
//}))