
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.newuser = function(req, res){
  res.render('newuser', { title: 'Add New User' });
};

exports.userlist = function(db) {
    return function(req, res) {
        var collection = db.get('usercollection');

        collection.find({"school": userSchool2},{},function(e,docs){
            res.render('userlist', {
                "userlist" : docs
            });
        });
    };
};


var userSchool2 = "";

exports.adduser = function(db) {
    return function(req, res) {

        // Get our form values. These rely on the "name" attributes
        var userName = req.body.username;
        var userEmail = req.body.useremail;
        var userSchool = req.body.userschool; 
        userSchool2 = userSchool; 

        console.log(userName);
        // Set our collection
        var collection = db.get('usercollection');

        // Submit to the DB
        collection.insert({
            "username" : userName,
            "email" : userEmail,
            "school" : userSchool
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