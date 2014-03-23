
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.newuser = function(req, res){
  res.render('newuser', { title: 'Add New User', orange : 'Blue' });
};

var orange = "blue";

exports.userlist = function(db) {
    return function(req, res) {
        var collection = db.get(userSchoolCur);
        var docs2; 
        collection.find({"info": {$exists : true }}, function(e, docs) {
            docs2 = docs; 
              });
        collection.find({"school": userSchoolCur, "hackathon": userHackathonCur}, {}, function(e,docs){
            res.render('userlist', {
                "userlist" : docs, test : docs2
            });
        });
    };
};





exports.userlistadmin = function(db) {
    return function(req, res) {
        var collection = db.get('Duke');

        collection.find({"school": "Duke" }, {}, function(e,docs){
            res.render('userlistadmin', {
                "userlist" : docs
            });
        });
    };
};


var userSchoolCur = "";
var userHackathonCur = "";

exports.adduser = function(db) {
    return function(req, res) {

        // Get our form values. These rely on the "name" attributes
        var userName = req.body.username;
        var userEmail = req.body.useremail;
        var userSchool = req.body.userschool; 
        var userHackathon = req.body.userhackathon; 
        userSchoolCur = userSchool; 
        userHackathonCur = userHackathon;

        // Set our collection
        var collection = db.get(userSchool);

        // Submit to the DB
        collection.insert({
            "username" : userName,
            "email" : userEmail,
            "school" : userSchool,
            "hackathon" : userHackathon
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("userlist");
                // And forward to success page
                res.redirect("userlist");
            }
        });

    }
}

exports.addNote = function(db) {
    return function(req, res) {

        // Get our form values. These rely on the "name" attributes
        var adminInfo = req.body.textinfo;

        // Set our collection
        var collection = db.get('Duke');

        // Submit to the DB
        collection.insert({
            "info" : adminInfo
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("userlistadmin");
                // And forward to success page
                res.redirect("userlistadmin");
            }
        });

    }
}