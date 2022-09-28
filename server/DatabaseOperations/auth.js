module.exports = function(MongoClient, url, username, password, callback) {
    MongoClient.connect(url, {useNewUrlParser:true}, function(err, client) {
        const db = client.db('myAssignmentDb');
        var query = {username: username, password: password};
        console.log(query);
        db.collection('users').find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result.type);
            client.close();
            callback(result);
        })
    })
}