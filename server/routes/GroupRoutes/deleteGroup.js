module.exports = function (app, db) {
    app.post("/api/deleteGroup", (req, res) => {
        var query = { title: req.body.title };
        console.log("deleting group: ", req.body.title);
        db.collection("groups").deleteOne(query, function(err) {
            if (err) throw err;
            res.send(true);
        })
    });
  }