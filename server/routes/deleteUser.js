module.exports = function (app, db) {
    app.post("/api/deleteUser", (req, res) => {
        var query = { username: req.body.username };
        db.collection("users").deleteOne(query, function(err) {
            if (err) throw err;
            res.send(true);
        })
    });
  }