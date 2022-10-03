module.exports = function (app, db) {
    app.post("/api/updateGroup", (req, res) => {
        var updateGroupFrom = req.body.query;
        var updateGroupTo = req.body.update;
        
        db.collection("groups").updateOne(updateGroupFrom, { $set: updateGroupTo }, function(err, result) {
            if (err) throw err;
            res.send(result);
        });
    });
}