module.exports = function (app, db) {

    /* This is a get request to the server. It is asking for the channels collection from the database. */
    app.get('/api/getChannels', (req, res) => {
      var query = {};
      db.collection('channels').find(query).toArray(function (err, result) {
        if (err) throw err;
        res.send(result);
      });
    });

}