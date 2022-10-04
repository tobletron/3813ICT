module.exports = function (app, db) {

    /* This is a get request to the server. It is asking for the groups collection. */
    app.get('/api/getGroups', (req, res) => {
      var query = {};
      db.collection('groups').find(query).toArray(function (err, result) {
        if (err) throw err;
        res.send(result);
      });
    });
    
}