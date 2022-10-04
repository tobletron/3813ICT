module.exports = function (app, db) {

    /* This is the code that deletes a group from the database. */
    app.post("/api/deleteGroup", (req, res) => {
        var query = { title: req.body.title };
        console.log("deleting group: ", req.body.title);
        db.collection("groups").deleteOne(query, function(err) {
            if (err) throw err;
            res.send(true);
        });
    });

  }