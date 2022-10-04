module.exports = function (app, db) {

    /* This is a post request that is being sent to the server. It is sending the title, groupName, and
    members of the channel to the server. The server then checks if the channel already exists. If
    it does not, it inserts the channel into the database. If it does, it sends a false response. */
    app.post("/api/insertChannel", (req, res) => {
        var channelObj = { title: req.body.title, groupName: req.body.groupName , members: req.body.members }

        var channelExists = false;


        //check if channel already exists
        var query = { title: req.body.title };
        db.collection('channels').find(query).toArray(function(err, result) {
            if (err) throw err;
            if (result.length != 0) {
                channelExists = true;
            }
        });

        if (!channelExists) {
            //insert the new channel into db
            db.collection('channels').insertOne(channelObj, function(err, result) {
                if (err) throw err;
                res.send(true);
            });
        }
        else {
            res.send(false);
        }
    });
}