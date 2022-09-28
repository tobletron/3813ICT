module.exports = function(app, db){
    app.post("/api/auth", async (req, res) => {

        var usernameSubmission = req.body.username;
        var passwordSubmission = req.body.password;

        userObject = {username: usernameSubmission, password: passwordSubmission};
        
        const collection = db.collection("users");

        //count the num of username/password combo in database (should be 1 if valid, 0 if invalid)
        collection.countDocuments((userObject), function (err, count) {
            if (count > 0) {
                res.send({'username': usernameSubmission, 'valid': true});
            }
            else {
                res.send({'valid': false});
            }
        });
    });
}