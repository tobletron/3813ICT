module.exports = function (app, db) {

    /* This is a get request to the server. It is asking for the chats collection. */
    app.get('/api/getChats', (req, res) => {
      var query = {};
      db.collection('chats').find(query).toArray(function (err, result) {
        if (err) throw err;
        res.send(result);
      });
    });
    
}