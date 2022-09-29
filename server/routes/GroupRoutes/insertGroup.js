module.exports = function (app, db) {
    app.post("/api/insertGroup", (req, res) => {
        var groupObj = { title: req.body.title, capacity: req.body.capacity, members: req.body.members }

        var groupExists = false;


        //check if group already exists
        var query = { title: req.body.title };
        db.collection('groups').find(query).toArray(function(err, result) {
            if (err) throw err;
            if (result.length != 0) {
                groupExists = true;
            }
        });

        if (!groupExists) {
            //insert the new group into db
            db.collection('groups').insertOne(groupObj, function(err, result) {
                if (err) throw err;
                res.send(true);
            });
        }
        else {
            res.send(false);
        }
    });
}